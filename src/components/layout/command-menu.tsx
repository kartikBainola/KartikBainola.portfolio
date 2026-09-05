"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Home,
  User,
  Briefcase,
  Code,
  FolderOpen,
  Wrench,
  BookOpen,
  Mail,
  Download,
  Moon,
  Sun,
  Laptop,
  Copy,
  Users,
  Code2,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { projects } from "@/data/projects";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/providers/theme-provider";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  About: <User className="h-4 w-4" />,
  Experience: <Briefcase className="h-4 w-4" />,
  Skills: <Code className="h-4 w-4" />,
  Projects: <FolderOpen className="h-4 w-4" />,
  Services: <Wrench className="h-4 w-4" />,
  Blog: <BookOpen className="h-4 w-4" />,
  Contact: <Mail className="h-4 w-4" />,
};

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();
  const { theme, toggleTheme, setTheme } = useTheme();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const navigate = (href: string) => {
    onOpenChange(false);
    setSearch("");
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-lg">
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <Command className="bg-card" loop>
          <div className="flex items-center border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages, projects, actions..."
              className="flex h-12 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
              <Command.Item
                onSelect={() => navigate("/")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Home className="h-4 w-4" />
                Home
              </Command.Item>
              {NAV_LINKS.map((link) => (
                <Command.Item
                  key={link.href}
                  onSelect={() => navigate(link.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
                >
                  {iconMap[link.label]}
                  {link.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Projects" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
              {projects.map((project) => (
                <Command.Item
                  key={project.id}
                  onSelect={() => navigate(`/projects/${project.id}`)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
                >
                  <FolderOpen className="h-4 w-4" />
                  {project.title}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {project.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
              <Command.Item
                onSelect={() => {
                  navigator.clipboard.writeText(SITE_CONFIG.email);
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Copy className="h-4 w-4" />
                Copy Email
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.open(SOCIAL_LINKS.github, "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Code2 className="h-4 w-4" />
                Open GitHub
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.open(SOCIAL_LINKS.linkedin, "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Users className="h-4 w-4" />
                Open LinkedIn
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.open("/KartikBainola_2026_resume.pdf", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Theme" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
              <Command.Item
                onSelect={() => {
                  setTheme("dark");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Moon className="h-4 w-4" />
                Dark {theme === "dark" ? "•" : ""}
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme("light");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Sun className="h-4 w-4" />
                Light {theme === "light" ? "•" : ""}
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme("system");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                <Laptop className="h-4 w-4" />
                System {theme === "system" ? "•" : ""}
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  toggleTheme();
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-muted"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Laptop className="h-4 w-4" />
                )}
                Cycle Theme
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
