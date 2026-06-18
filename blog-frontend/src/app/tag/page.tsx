"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import { articleApi, tagApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Article, Tag } from "@/types";

function TagContent() {
  const searchParams = useSearchParams();
  const tagId = searchParams.get("id");
  const [tags, setTags] = useState<Tag[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTag, setActiveTag] = useState<number | null>(tagId ? Number(tagId) : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await tagApi.getAll();
        if (res.code === 200) setTags(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await articleApi.getList({
          page: 1,
          size: 50,
          tagId: activeTag || undefined,
        });
        if (res.code === 200) setArticles(res.data.records);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [activeTag]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-3">标签</h1>
        <p className="text-gray-400">通过标签快速查找文章</p>
      </motion.div>

      {/* 标签云 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm transition-all border",
            !activeTag
              ? "bg-star-blue/50 border-star-light/40 text-star-light"
              : "border-star-light/10 text-gray-400 hover:text-white hover:border-star-light/30"
          )}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all border",
              activeTag === tag.id
                ? "bg-star-blue/50 border-star-light/40 text-star-light shadow-glow"
                : "border-star-light/10 text-gray-400 hover:text-white hover:border-star-light/30"
            )}
          >
            {tag.name}
          </button>
        ))}
      </motion.div>

      {/* 文章列表 */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-star-light/10 bg-star-blue/20 p-6">
              <div className="skeleton h-4 w-32 mb-3" />
              <div className="skeleton h-6 w-3/4 mb-3" />
              <div className="skeleton h-4 w-full" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🏷️</div>
          <p>该标签下暂无文章</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TagPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="skeleton h-8 w-32 mx-auto mb-8" />
        <div className="flex justify-center gap-3 mb-12">
          {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-8 w-16 rounded-full" />)}
        </div>
      </div>
    }>
      <TagContent />
    </Suspense>
  );
}
