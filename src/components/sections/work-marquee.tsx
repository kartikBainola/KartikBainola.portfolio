"use client";

import { useLayoutEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { getProjectScreenshots } from "@/lib/project-media";
import { withBasePath } from "@/lib/utils";
import "./work-marquee.css";

const CARD_COUNT = 37;
const RADIUS_RATIO = 6.85;
const SPIN_MS = 92500;

const stills = projects
  .filter((project) => project.featured)
  .flatMap((project) =>
    getProjectScreenshots(project).map((src) => ({
      src,
      title: project.title,
    }))
  );

const cards = stills.length
  ? Array.from({ length: CARD_COUNT }, (_, index) => stills[index % stills.length]!)
  : [];

export function WorkMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene || cards.length === 0) return;

    let frame = 0;
    let radius = 0;
    let rotation = 0;
    let last = 0;
    let onScreen = true;

    const layout = (spin: number) => {
      slotsRef.current.forEach((slot, index) => {
        if (!slot) return;
        const angle = (360 / cards.length) * index + spin;
        slot.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      });
    };

    const tick = (now: number) => {
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (onScreen && !document.hidden) {
        rotation -= (360 / (SPIN_MS / 1000)) * dt;
        if (rotation <= -360) rotation += 360;
        layout(rotation);
      }
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const width = scene.offsetWidth;
      if (!width) return;
      const nextRadius = Math.round(width * RADIUS_RATIO);
      if (Math.abs(nextRadius - radius) < 2) return;
      radius = nextRadius;
      section.style.setProperty("--radius", `${nextRadius}px`);
      layout(rotation);
      section.dataset.ready = "true";
    };

    sync();

    const resize = new ResizeObserver(sync);
    resize.observe(scene);

    const intersection = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      last = 0;
      if (onScreen) layout(rotation);
    });
    intersection.observe(section);

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      delete section.dataset.ready;
    };
  }, []);

  if (cards.length === 0) return null;

  return (
    <section ref={sectionRef} className="screenshot-orbit" aria-label="Project screenshots">
      <div className="screenshot-orbit__glow" aria-hidden="true" />
      <div className="screenshot-orbit__stage">
        <div ref={sceneRef} className="screenshot-orbit__scene">
          <div className="screenshot-orbit__anchor" aria-hidden="true">
            {cards.map((card, index) => (
              <div
                key={`${card.src}-${index}`}
                className="screenshot-orbit__slot"
                ref={(node) => {
                  slotsRef.current[index] = node;
                }}
              >
                <figure className="screenshot-orbit__card">
                  <img
                    src={withBasePath(card.src)}
                    alt=""
                    width={224}
                    height={526}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="screenshot-orbit__fade" aria-hidden="true" />
    </section>
  );
}
