"use client";

import { ThemeProvider } from "./theme-provider";
import { SmoothScroll } from "./smooth-scroll";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { BackToTop } from "@/components/effects/back-to-top";
import { CustomCursor } from "@/components/effects/custom-cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        {children}
        <BackToTop />
      </SmoothScroll>
    </ThemeProvider>
  );
}
