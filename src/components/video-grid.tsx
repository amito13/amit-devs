"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/lib/youtube";

const INITIAL_COUNT = 4;
const EXPANDED_COUNT = 12;

export function VideoGrid({ videos }: { videos: Video[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = videos.slice(0, expanded ? EXPANDED_COUNT : INITIAL_COUNT);
  const canExpand = videos.length > INITIAL_COUNT;

  return (
    <>
      <ul className="video-grid">
        {visible.map((video) => (
          <li key={video.id}>
            <a className="video-card" href={video.url} rel="noreferrer" target="_blank">
              <span className="video-card__thumb">
                <Image
                  src={video.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 45vw, 12rem"
                />
                <span className="video-card__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
                  </svg>
                </span>
                {video.isShort && <span className="video-card__badge">short</span>}
              </span>
              <span className="video-card__title">
                {video.title}
                <span className="video-card__arrow" aria-hidden="true">↗</span>
              </span>
              {video.publishedLabel && (
                <span className="video-card__date">{video.publishedLabel}</span>
              )}
            </a>
          </li>
        ))}
      </ul>

      {canExpand && (
        <button
          className="show-more"
          onClick={() => setExpanded((value) => !value)}
          type="button"
          aria-expanded={expanded}
        >
          {expanded ? "show less ↑" : "show more →"}
        </button>
      )}
    </>
  );
}
