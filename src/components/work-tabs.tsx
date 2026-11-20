"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Panel = { id: string; label: string; content: ReactNode };

/** Pill tabs; every panel stays in the DOM (hidden) so the content is still crawlable. */
export function WorkTabs({ panels, label }: { panels: Panel[]; label: string }) {
  const [active, setActive] = useState(panels[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = panels.findIndex((panel) => panel.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % panels.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + panels.length) % panels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = panels.length - 1;
    else return;

    event.preventDefault();
    setActive(panels[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="work-tabs" aria-label={label}>
      <div className="work-tabs__list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {panels.map((panel, index) => {
          const selected = panel.id === active;
          return (
            <button
              key={panel.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${baseId}-tab-${panel.id}`}
              className="work-tabs__tab"
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${panel.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(panel.id)}
            >
              {panel.label}
            </button>
          );
        })}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          id={`${baseId}-panel-${panel.id}`}
          className="work-tabs__panel"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${panel.id}`}
          hidden={panel.id !== active}
        >
          {panel.content}
        </div>
      ))}
    </section>
  );
}
