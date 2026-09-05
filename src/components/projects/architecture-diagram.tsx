"use client";

import { motion } from "framer-motion";

interface ArchitectureDiagramProps {
  title: string;
  layers: string[];
}

export function ArchitectureDiagram({ title, layers }: ArchitectureDiagramProps) {
  if (!layers.length) return null;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
        INTERACTIVE ARCHITECTURE
      </p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>

      <div className="mt-6 space-y-2">
        {layers.map((layer, index) => (
          <div key={layer}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08 }}
              className="inline-flex rounded-xl border border-border/70 bg-muted/30 px-4 py-2 text-sm font-medium"
            >
              {layer}
            </motion.div>
            {index < layers.length - 1 && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0.5 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08 + 0.06 }}
                className="ml-5 h-8 w-px origin-top bg-gradient-to-b from-accent-blue/70 to-accent-purple/30"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
