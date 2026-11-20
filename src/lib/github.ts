export const GITHUB_USER = "amito13";

export type ContributionDay = {
  date: string;
  level: number;
  label: string;
};

export type ContributionCalendar = {
  total: number;
  weeks: Array<Array<ContributionDay | null>>;
  months: Array<{ label: string; week: number }>;
};

const MONTH_FORMAT = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

function parseDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

/**
 * Reads the public contribution calendar GitHub renders on profile pages.
 * No token needed; returns null if GitHub is unreachable or the markup changes.
 */
export async function getContributions(): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio contribution graph)" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const html = await response.text();

    const tooltips = new Map<string, string>();
    for (const match of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      tooltips.set(match[1], match[2].trim());
    }

    const days: ContributionDay[] = [];
    for (const match of html.matchAll(/<td[^>]*data-date="[^"]*"[^>]*>/g)) {
      const cell = match[0];
      const date = /data-date="([\d-]+)"/.exec(cell)?.[1];
      const level = Number(/data-level="(\d)"/.exec(cell)?.[1] ?? 0);
      const id = /\sid="([^"]+)"/.exec(cell)?.[1];
      if (!date) continue;
      days.push({ date, level, label: (id && tooltips.get(id)) || date });
    }

    if (days.length === 0) {
      throw new Error("No contribution days found in GitHub markup");
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    const weeks: Array<Array<ContributionDay | null>> = [];
    let week: Array<ContributionDay | null> = Array(parseDate(days[0].date).getUTCDay()).fill(null);

    for (const day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      weeks.push([...week, ...Array(7 - week.length).fill(null)]);
    }

    const months: ContributionCalendar["months"] = [];
    let previousMonth = -1;
    weeks.forEach((days, index) => {
      const first = days.find((day) => day !== null);
      if (!first) return;
      const date = parseDate(first.date);
      if (date.getUTCMonth() === previousMonth) return;
      previousMonth = date.getUTCMonth();
      const last = months.at(-1);
      // Drop a label that would sit on top of the next one.
      if (last && index - last.week < 3) months.pop();
      months.push({ label: MONTH_FORMAT.format(date), week: index });
    });

    const totalText = /([\d,]+)\s+contributions?\s+in the last year/.exec(html)?.[1];
    const total = totalText
      ? Number(totalText.replace(/,/g, ""))
      : days.filter((day) => day.level > 0).length;

    return { total, weeks, months };
  } catch (error) {
    console.error("Unable to fetch GitHub contributions:", error);
    return null;
  }
}
