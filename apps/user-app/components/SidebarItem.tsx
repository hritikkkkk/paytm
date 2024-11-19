"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export default function SidebarItem({ href, title, icon }: SidebarItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer p-2 pl-4 rounded-lg transition-colors",
        selected
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      onClick={() => router.push(href)}
    >
      <div className="mr-3">{icon}</div>
      <div className="font-medium">{title}</div>
    </div>
  );
}
