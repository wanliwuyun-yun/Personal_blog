"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "文章管理", icon: "📝" },
  { href: "/admin/article/edit", label: "写文章", icon: "✍️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Admin Navigation */}
      <div className="glass border-b border-star-light/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-star-light">
              ⚙️ 后台管理
            </Link>
            <div className="flex items-center gap-1">
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
                      "px-3 py-1.5 text-sm rounded-lg transition-all",
                      isActive
                        ? "bg-star-blue/40 text-star-light border border-star-light/20"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {link.icon} {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-star-light transition-colors"
          >
            返回首页 →
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
