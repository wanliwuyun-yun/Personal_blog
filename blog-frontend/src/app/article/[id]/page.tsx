"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { articleApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await articleApi.getById(Number(params.id));
        if (res.code === 200) {
          setArticle(res.data);
        } else {
          setError("文章不存在");
        }
      } catch (err) {
        setError("无法连接到服务器，请确保后端已启动");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="skeleton h-8 w-3/4 mb-4" />
        <div className="skeleton h-4 w-48 mb-8" />
        <div className="skeleton h-4 w-full mb-2" />
        <div className="skeleton h-4 w-full mb-2" />
        <div className="skeleton h-4 w-2/3 mb-8" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔭</div>
        <h2 className="text-2xl font-bold text-star-light mb-2">文章未找到</h2>
        <p className="text-gray-400 mb-6">{error || "这篇文章可能已被删除"}</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-star-blue/30 border border-star-light/20
                   text-star-light hover:bg-star-blue/50 transition-all"
        >
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 返回按钮 */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-star-light transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>

        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span>📅 {formatDate(article.createTime)}</span>
            <span>👁️ {article.viewCount} 阅读</span>
          </div>
        </header>

        {/* 摘要 */}
        {article.summary && (
          <div className="mb-8 p-4 rounded-lg border border-star-light/10 bg-star-blue/20">
            <p className="text-gray-400 italic">{article.summary}</p>
          </div>
        )}

        {/* 文章内容 */}
        <div className="article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeSlug]}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* 底部信息 */}
        <div className="mt-12 pt-6 border-t border-star-light/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-star-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回文章列表
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
