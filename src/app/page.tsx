"use client";

import Image from "next/image";
import { useState } from "react";

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Cloud",
  "APIs",
  "Automation",
];

const tools = [
  "Tailwind CSS",
  "System Design",
  "Mobile Apps",
  "Web Platforms",
  "Performance",
  "Clean Architecture",
  "Product Thinking",
];

const projects = [
  {
    name: "form-room",
    description:
      "A collaborative form builder that lets you design custom forms with typed fields, share them, and collect public submissions in one place.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "tRPC",
      "TanStack Query",
      "Express",
      "Drizzle ORM",
      "PostgreSQL",
    ],
    problem:
      "Removes the repetitive work of building form UIs and secure submission APIs from scratch, keeping form creation, field management, and response collection consistent behind a typed API and cookie-based auth.",
    live: "https://form-room.amitdewangan.app/",
    repo: "https://github.com/amito13/Form_builder",
  },
  {
    name: "pollx",
    description:
      "A modern real-time polling platform where users can create interactive polls, share them instantly, and visualize live results with a beautiful analytics dashboard.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Socket.IO",
      "Tailwind CSS",
    ],
    problem:
      "Makes it easy to gather instant feedback from a group and watch results update live, without refreshing the page or waiting for answers.",
    live: "https://poll-hazel.vercel.app",
    repo: "https://github.com/amito13/Poll",
  },
];

const socials = [
  {
    label: "GitHub",
    handle: "@amito13",
    description: "Explore what I’m building.",
    action: "View GitHub",
    href: "https://github.com/amito13",
  },
  {
    label: "LinkedIn",
    handle: "Amit Dewangan",
    description: "Work, ideas, and everything between.",
    action: "Connect",
    href: "https://www.linkedin.com/in/amit-dewangan-a193b6319/",
  },
  {
    label: "Email",
    handle: "dewanganamit40@gmail.com",
    description: "Have an idea? Let’s talk.",
    action: "Say hello",
    href: "mailto:dewanganamit40@gmail.com",
  },
];

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.29-5.29-1.29-5.29-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.72 5.39-5.3 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (label === "LinkedIn") return <span aria-hidden="true">in</span>;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="tech-marquee" data-reverse={reverse}>
      <div className="tech-marquee__track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <main className="portfolio-shell" data-theme={theme}>
      <button
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="theme-toggle"
        onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        type="button"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {theme === "dark" ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </>
          ) : (
            <path d="M20.9 13.3A9 9 0 0 1 10.7 3.1a9 9 0 1 0 10.2 10.2Z" />
          )}
        </svg>
      </button>

      <section className="portfolio-frame">
        <div className="intro-grid">
          <aside className="profile-column" aria-label="Profile">
            <div className="profile-photo">
              <Image
                src="/profile.jpg"
                alt="Amit Dewangan"
                fill
                sizes="(max-width: 520px) 11rem, 12.5rem"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                preload
              />
            </div>
            <h1>Amit Dewangan</h1>
            <p>Full-stack software engineer for the web and mobile</p>
            <a
              className="text-link"
              href="/Amit_Dewangan_Resume (1).pdf"
              rel="noreferrer"
              target="_blank"
            >
                Resume
            </a>
          </aside>

          <section className="bio-copy" aria-label="About Amit Dewangan">
            <p>
              I&apos;m a software engineer with experience building web and
              mobile products, scalable platforms, and practical business
              systems. I specialize in full-stack development with modern web
              technologies, mobile interfaces, and
              maintainable product foundations.
            </p>

            <p>
              My work focuses on turning complex requirements into reliable
              software that feels clear for users and simple for teams to keep
              improving. I enjoy building clean interfaces, thoughtful APIs, and
              workflows that save time in real-world operations.
            </p>

            <p>
              Beyond coding, I keep learning through projects, technical
              writing, and product experiments. I care about readable code,
              useful design, and shipping things that solve actual problems.
            </p>
          </section>
        </div>

        <div className="marquee-stack" aria-label="Technology stack">
          <Marquee items={technologies} />
          <Marquee items={tools} reverse />
        </div>

        <section className="projects-panel" aria-label="Projects">
          <h2 className="projects-panel__title">projects</h2>

          <ol className="project-list">
            {projects.map((project, index) => (
              <li className="project-list__item" key={project.name}>
                <span className="project-list__name">
                  #{project.name}
                </span>

                <p className="project-list__description">{project.description}</p>

                <p className="project-list__meta">
                  <span className="project-list__meta-label">tech stack</span>
                  {" — "}
                  {project.techStack.join(", ")}
                </p>

                <p className="project-list__meta">
                  <span className="project-list__meta-label">problem it solves</span>
                  {" — "}
                  {project.problem}
                </p>

                <span className="project-list__links">
                  <a
                    className="project-list__link"
                    href={project.live}
                    rel={project.live.startsWith("http") ? "noreferrer" : undefined}
                    target={project.live.startsWith("http") ? "_blank" : undefined}
                  >
                    live link
                  </a>
                  <span aria-hidden="true">—</span>
                  <a
                    className="project-list__link"
                    href={project.repo}
                    rel={project.repo.startsWith("http") ? "noreferrer" : undefined}
                    target={project.repo.startsWith("http") ? "_blank" : undefined}
                  >
                    repo link
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="social-panel" id="social" aria-label="Social links">
          <div className="social-panel__header">
            <p className="panel-kicker">Good things start with a conversation</p>
            <h2>Let&apos;s connect<span>.</span></h2>
            <p>Find me around the web, or drop a note in my inbox.</p>
          </div>

          <ul className="social-list">
            {socials.map((social) => (
              <li className="social-list__item" key={social.label}>
                <a
                  className="social-list__link"
                  href={social.href}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className="social-list__top">
                    <span className="social-list__mark">
                      <SocialIcon label={social.label} />
                    </span>
                    <span className="social-list__arrow" aria-hidden="true">↗</span>
                  </span>
                  <span className="social-list__info">
                    <strong>{social.label}</strong>
                    <span>{social.description}</span>
                  </span>
                  <span className="social-list__handle">{social.handle}</span>
                  <span className="social-list__action">{social.action}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
