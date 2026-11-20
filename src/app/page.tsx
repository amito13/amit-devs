import Image from "next/image";
import { CopyEmailButton } from "@/components/copy-email-button";
import { GitHubCard } from "@/components/github-card";
import { PostList } from "@/components/post-list";
import { Scribble } from "@/components/scribble";
import { SocialBadge, type SocialPlatform } from "@/components/social-icons";
import { ThemeShell } from "@/components/theme-shell";
import { VideoGrid } from "@/components/video-grid";
import { WorkTabs } from "@/components/work-tabs";
import { getBlogPosts } from "@/lib/blog";
import { GITHUB_USER, getContributions } from "@/lib/github";
import { YOUTUBE_HANDLE, YOUTUBE_URL, getLatestVideos } from "@/lib/youtube";

// GitHub activity, YouTube uploads and blog posts are refreshed at most once an hour.
export const revalidate = 3600;

const EMAIL = "dewanganamit40@gmail.com";

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

type Project = {
  name: string;
  tagline: string;
  kind: string;
  description: string;
  techStack: string[];
  problem: string;
  live?: string;
  repo: string;
};

const projects: Project[] = [
  {
    name: "form-room",
    tagline: "Form builder",
    kind: "full-stack",
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
    tagline: "Live polling platform",
    kind: "real-time",
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
  {
    name: "mobleet",
    tagline: "Coding practice on mobile",
    kind: "react native",
    description:
      "A mobile coding-practice app: browse and filter algorithm problems, read examples and constraints, and solve them in JavaScript, Python, or Java in a built-in code editor.",
    techStack: [
      "Expo",
      "React Native",
      "TypeScript",
      "Supabase",
      "CodeBox",
      "Expo Router",
      "PostgreSQL",
    ],
    problem:
      "Makes interview practice possible away from a laptop: submissions run safely in CodeBox, an open-source sandbox for code execution, with per-test-case results, Google sign-in, and a progress heatmap.",
    repo: "https://github.com/amito13/mobleet",
  },
];

const socials: Array<{ platform: SocialPlatform; handle: string; href: string }> = [
  { platform: "GitHub", handle: GITHUB_USER, href: `https://github.com/${GITHUB_USER}` },
  {
    platform: "LinkedIn",
    handle: "amit-dewangan",
    href: "https://www.linkedin.com/in/amit-dewangan-a193b6319/",
  },
  { platform: "YouTube", handle: YOUTUBE_HANDLE, href: YOUTUBE_URL },
  {
    platform: "Instagram",
    handle: "dewanganamit40",
    href: "https://www.instagram.com/dewanganamit40",
  },
  { platform: "Email", handle: "email", href: `mailto:${EMAIL}` },
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

const VISIBLE_STACK = 4;

function ProjectGrid() {
  return (
    <ul className="project-grid">
      {projects.map((project) => {
        const shown = project.techStack.slice(0, VISIBLE_STACK);
        const rest = project.techStack.slice(VISIBLE_STACK);

        return (
          <li className="project-card" key={project.name}>
            <div className="project-card__head">
              <h3>{project.name}</h3>
              <span className="project-card__kind">{project.kind}</span>
            </div>
            <p className="project-card__tagline">{project.tagline}</p>

            <ul className="project-card__stack" aria-label="Tech stack">
              {shown.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
              {rest.length > 0 && (
                <li className="project-card__more" title={rest.join(", ")} aria-label={`and ${rest.join(", ")}`}>
                  +{rest.length}
                </li>
              )}
            </ul>

            <p className="project-card__description">{project.description}</p>
            <p className="project-card__problem">
              <span>solves</span> — {project.problem}
            </p>

            <div className="project-card__links">
              {project.live && (
                <a href={project.live} rel="noreferrer" target="_blank">
                  live ↗
                </a>
              )}
              <a href={project.repo} rel="noreferrer" target="_blank">
                repo ↗
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default async function Home() {
  const [calendar, videos, posts] = await Promise.all([
    getContributions(),
    getLatestVideos(),
    getBlogPosts(),
  ]);

  return (
    <ThemeShell>
      <section className="portfolio-frame">
        <div className="page-grid">
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
            <p>
              Full-stack software engineer for the{" "}
              <Scribble delay={900}>web</Scribble> and{" "}
              <Scribble delay={1250} variant={1}>mobile</Scribble>
            </p>

            <a
              className="text-link"
              href="/Amit_Dewangan_Resume (1).pdf"
              rel="noreferrer"
              target="_blank"
            >
              resume ↗
            </a>

            <nav aria-label="Social links">
              <ul className="social-links">
                {socials.map((social) => {
                  const external = social.href.startsWith("http");
                  return (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        aria-label={`${social.platform}: ${social.handle}`}
                        rel={external ? "noreferrer" : undefined}
                        target={external ? "_blank" : undefined}
                      >
                        <SocialBadge platform={social.platform} />
                        <span>{social.handle}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            
          </aside>

          <div className="content-column">
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

            <div className="marquee-stack" aria-label="Technology stack">
              <Marquee items={technologies} />
              <Marquee items={tools} reverse />
            </div>

            <WorkTabs
              label="Projects and writing"
              panels={[
                { id: "projects", label: "Projects", content: <ProjectGrid /> },
                { id: "writing", label: "Writing", content: <PostList posts={posts} /> },
              ]}
            />

            <GitHubCard calendar={calendar} />

            <section className="youtube-section" aria-label="YouTube">
              <div className="section-label">
                <SocialBadge platform="YouTube" />
                <span>YouTube</span>
                <a href={YOUTUBE_URL} rel="noreferrer" target="_blank">
                  {YOUTUBE_HANDLE} ↗
                </a>
              </div>

              {videos.length > 0 ? (
                <VideoGrid videos={videos} />
              ) : (
                <a className="gh-card__fallback" href={YOUTUBE_URL} rel="noreferrer" target="_blank">
                  Watch my latest videos on YouTube ↗
                </a>
              )}
            </section>

            <section className="contact-line" id="contact" aria-label="Contact">
              <p>
                Have an idea?{" "}
                <a className="contact-line__email" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
              <CopyEmailButton email={EMAIL} />
            </section>
          </div>
        </div>
      </section>
    </ThemeShell>
  );
}
