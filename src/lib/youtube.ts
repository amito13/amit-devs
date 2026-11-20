export const YOUTUBE_HANDLE = "@amitdewangan4287";
export const YOUTUBE_URL = `https://www.youtube.com/${YOUTUBE_HANDLE}`;
const CHANNEL_ID = "UC38W9qsVyjiN144CKsRCP5w";

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
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

/** Latest uploads from the channel's public RSS feed (up to 15, newest first). */
export async function getLatestVideos(): Promise<Video[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error(`YouTube feed responded with ${response.status}`);
    }

    const xml = await response.text();

    return xml
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
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            isShort: url.includes("/shorts/"),
            publishedLabel: published ? DATE_FORMAT.format(new Date(published)) : "",
          },
        ];
      });
  } catch (error) {
    console.error("Unable to fetch YouTube videos:", error);
    return [];
  }
}
