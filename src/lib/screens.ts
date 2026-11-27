import { GITHUB_USER } from "./github";

export type AppScreen = {
  src: string;
  /** Short name shown under the screen. */
  caption: string;
  alt: string;
};

// Must stay inside the raw.githubusercontent.com entry in next.config.ts.
const RAW_ROOT = `https://raw.githubusercontent.com/${GITHUB_USER}/`;

const HEADING = /^(#{1,6})\s+(.*)$/;
const SCREENS_HEADING = /\b(screenshots?|screens)\b/i;
const IMAGE = /!\[([^\]]*)\]\(\s*<?([^\s)>]+)>?[^)]*\)|<img\b[^>]*>/gi;
const IMAGE_FILE = /\.(png|jpe?g|webp)$/i;

function attribute(tag: string, name: string) {
  return new RegExp(`\\s${name}=["']([^"']*)["']`, "i").exec(tag)?.[1];
}

function tableCells(line: string) {
  return line.trim().replace(/^\||\|$/g, "").split("|");
}

function resolve(src: string, base: string) {
  try {
    const url = new URL(src, base);
    url.search = "";
    url.hash = "";
    return url.href.startsWith(RAW_ROOT) && IMAGE_FILE.test(url.pathname) ? url.href : null;
  } catch {
    return null;
  }
}

/** First <b>…</b> after an HTML <img>, before the cell or the next image ends. */
function boldTitleAfter(lines: string[], index: number, cell: string, offset: number) {
  const rest = [cell.slice(offset).replace(/^<img\b[^>]*>/i, ""), ...lines.slice(index + 1, index + 4)].join("\n");
  const stop = rest.search(/<\/td>|<img\b/i);
  const scope = stop === -1 ? rest : rest.slice(0, stop);
  return /<b>([^<]+)<\/b>/i.exec(scope)?.[1].trim() ?? "";
}

/** Every image under the README's "Screenshots" (or "Screens") heading, in order. */
export function parseScreens(readme: string, base: string): AppScreen[] {
  const lines = readme.split(/\r?\n/);
  const screens: AppScreen[] = [];
  let sectionLevel = 0;
  let headers: string[] = [];

  lines.forEach((line, index) => {
    const heading = HEADING.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (sectionLevel === 0 || level <= sectionLevel) {
        sectionLevel = SCREENS_HEADING.test(heading[2]) ? level : 0;
      }
      headers = [];
      return;
    }
    if (sectionLevel === 0) return;

    const isTableRow = line.trim().startsWith("|");
    if (!isTableRow) headers = [];
    if (isTableRow && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[index + 1] ?? "") && lines[index + 1].includes("-")) {
      headers = tableCells(line).map((cell) => cell.trim());
    }

    (isTableRow ? tableCells(line) : [line]).forEach((cell, column) => {
      for (const match of cell.matchAll(IMAGE)) {
        const src = match[2] ?? attribute(match[0], "src");
        const alt = (match[1] ?? attribute(match[0], "alt") ?? "").trim();
        const href = src && resolve(src, base);
        if (!href) continue;
        // Markdown tables name each screen in the header row; HTML layouts usually put a
        // <b>title</b> right after the <img>. Both read better than alt text.
        const title =
          (headers[column]?.includes("![") ? "" : headers[column]) ||
          (match[2] === undefined ? boldTitleAfter(lines, index, cell, match.index ?? 0) : "");
        const caption = title || alt || `Screen ${screens.length + 1}`;
        screens.push({ src: href, caption, alt: alt || caption });
      }
    });
  });

  return screens;
}

/** Screenshots for a mobile project, read from its GitHub README. Empty if there are none. */
export async function getAppScreens(repoUrl: string): Promise<AppScreen[]> {
  try {
    const path = new URL(repoUrl).pathname.replace(/^\/|\/$/g, "").replace(/\.git$/, "");
    const base = `https://raw.githubusercontent.com/${path}/HEAD/`;
    const response = await fetch(`${base}README.md`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    return parseScreens(await response.text(), base);
  } catch (error) {
    console.error(`Unable to read app screens from ${repoUrl}:`, error);
    return [];
  }
}
