"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/category", label: "分类" },
  { href: "/tag", label: "标签" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // 后台管理页面不显示导航
  if (pathname.startsWith("/admin")) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-star-light/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold text-gradient">StarBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm rounded-lg transition-all duration-300",
                    isActive
                      ? "text-star-light"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-star-blue/40 border border-star-light/20 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Search */}
            <form onSubmit={handleSearch} className="relative ml-2">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="搜索文章..."
                      className="w-full px-3 py-1.5 pr-8 text-sm rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50"
                    />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">
                      ✕
                    </button>
                  </motion.div>
                ) : (
                  <button type="button" onClick={() => setSearchOpen(true)}
                    className="p-2 text-gray-400 hover:text-white transition-colors" title="搜索">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </AnimatePresence>
            </form>

            {/* Admin Entry */}
            <Link href="/admin"
              className="px-3 py-1.5 text-xs rounded-lg border border-star-light/20 text-gray-400 hover:text-star-light hover:border-star-light/40 transition-all ml-1">
              管理
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Icon */}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white" title="搜索">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label="菜单"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-b border-star-light/10"
          >
            <form onSubmit={handleSearch} className="px-4 py-3">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索文章..."
                className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-b border-star-light/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm transition-all",
                      isActive
                        ? "bg-star-blue/40 text-star-light border border-star-light/20"
                        : "text-gray-400 hover:text-white hover:bg-star-blue/20"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Mobile Admin Entry */}
              <Link href="/admin" onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-star-light hover:bg-star-blue/20 border-t border-star-light/10 mt-2 pt-3">
                ⚙️ 后台管理
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
