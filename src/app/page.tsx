"use client";

import { useEffect, useState } from "react";

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
  // blogs: {
  //   label: "Blogs",
  // },
};

// type Blog = {
//   id: string;
//   title: string;
//   brief: string;
//   url: string;
//   publishedAt: string;
//   readTimeInMinutes: number;
// };

const socials = [
  {
    label: "GitHub",
    handle: "amitdewangan",
    detail: "Code",
    action: "Follow",
    href: "https://github.com/amito13",
  },
  {
    label: "LinkedIn",
    handle: "Amit Dewangan",
    detail: "Professional network",
    action: "Connect",
    href: "hhttps://www.linkedin.com/in/amit-dewangan-a193b6319/",
  },
  {
    label: "Email",
    handle: "Amit",
    detail: "Ideas and opportunities",
    action: "Email",
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
  return <span aria-hidden="true">@</span>;
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
  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("projects");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  // const [blogs, setBlogs] = useState<Blog[]>([]);
  // const [blogsStatus, setBlogsStatus] = useState<
  //   "loading" | "ready" | "error"
  // >("loading");
  const activeContent = tabs[activeTab];

  // useEffect(() => {
  //   const controller = new AbortController();

  //   async function loadBlogs() {
  //     try {
  //       const response = await fetch("/api/blogs", {
  //         signal: controller.signal,
  //       });

  //       if (!response.ok) throw new Error("Unable to fetch blogs");

  //       setBlogs((await response.json()) as Blog[]);
  //       setBlogsStatus("ready");
  //     } catch (error) {
  //       if (error instanceof DOMException && error.name === "AbortError") return;
  //       setBlogsStatus("error");
  //     }
  //   }

  //   loadBlogs();
  //   return () => controller.abort();
  // }, []);

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
            <a
              className="text-link"
              href="/MyResume1.pdf"
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

          {/* <div className="tab-panel" id="tab-panel" role="tabpanel">
            <p className="panel-kicker">{activeContent.label}</p>

            {activeTab === "projects" ? (
              <article className="project-card">
                <h2>{tabs.projects.title}</h2>
                <p>{tabs.projects.description}</p>
                <span>{tabs.projects.meta}</span>
              </article>
            ) : (
              <div
                aria-busy={blogsStatus === "loading"}
                aria-live="polite"
                className="blog-grid"
              >
                {blogsStatus === "loading" && (
                  <p className="blogs-message">Loading blogs…</p>
                )}

                {blogsStatus === "error" && (
                  <p className="blogs-message">
                    Blogs could not be loaded right now. Please try again later.
                  </p>
                )}

                {blogsStatus === "ready" && blogs.length === 0 && (
                  <p className="blogs-message">No blogs published yet.</p>
                )}

                {blogsStatus === "ready" && blogs.map((blog) => (
                  <a
                    aria-label={`Read ${blog.title} on Hashnode`}
                    className="blog-card"
                    href={blog.url}
                    key={blog.id}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="blog-card__heading">
                      <h2>{blog.title}</h2>
                      <span aria-hidden="true" className="blog-card__arrow">
                        ↗
                      </span>
                    </div>
                    <p>{blog.brief}</p>
                    <span className="blog-card__meta">
                      {new Intl.DateTimeFormat("en", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(blog.publishedAt))}
                      {" · "}
                      {blog.readTimeInMinutes} min read
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div> */}
        </section>

        {/* <section className="redirects-section" aria-label="Redirect links">
          <a className="redirect-button" href="#tab-panel">
            Project redirect
          </a>
          <a className="redirect-button" href="#social">
            Social redirect
          </a>
        </section> */}

        <section className="social-panel" id="social" aria-label="Social links">
          <div className="social-panel__header">
            <p className="panel-kicker">Find me online</p>
            <h2>Let&apos;s connect</h2>
            <p>Follow my work, start a conversation, or just say hello.</p>
          </div>

          <div className="social-grid">
            {socials.map((social) => (
              <a
                className="social-card"
                href={social.href}
                key={social.label}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                target={social.href.startsWith("http") ? "_blank" : undefined}
              >
                <span className="social-card__mark">
                  <SocialIcon label={social.label} />
                </span>
                <span className="social-card__content">
                  <strong>{social.handle}</strong>
                  <span>{social.detail}</span>
                </span>
                <span className="social-card__action">
                  {social.action}
                </span>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
