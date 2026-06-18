"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { articleApi } from "@/lib/api";
import type { Article } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { TextAnimate } from "@/components/ui/text-animate";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) return;
    setLoading(true);
    articleApi.search(q.trim())
      .then(res => { if (res.code === 200) setArticles(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <TextAnimate className="text-2xl font-bold text-star-light mb-2" as="h1">{`搜索: ${q}`}</TextAnimate>
      <p className="text-gray-500 text-sm mb-8">找到 {articles.length} 篇文章</p>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="skeleton h-24 w-full" />)}</div>
      ) : articles.length === 0 ? (
        <MagicCard className="p-8 text-center relative">
          <BorderBeam duration={10} size={60} />
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400">没有找到匹配的文章</p>
          <button onClick={() => router.push("/")}
            className="mt-4 text-sm text-star-light hover:underline">
            返回首页
          </button>
        </MagicCard>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <div key={article.id} onClick={() => router.push(`/article/${article.id}`)}
              className="cursor-pointer hover:scale-[1.01] transition-all">
              <MagicCard className="p-5 relative">
                <BorderBeam duration={8} size={30} />
                <h3 className="text-lg font-bold text-white mb-1">{article.title}</h3>
                {article.summary && <p className="text-sm text-gray-400 line-clamp-2">{article.summary}</p>}
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span>{article.categoryName || "未分类"}</span>
                  <span>{article.viewCount} 阅读</span>
                  <span>{article.createTime?.slice(0, 10)}</span>
                </div>
              </MagicCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">加载中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
