"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { articleApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function AdminArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await articleApi.getList({ page, size: 15, status: statusFilter });
      if (res.code === 200) {
        setArticles(res.data.records);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch {
      setError("无法连接服务器");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, [page, statusFilter]);

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除？")) return;
    try {
      await articleApi.delete(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch { alert("删除失败"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-star-light">📝 文章管理</h1>
        <ShimmerButton onClick={() => router.push("/admin/article/edit")}>
          写文章
        </ShimmerButton>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { label: "全部", value: undefined },
          { label: "已发布", value: 1 },
          { label: "草稿", value: 0 },
        ].map((f) => (
          <button
            key={f.label}
            onClick={() => { setStatusFilter(f.value); setPage(1); }}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              statusFilter === f.value
                ? "bg-star-blue/40 text-star-light border border-star-light/20"
                : "bg-star-blue/10 text-gray-400 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <MagicCard className="p-5">
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-2">{error}</p>
            <button onClick={fetchArticles} className="text-star-light underline">重试</button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-14 w-full" />)}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>暂无文章</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-star-light/10 text-gray-500">
                    <th className="text-left py-2.5 px-3">标题</th>
                    <th className="text-left py-2.5 px-3 hidden md:table-cell">分类</th>
                    <th className="text-left py-2.5 px-3 hidden md:table-cell">阅读</th>
                    <th className="text-left py-2.5 px-3 hidden sm:table-cell">状态</th>
                    <th className="text-left py-2.5 px-3 hidden sm:table-cell">时间</th>
                    <th className="text-right py-2.5 px-3">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b border-star-light/5 hover:bg-star-blue/10 transition-colors">
                      <td className="py-2.5 px-3 max-w-[200px] truncate">
                        <span className="text-white">{article.title || "（无标题）"}</span>
                        {article.isTop && <span className="ml-1 text-xs text-purple-400">[置顶]</span>}
                      </td>
                      <td className="py-2.5 px-3 text-gray-400 hidden md:table-cell">
                        {article.categoryName || "—"}
                      </td>
                      <td className="py-2.5 px-3 text-gray-400 hidden md:table-cell">{article.viewCount}</td>
                      <td className="py-2.5 px-3 hidden sm:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          article.status === 1 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}>{article.status === 1 ? "已发布" : "草稿"}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-400 hidden sm:table-cell">
                        {formatDate(article.createTime)}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button onClick={() => router.push(`/admin/article/edit/${article.id}`)}
                          className="text-star-light hover:text-white mr-2 transition-colors">编辑</button>
                        <button onClick={() => handleDelete(article.id)}
                          className="text-red-400 hover:text-red-300 transition-colors">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-star-light/10">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-star-blue/20 text-gray-400 disabled:opacity-30 hover:text-white transition-all">上一页</button>
                <span className="text-sm text-gray-400 px-3">{page} / {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-star-blue/20 text-gray-400 disabled:opacity-30 hover:text-white transition-all">下一页</button>
              </div>
            )}
          </>
        )}
      </MagicCard>
    </div>
  );
}
