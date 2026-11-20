import type { CSSProperties } from "react";
import { GITHUB_USER, type ContributionCalendar } from "@/lib/github";
import { GitHubMark } from "./social-icons";

const PROFILE_URL = `https://github.com/${GITHUB_USER}`;

export function GitHubCard({ calendar }: { calendar: ContributionCalendar | null }) {
  return (
    <section className="gh-card" aria-label="GitHub activity">
      <header className="gh-card__header">
        <span className="gh-card__avatar">
          <GitHubMark />
        </span>
        <span className="gh-card__identity">
          <span className="gh-card__user">{GITHUB_USER}</span>
          <span className="gh-card__sub">github</span>
        </span>
        <a className="pill-button" href={PROFILE_URL} rel="noreferrer" target="_blank">
          follow
        </a>
      </header>

      {calendar ? (
        <div className="gh-card__body">
          <div className="gh-calendar-scroll">
            <div
              className="gh-calendar"
              style={{ "--weeks": calendar.weeks.length } as CSSProperties}
              role="img"
              aria-label={`${calendar.total} GitHub contributions in the last year`}
            >
              <div className="gh-calendar__months" aria-hidden="true">
                {calendar.months.map((month) => (
                  <span key={`${month.label}-${month.week}`} style={{ gridColumnStart: month.week + 1 }}>
                    {month.label}
                  </span>
                ))}
              </div>
              <div className="gh-calendar__days" aria-hidden="true">
                {calendar.weeks.flatMap((week, weekIndex) =>
                  week.map((day, dayIndex) =>
                    day ? (
                      <span
                        key={day.date}
                        className="gh-cell"
                        data-level={day.level}
                        title={day.label}
                      />
                    ) : (
                      <span key={`empty-${weekIndex}-${dayIndex}`} className="gh-cell gh-cell--empty" />
                    ),
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="gh-card__footer">
            <span>{calendar.total.toLocaleString("en")} contributions in the last year</span>
            <span className="gh-legend" aria-hidden="true">
              Less
              {[0, 1, 2, 3, 4].map((level) => (
                <span key={level} className="gh-cell" data-level={level} />
              ))}
              More
            </span>
          </div>
        </div>
      ) : (
        <a className="gh-card__fallback" href={PROFILE_URL} rel="noreferrer" target="_blank">
          See what I&apos;m building on GitHub ↗
        </a>
      )}
    </section>
  );
}
