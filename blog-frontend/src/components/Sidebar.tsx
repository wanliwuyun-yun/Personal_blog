"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { articleApi, categoryApi, tagApi } from "@/lib/api";
import type { Article, Tag } from "@/types";
import { cn, formatDate } from "@/lib/utils";

export default function Sidebar() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; count: number }[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, tagsRes] = await Promise.all([
          articleApi.getLatest(),
          categoryApi.getWithCount(),
          tagApi.getAll(),
        ]);
        if (articlesRes.code === 200) setLatestArticles(articlesRes.data);
        if (categoriesRes.code === 200) setCategories(categoriesRes.data);
        if (tagsRes.code === 200) setTags(tagsRes.data);
      } catch (err) {
        console.error("Sidebar fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <aside className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-star-light/10 bg-star-blue/20 p-4">
            <div className="skeleton h-5 w-24 mb-4" />
            <div className="skeleton h-3 w-full mb-2" />
            <div className="skeleton h-3 w-3/4" />
          </div>
        ))}
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      {/* 分类 */}
      <div className="rounded-xl border border-star-light/10 bg-star-blue/20 backdrop-blur-sm p-5">
        <h3 className="text-sm font-semibold text-star-light mb-4 flex items-center gap-2">
          <span>📂</span> 分类
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/?categoryId=${cat.id}`}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm",
                "text-gray-400 hover:text-white hover:bg-star-blue/30 transition-all"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-star-light/50 bg-star-blue/40 px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 最新文章 */}
      <div className="rounded-xl border border-star-light/10 bg-star-blue/20 backdrop-blur-sm p-5">
        <h3 className="text-sm font-semibold text-star-light mb-4 flex items-center gap-2">
          <span>📝</span> 最新文章
        </h3>
        <div className="space-y-3">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="block group"
            >
              <p className="text-sm text-gray-400 group-hover:text-white transition-colors line-clamp-1">
                {article.title}
              </p>
              <span className="text-xs text-gray-500">{formatDate(article.createTime)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 标签云 */}
      <div className="rounded-xl border border-star-light/10 bg-star-blue/20 backdrop-blur-sm p-5">
        <h3 className="text-sm font-semibold text-star-light mb-4 flex items-center gap-2">
          <span>🏷️</span> 标签
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag?id=${tag.id}`}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all hover:scale-105",
                "border border-star-light/20 hover:border-star-light/40"
              )}
              style={{
                backgroundColor: `${tag.color || "#4ECDC4"}20`,
                color: tag.color || "#4ECDC4",
              }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
