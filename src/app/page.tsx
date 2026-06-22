"use client";

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

const tabs = {
  projects: {
    label: "Projects",
    title: "Cloud workflow dashboard",
    description:
      "A placeholder project card for a production-style dashboard that tracks business workflows, user actions, and operational metrics from one clean interface.",
    meta: "Next.js / APIs / PostgreSQL",
  },
  blogs: {
    label: "Blogs",
    title: "Writing maintainable full-stack code",
    description:
      "A placeholder blog card about building web and mobile products with readable architecture, practical abstractions, and reliable delivery habits.",
    meta: "Engineering / Web / Mobile",
  },
};

const socials = [
  { label: "GitHub", href: "https://example.com/github" },
  { label: "LinkedIn", href: "https://example.com/linkedin" },
  { label: "Email", href: "mailto:amit@example.com" },
];

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
  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("projects");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const activeContent = tabs[activeTab];

  return (
    <main className="portfolio-shell" data-theme={theme}>
      <button
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="theme-toggle"
        onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        type="button"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>

      <section className="portfolio-frame">
        <div className="intro-grid">
          <aside className="profile-column" aria-label="Profile">
            <div className="profile-photo">Profile photo</div>
            <h1>Amit Dewangan</h1>
            <p>Full-stack software engineer for the web and mobile</p>
            <a className="text-link" href="/resume.pdf" target="_blank">
              Resume
            </a>
          </aside>

          <section className="bio-copy" aria-label="About Amit Dewangan">
            <p>
              I&apos;m a software engineer with experience building web and
              mobile products, scalable platforms, and practical business
              systems. I specialize in full-stack development with modern web
              technologies, mobile interfaces, cloud-aware architecture, and
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

        <section className="tabs-section" aria-label="Projects and blogs">
          <div className="tab-buttons" role="tablist" aria-label="Portfolio tabs">
            {(Object.keys(tabs) as Array<keyof typeof tabs>).map((tabKey) => (
              <button
                aria-controls="tab-panel"
                aria-selected={activeTab === tabKey}
                className="tab-button"
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                role="tab"
                type="button"
              >
                {tabs[tabKey].label}
              </button>
            ))}
          </div>

          <article className="tab-panel" id="tab-panel" role="tabpanel">
            <p className="panel-kicker">{activeContent.label}</p>
            <h2>{activeContent.title}</h2>
            <p>{activeContent.description}</p>
            <span>{activeContent.meta}</span>
          </article>
        </section>

        <section className="redirects-section" aria-label="Redirect links">
          <a className="redirect-button" href="#tab-panel">
            Project redirect
          </a>
          <a className="redirect-button" href="#social">
            Social redirect
          </a>
        </section>

        <section className="social-panel" id="social" aria-label="Social links">
          <h2>Social</h2>
          <div>
            {socials.map((social) => (
              <a
                href={social.href}
                key={social.label}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                target={social.href.startsWith("http") ? "_blank" : undefined}
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
