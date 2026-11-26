import type { ReactNode } from "react";

type Area = {
  title: string;
  summary: string;
  icon: ReactNode;
  skills: string[];
  /** Only projects that really use these skills. Leave empty rather than guess. */
  usedIn: string[];
};

type Concept = {
  title: string;
  detail: string;
};

// Every skill below comes from the resume or a project's tech stack.
const areas: Area[] = [
  {
    title: "Backend & APIs",
    summary: "Typed APIs, auth boundaries and real-time updates.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1.5" />
        <rect x="4" y="14" width="16" height="6" rx="1.5" />
        <path d="M8 7h.01M8 17h.01" />
      </>
    ),
    skills: ["Node.js", "Express.js", "tRPC", "REST APIs", "Socket.IO", "Auth & authorization"],
    usedIn: ["form-room API", "pollx live votes", "mobleet submissions"],
  },
  {
    title: "Frontend",
    summary: "Interfaces that stay fast, readable and accessible.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "HTML & CSS"],
    usedIn: ["form-room", "pollx", "this portfolio"],
  },
  {
    title: "Mobile",
    summary: "React Native apps, from first screen to store testing.",
    icon: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 17h2" />
      </>
    ),
    skills: ["React Native", "Expo", "Expo Router", "Mobile UI/UX", "Google Play Console", "Closed testing"],
    usedIn: ["mobleet"],
  },
  {
    title: "Data & storage",
    summary: "Relational models with type-safe queries and access rules.",
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </>
    ),
    skills: ["PostgreSQL", "Drizzle ORM", "Supabase", "MongoDB", "Firebase", "SQL"],
    usedIn: ["form-room", "pollx", "mobleet"],
  },
  {
    title: "DevOps & tooling",
    summary: "Containers, orchestration, cloud and deploys, plus AI pair-programming.",
    icon: (
      <>
        <path d="M5 7l4 4-4 4M11 17h8" />
      </>
    ),
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Vercel",
      "Git",
      "GitHub",
      "GitHub Copilot",
      "Claude",
      "ChatGPT",
    ],
    usedIn: ["pollx on Vercel"],
  },
  {
    title: "Languages",
    summary: "What the code above is written in.",
    icon: (
      <>
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </>
    ),
    skills: ["TypeScript", "JavaScript", "SQL", "C++"],
    usedIn: [],
  },
];

const concepts: Concept[] = [
  {
    title: "API design",
    detail: "Typed tRPC procedures and REST routes with predictable inputs and errors.",
  },
  {
    title: "Auth & access",
    detail: "Cookie-based sessions, Google OAuth through Supabase and row-level security.",
  },
  {
    title: "Real-time systems",
    detail: "Socket.IO broadcasts so poll results update live without a refresh.",
  },
  {
    title: "Data modelling",
    detail: "Relational schemas in Drizzle and Postgres, shaped around who owns each row.",
  },
  {
    title: "Sandboxed execution",
    detail: "User code runs in CodeBox and is judged per test case behind an authenticated API.",
  },
  {
    title: "System design",
    detail: "CAP theorem, rate limiting, SLAs and feed fan-out, explained in posts and Shorts.",
  },
];

export function ExpertiseGrid() {
  return (
    <div className="expertise">
      <p className="expertise__intro">
        My working stack, grouped by what it&apos;s for. <span>Used in</span> names the projects
        where each part runs.
      </p>

      <ul className="expertise__grid">
        {areas.map((area) => (
          <li className="expertise-card" key={area.title}>
            <div className="expertise-card__head">
              <span className="expertise-card__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {area.icon}
                </svg>
              </span>
              <h3>{area.title}</h3>
            </div>
            <p className="expertise-card__summary">{area.summary}</p>
            <ul className="expertise-card__skills" aria-label={`${area.title} skills`}>
              {area.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            {area.usedIn.length > 0 && (
              <p className="expertise-card__used">
                <span>Used in</span> {area.usedIn.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>

      <section className="concepts" aria-labelledby="concepts-title">
        <div className="concepts__head">
          <h3 id="concepts-title">Engineering concepts</h3>
          <span>How I approach the work</span>
        </div>
        <ul className="concepts__list">
          {concepts.map((concept) => (
            <li key={concept.title}>
              <h4>{concept.title}</h4>
              <p>{concept.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
