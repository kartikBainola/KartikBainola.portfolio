"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:font-sans focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
