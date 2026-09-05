"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      data-cursor-hover
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm transition-all hover:border-accent-blue/50 hover:bg-muted",
        className
      )}
    >
      <span>{email}</span>
      {copied ? (
        <Check className="h-4 w-4 text-accent-cyan" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
