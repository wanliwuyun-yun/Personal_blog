"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";

const adminLinks = [
  { href: "/admin", label: "仪表盘", icon: "📊" },
  { href: "/admin/articles", label: "文章管理", icon: "📝" },
  { href: "/admin/article/edit", label: "写文章", icon: "✍️" },
  { href: "/admin/categories", label: "分类管理", icon: "📂" },
  { href: "/admin/tags", label: "标签管理", icon: "🏷️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 glass border-r border-star-light/10 relative">
        <BorderBeam duration={8} size={60} />
        <div className="p-4 border-b border-star-light/10">
          <Link href="/admin" className="flex items-center gap-2 group">
            <span className="text-xl">⚙️</span>
            <span className="font-bold text-star-light text-lg">StarBlog</span>
          </Link>
          <p className="text-xs text-gray-500 mt-0.5">后台管理系统</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-star-light bg-star-blue/30 border border-star-light/15"
                    : "text-gray-400 hover:text-white hover:bg-star-blue/10"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="absolute inset-0 bg-star-blue/20 rounded-xl border border-star-light/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.icon}</span>
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-star-light/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-star-blue/10 transition-all"
          >
            <span>←</span>
            <span>返回前台</span>
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-star-light/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/admin" className="font-bold text-star-light text-lg">
            ⚙️ StarBlog
          </Link>
          <div className="flex gap-2 overflow-x-auto">
            {adminLinks.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-2.5 py-1.5 text-xs rounded-lg whitespace-nowrap transition-all",
                    isActive
                      ? "bg-star-blue/40 text-star-light"
                      : "text-gray-400"
                  )}
                >
                  {link.icon}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pt-14 md:pt-0">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
