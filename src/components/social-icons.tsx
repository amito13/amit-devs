export type SocialPlatform = "GitHub" | "LinkedIn" | "YouTube" | "Instagram" | "Email";

const GITHUB_PATH =
  "M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.29-5.29-1.29-5.29-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.72 5.39-5.3 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z";

export function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={GITHUB_PATH} fill="currentColor" />
    </svg>
  );
}

function Glyph({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "GitHub":
      return <GitHubMark />;
    case "LinkedIn":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 7.5v9l7.5-4.5L9 7.5Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Email":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}

/** Small brand-colored square used in the sidebar and section labels. */
export function SocialBadge({ platform }: { platform: SocialPlatform }) {
  return (
    <span className="social-badge" data-platform={platform.toLowerCase()}>
      <Glyph platform={platform} />
    </span>
  );
}
