"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, withBasePath } from "@/lib/utils";

// --- TYPES ---
export interface CarouselItem {
  /** Poster / thumbnail image (shown on non-active cards and as video poster) */
  poster?: string;
  /** Video src – when provided the active card plays it */
  video?: string;
  alt: string;
}

export interface SimpleImageCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoplayDelay?: number;
}

// --- CARD MEDIA (plays video only when active) ---
function CardMedia({
  item,
  active,
}: {
  item: CarouselItem;
  active: boolean;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    if (!active) {
      video.pause();
      return;
    }

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled || !video.paused) return;
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const onPause = () => {
      if (cancelled) return;
      window.setTimeout(tryPlay, 80);
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("pause", onPause);

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [active]);

  if (item.video) {
    return (
      <video
        ref={videoRef}
        className="w-full h-full object-cover object-top"
        poster={item.poster ? withBasePath(item.poster) : undefined}
        muted
        loop
        playsInline
        autoPlay={active}
        preload={active ? "auto" : "metadata"}
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={withBasePath(item.video)} type="video/webm" />
      </video>
    );
  }

  return (
    <img
      src={item.poster ? withBasePath(item.poster) : undefined}
      alt={item.alt}
      className="w-full h-full object-cover object-top"
      draggable={false}
    />
  );
}

// --- SIMPLE CAROUSEL COMPONENT ---
export const SimpleImageCarousel = React.forwardRef<
  HTMLDivElement,
  SimpleImageCarouselProps
>(({ items, autoplayDelay = 4000, className, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(
    Math.floor(items.length / 2)
  );

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  React.useEffect(() => {
    const timer = setInterval(handleNext, autoplayDelay);
    return () => clearInterval(timer);
  }, [handleNext, autoplayDelay]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full flex flex-col items-center justify-center gap-3 sm:gap-5",
        className
      )}
      {...props}
    >
      {/* Carousel stage */}
      <div
        className="relative w-full h-[260px] sm:h-[320px] md:h-[460px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {items.map((item, index) => {
          const total = items.length;
          const offset = index - currentIndex;
          let pos = ((offset % total) + total) % total;
          if (pos > Math.floor(total / 2)) pos -= total;

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;
          const isVisible = Math.abs(pos) <= 1;

          const translateX = pos * 115;
          const scale = isCenter ? 1 : isAdjacent ? 0.82 : 0.65;
          const rotateY = pos * -12;
          const opacity = isCenter ? 1 : isAdjacent ? 0.45 : 0;
          const blurPx = isCenter ? 0 : 5;

          return (
            <div
              key={index}
              aria-hidden={!isCenter}
              className="absolute w-32 h-[240px] sm:w-40 sm:h-[300px] md:w-60 md:h-[430px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity,
                filter: `blur(${blurPx}px)`,
                visibility: isVisible ? "visible" : "hidden",
                willChange: "transform, opacity, filter",
                background: "#0b0d12",
              }}
            >
              {/* Phone notch for device-like look */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-black/80 z-10" />
              <CardMedia item={item} active={isCenter} />
            </div>
          );
        })}
      </div>

      {/* Nav + Dots */}
      <div className="flex items-center gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 bg-background/50 backdrop-blur-sm border-border/50"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                currentIndex === index
                  ? "w-5 bg-foreground"
                  : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 bg-background/50 backdrop-blur-sm border-border/50"
          onClick={handleNext}
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});

SimpleImageCarousel.displayName = "SimpleImageCarousel";
