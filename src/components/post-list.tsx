"use client";

import { useState } from "react";
import { BLOG_URL, type BlogPost } from "@/lib/blog";

const INITIAL_COUNT = 5;

export function PostList({ posts }: { posts: BlogPost[] }) {
  const [expanded, setExpanded] = useState(false);

  if (posts.length === 0) {
    return (
      <a className="gh-card__fallback" href={BLOG_URL} rel="noreferrer" target="_blank">
        Read my posts on Hashnode ↗
      </a>
    );
  }

  const visible = expanded ? posts : posts.slice(0, INITIAL_COUNT);

  return (
    <>
      <ul className="post-list">
        {visible.map((post) => (
          <li key={post.url}>
            <a className="post-row" href={post.url} rel="noreferrer" target="_blank">
              <span className="post-row__text">
                <span className="post-row__title">
                  {post.title}
                  <span className="post-row__arrow" aria-hidden="true">↗</span>
                </span>
                <span className="post-row__meta">{post.readMinutes} min read</span>
              </span>
              <span className="post-row__date">{post.dateLabel}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="post-list__footer">
        {posts.length > INITIAL_COUNT ? (
          <button
            className="show-more"
            onClick={() => setExpanded((value) => !value)}
            type="button"
            aria-expanded={expanded}
          >
            {expanded ? "show less ↑" : "show more →"}
          </button>
        ) : (
          <span />
        )}
        <a className="post-list__all" href={BLOG_URL} rel="noreferrer" target="_blank">
          all posts on hashnode ↗
        </a>
      </div>
    </>
  );
}
