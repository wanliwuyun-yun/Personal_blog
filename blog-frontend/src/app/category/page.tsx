"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { categoryApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export default function CategoryPage() {
  const [categories, setCategories] = useState<(Category & { count: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getWithCount();
        if (res.code === 200) {
          setCategories(res.data);
        } else {
          setError("加载分类失败");
        }
      } catch {
        setError("无法连接到服务器");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gradient mb-3">文章分类</h1>
        <p className="text-gray-400">按分类浏览所有文章</p>
      </motion.div>

      {error && (
        <div className="text-center py-12 text-gray-400">{error}</div>
      )}

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-star-light/10 bg-star-blue/20 p-6">
              <div className="skeleton h-6 w-24 mb-3" />
              <div className="skeleton h-4 w-full mb-2" />
              <div className="skeleton h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/?categoryId=${category.id}`}>
                <div className={cn(
                  "rounded-xl p-6 border border-star-light/10",
                  "bg-star-blue/20 backdrop-blur-sm",
                  "hover:shadow-glow hover:border-star-light/40",
                  "transition-all duration-300 group cursor-pointer"
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-white group-hover:text-star-light transition-colors">
                      {category.name}
                    </h2>
                    <span className="text-sm text-star-light/50 bg-star-blue/40 px-2.5 py-1 rounded-full">
                      {category.count} 篇
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {category.description || "暂无描述"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
