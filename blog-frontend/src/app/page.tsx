"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { TechStackMarquee, CategoryMarquee } from "@/components/TechMarquee";
import { articleApi } from "@/lib/api";
import type { Article } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await articleApi.getList({
          page,
          size: 9,
          categoryId,
        });
        if (res.code === 200) {
          setArticles(res.data.records);
          setTotalPages(res.data.totalPages);
        } else {
          setError(res.msg || "加载失败");
        }
      } catch (err) {
        setError("无法连接到服务器，请确保后端已启动");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page, categoryId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero 区域 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
          星辰大海 · 技术博客
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          在技术的星河中漫游，记录每一刻的灵感与成长
        </p>
      </motion.div>

      {/* 跑马灯区域 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <TechStackMarquee />
      </motion.div>

      {/* 分类跑马灯 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-star-light/60">📋 博客分类</span>
        </div>
        <CategoryMarquee />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 文章列表 */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-star-light">
              {categoryId ? "分类文章" : "最新文章"}
            </h2>
          </div>

          {error && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🚧</div>
              <p className="text-gray-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 rounded-lg bg-star-blue/30 border border-star-light/20
                         text-star-light hover:bg-star-blue/50 transition-all"
              >
                重试
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl border border-star-light/10 bg-star-blue/20 p-6">
                  <div className="skeleton h-4 w-32 mb-3" />
                  <div className="skeleton h-6 w-3/4 mb-3" />
                  <div className="skeleton h-4 w-full mb-2" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-400">暂无文章</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                  />
                ))}
              </div>

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 rounded-lg border border-star-light/20
                             text-sm text-gray-400 hover:text-white
                             disabled:opacity-30 disabled:cursor-not-allowed
                             transition-all"
                  >
                    上一页
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => Math.abs(p - page) <= 2)
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          p === page
                            ? "bg-star-blue/50 border border-star-light/40 text-star-light"
                            : "border border-star-light/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    className="px-4 py-2 rounded-lg border border-star-light/20
                             text-sm text-gray-400 hover:text-white
                             disabled:opacity-30 disabled:cursor-not-allowed
                             transition-all"
                  >
                    下一页
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 侧边栏 */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="skeleton h-12 w-96 mx-auto mb-4" />
          <div className="skeleton h-6 w-64 mx-auto" />
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
