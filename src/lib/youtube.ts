export const YOUTUBE_HANDLE = "@amitdewangan4287";
export const YOUTUBE_URL = `https://www.youtube.com/${YOUTUBE_HANDLE}`;
const CHANNEL_ID = "UC38W9qsVyjiN144CKsRCP5w";

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  /** True for a real 9:16 cover; false when the vertical picture sits inside a wide one. */
  tallThumbnail: boolean;
  isShort: boolean;
  publishedLabel: string;
};

const DATE_FORMAT = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function decodeEntities(text: string) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function cleanTitle(title: string) {
  const withoutTags = title.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
  return withoutTags || title;
}

async function exists(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD", next: { revalidate: 3600 } });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Sharpest cover available. Shorts have a 1080x1920 cover (oardefault) unless a custom
 * thumbnail was uploaded; those only keep the custom design in the 1280x720 cover.
 */
async function getThumbnail(id: string, isShort: boolean) {
  const base = `https://i.ytimg.com/vi/${id}`;
  if (isShort && (await exists(`${base}/oardefault.jpg`))) {
    return { thumbnail: `${base}/oardefault.jpg`, tallThumbnail: true };
  }
  const wide = (await exists(`${base}/maxresdefault.jpg`)) ? "maxresdefault" : "hqdefault";
  return { thumbnail: `${base}/${wide}.jpg`, tallThumbnail: false };
}

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const FEED_ATTEMPTS = 3;

/** YouTube's feed returns short bursts of 503s, so try a few times before giving up. */
async function fetchFeed() {
  let lastError: unknown;
  for (let attempt = 0; attempt < FEED_ATTEMPTS; attempt++) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
    try {
      const response = await fetch(
        FEED_URL,
        // Retries skip the cache so a stored failure is never reused.
        attempt === 0 ? { next: { revalidate: 3600 } } : { cache: "no-store" },
      );
      if (response.ok) return await response.text();
      lastError = new Error(`YouTube feed responded with ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/** Latest uploads from the channel's public RSS feed (up to 15, newest first). */
export async function getLatestVideos(): Promise<Video[]> {
  try {
    const xml = await fetchFeed();

    const videos = xml
      .split("<entry>")
      .slice(1)
      .flatMap((entry) => {
        const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1];
        const title = /<title>([^<]*)<\/title>/.exec(entry)?.[1];
        const url = /<link rel="alternate" href="([^"]+)"/.exec(entry)?.[1];
        const published = /<published>([^<]+)<\/published>/.exec(entry)?.[1];
        if (!id || !title || !url) return [];

        return [
          {
            id,
            title: cleanTitle(decodeEntities(title)),
            url,
            isShort: url.includes("/shorts/"),
            publishedLabel: published ? DATE_FORMAT.format(new Date(published)) : "",
          },
        ];
      });

    return await Promise.all(
      videos.map(async (video) => ({
        ...video,
        ...(await getThumbnail(video.id, video.isShort)),
      })),
    );
  } catch (error) {
    console.error("Unable to fetch YouTube videos:", error);
    // On a live site, failing the hourly refresh makes Next.js keep serving the last
    // page that had videos. During a build or in dev there is no such page yet.
    const isLiveRefresh =
      process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build";
    if (isLiveRefresh) throw error;
    return [];
  }
}
