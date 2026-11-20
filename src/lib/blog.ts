export const BLOG_URL = "https://amitdewanganblog.hashnode.dev";

export type BlogPost = {
  title: string;
  url: string;
  dateLabel: string;
  readMinutes: number;
};

const DATE_FORMAT = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const WORDS_PER_MINUTE = 200;

function unwrap(value: string | undefined) {
  if (!value) return "";
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(item: string, name: string) {
  return new RegExp(`<${name}>([\\s\\S]*?)</${name}>`).exec(item)?.[1];
}

/** Posts from the Hashnode blog's RSS feed, newest first. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${BLOG_URL}/rss.xml`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`Blog feed responded with ${response.status}`);
    }

    const xml = await response.text();

    return xml
      .split("<item>")
      .slice(1)
      .flatMap((item) => {
        const title = unwrap(tag(item, "title"));
        const url = unwrap(tag(item, "link"));
        if (!title || !url) return [];

        const published = tag(item, "pubDate");
        const body = tag(item, "content:encoded") ?? "";
        const words = unwrap(body).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

        return [
          {
            title,
            url,
            dateLabel: published ? DATE_FORMAT.format(new Date(published)) : "",
            readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
          },
        ];
      });
  } catch (error) {
    console.error("Unable to fetch blog posts:", error);
    return [];
  }
}
