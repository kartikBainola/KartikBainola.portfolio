"use client";

import { ThemeProvider } from "./theme-provider";
import { SmoothScroll } from "./smooth-scroll";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { BackToTop } from "@/components/effects/back-to-top";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <ScrollProgress />
        {children}
        <BackToTop />
      </SmoothScroll>
    </ThemeProvider>
  );
}
