"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { AppScreen } from "@/lib/screens";

const SWIPE_PX = 30;

/** Swipeable app screenshots: touch swipe, mouse drag, arrows, and tap for full size. */
export function ScreenViewer({ screens, name }: { screens: AppScreen[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [swiped, setSwiped] = useState(false);
  const [full, setFull] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Where the track is heading; `index` lags behind it while a smooth scroll is running.
  const targetRef = useRef(0);
  const settleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dragRef = useRef<{ x: number; from: number; start: number; moved: boolean } | null>(null);
  const justDraggedRef = useRef(false);
  const fullSwipeRef = useRef<number | null>(null);

  const last = screens.length - 1;
  const many = screens.length > 1;

  function slideAt(position: number) {
    return trackRef.current?.children[position] as HTMLElement | undefined;
  }

  function goTo(position: number, instant = false) {
    const track = trackRef.current;
    const next = Math.max(0, Math.min(last, position));
    const slide = slideAt(next);
    if (!track || !slide) return;

    targetRef.current = next;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
      behavior: instant || reduceMotion ? "instant" : "smooth",
    });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const middle = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, position) => {
      const slide = child as HTMLElement;
      const gap = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
      if (gap < distance) {
        distance = gap;
        nearest = position;
      }
    });

    setIndex(nearest);
    if (nearest > 0) setSwiped(true);

    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      if (dragRef.current?.moved) return;
      targetRef.current = nearest;
      delete track.dataset.dragging;
    }, 160);
  }

  // Touch uses native scrolling; only the mouse needs help to drag the strip.
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    justDraggedRef.current = false;
    if (!many || event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = {
      x: event.clientX,
      from: event.currentTarget.scrollLeft,
      start: index,
      moved: false,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const track = event.currentTarget;
    const dx = event.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < 6) return;
      drag.moved = true;
      track.dataset.dragging = "true";
      track.setPointerCapture(event.pointerId);
    }
    track.scrollLeft = drag.from - dx;
  }

  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag?.moved) return;
    justDraggedRef.current = true;

    const dx = event.clientX - drag.x;
    const step = event.type === "pointercancel" || Math.abs(dx) < SWIPE_PX ? 0 : dx < 0 ? 1 : -1;
    // A long drag lands where it was dropped; a short flick moves one screen.
    goTo(Math.abs(index - drag.start) > 1 ? index : drag.start + step);
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      if (trackRef.current) delete trackRef.current.dataset.dragging;
    }, 600);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step || !many) return;
    event.preventDefault();
    goTo(targetRef.current + step);
    if (trackRef.current?.contains(document.activeElement)) {
      slideAt(targetRef.current)?.querySelector("button")?.focus({ preventScroll: true });
    }
  }

  function onScreenClick(position: number) {
    if (justDraggedRef.current) {
      justDraggedRef.current = false;
      return;
    }
    if (position !== index) {
      goTo(position);
      return;
    }
    setFull(position);
    dialogRef.current?.showModal();
  }

  function stepFull(step: number) {
    if (full === null) return;
    const next = full + step;
    if (next < 0 || next > last) return;
    setFull(next);
    goTo(next, true);
  }

  const fullScreen = full === null ? null : screens[full];

  return (
    <div className="screens" role="group" aria-label={`${name} app screens`} onKeyDown={onKeyDown}>
      <div className="screens__well">
        <div
          ref={trackRef}
          className="screens__track"
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          {screens.map((screen, position) => (
            <div className="screens__slide" key={`${position}-${screen.src}`} data-active={position === index}>
              <button
                className="screens__phone"
                type="button"
                tabIndex={position === index ? 0 : -1}
                aria-label={`Open ${screen.caption} full size`}
                onClick={() => onScreenClick(position)}
              >
                <Image src={screen.src} alt={screen.alt} fill sizes="10rem" draggable={false} />
              </button>
            </div>
          ))}
        </div>

        {many && (
          <span className="screens__hint" data-hidden={swiped} aria-hidden="true">
            <svg
              viewBox="0 0 22 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 6H2M7 1 2 6l5 5" />
            </svg>
            swipe left for more screens
          </span>
        )}
      </div>

      <div className="screens__foot">
        <span aria-live="polite">{screens[index]?.caption}</span>
        {many && (
          <span className="screens__nav">
            <button
              type="button"
              aria-label="Previous screen"
              disabled={index === 0}
              onClick={() => goTo(targetRef.current - 1)}
            >
              ←
            </button>
            <span className="screens__count">
              {index + 1} / {screens.length}
            </span>
            <button
              type="button"
              aria-label="Next screen"
              disabled={index === last}
              onClick={() => goTo(targetRef.current + 1)}
            >
              →
            </button>
          </span>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="screen-dialog"
        aria-label={`${name} screen, full size`}
        onClose={() => setFull(null)}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.key === "ArrowRight") stepFull(1);
          if (event.key === "ArrowLeft") stepFull(-1);
        }}
        onPointerDown={(event) => {
          fullSwipeRef.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (fullSwipeRef.current === null) return;
          const dx = event.clientX - fullSwipeRef.current;
          fullSwipeRef.current = null;
          if (Math.abs(dx) > SWIPE_PX) stepFull(dx < 0 ? 1 : -1);
        }}
      >
        {fullScreen && full !== null && (
          <div className="screen-dialog__inner">
            <button
              className="screen-dialog__close"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
            <div className="screen-dialog__frame">
              <Image
                key={fullScreen.src}
                src={fullScreen.src}
                alt={fullScreen.alt}
                fill
                sizes="(max-width: 520px) 92vw, 26rem"
                draggable={false}
              />
            </div>
            <div className="screens__foot">
              <span aria-live="polite">{fullScreen.caption}</span>
              {many && (
                <span className="screens__nav">
                  <button
                    type="button"
                    aria-label="Previous screen"
                    disabled={full === 0}
                    onClick={() => stepFull(-1)}
                  >
                    ←
                  </button>
                  <span className="screens__count">
                    {full + 1} / {screens.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next screen"
                    disabled={full === last}
                    onClick={() => stepFull(1)}
                  >
                    →
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
