"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { articleApi, categoryApi, tagApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Article, Category, Tag } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Meteors } from "@/components/ui/meteors";

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [artRes, catRes, tagRes] = await Promise.all([
        articleApi.getList({ page, size: 10, status: 0 }),
        categoryApi.getAll(),
        tagApi.getAll(),
      ]);
      if (artRes.code === 200) {
        setArticles(artRes.data.records);
        setTotalPages(artRes.data.totalPages || 1);
      }
      if (catRes.code === 200) setCategories(catRes.data);
      if (tagRes.code === 200) setTags(tagRes.data);
    } catch {
      setError("无法连接服务器，确认后端已启动");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [page]);

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除？")) return;
    try {
      await articleApi.delete(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch { alert("删除失败"); }
  };

  if (error) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">⚠️</div>
      <p className="text-gray-400 mb-4">{error}</p>
      <ShimmerButton onClick={fetchData}>重试</ShimmerButton>
    </div>
  );

  const publishedCount = articles.filter(a => a.status === 1).length;
  const draftCount = articles.filter(a => a.status === 0).length;

  return (
    <div className="space-y-6 relative">
      <Meteors number={15} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-star-light">仪表盘</h1>
          <p className="text-sm text-gray-400 mt-1">管理你的博客内容</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MagicCard className="p-5">
          <p className="text-sm text-gray-400">文章总数</p>
          <p className="text-3xl font-bold text-white mt-1">
            <NumberTicker value={articles.length} />
          </p>
        </MagicCard>
        <MagicCard className="p-5">
          <p className="text-sm text-gray-400">已发布</p>
          <p className="text-3xl font-bold text-green-400 mt-1">
            <NumberTicker value={publishedCount} />
          </p>
        </MagicCard>
        <MagicCard className="p-5">
          <p className="text-sm text-gray-400">草稿</p>
          <p className="text-3xl font-bold text-yellow-400 mt-1">
            <NumberTicker value={draftCount} />
          </p>
        </MagicCard>
        <MagicCard className="p-5">
          <p className="text-sm text-gray-400">分类</p>
          <p className="text-3xl font-bold text-star-light mt-1">
            <NumberTicker value={categories.length} />
          </p>
        </MagicCard>
      </div>

      {/* Article List */}
      <MagicCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">最近文章</h2>
          <ShimmerButton
            onClick={() => router.push("/admin/article/edit")}
          >
            写文章
          </ShimmerButton>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-12 w-full" />)}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>还没有文章</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-star-light/10 text-gray-500">
                    <th className="text-left py-2.5 px-3">标题</th>
                    <th className="text-left py-2.5 px-3 hidden md:table-cell">分类</th>
                    <th className="text-left py-2.5 px-3 hidden sm:table-cell">状态</th>
                    <th className="text-left py-2.5 px-3 hidden sm:table-cell">时间</th>
                    <th className="text-right py-2.5 px-3">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b border-star-light/5 hover:bg-star-blue/10 transition-colors">
                      <td className="py-2.5 px-3">
                        <span className="text-white">{article.title || "（无标题）"}</span>
                        {article.isTop && <span className="ml-2 text-xs text-purple-400">[置顶]</span>}
                      </td>
                      <td className="py-2.5 px-3 text-gray-400 hidden md:table-cell">
                        {article.categoryName || `Category ${article.categoryId}`}
                      </td>
                      <td className="py-2.5 px-3 hidden sm:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          article.status === 1
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {article.status === 1 ? "已发布" : "草稿"}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-400 hidden sm:table-cell">
                        {formatDate(article.createTime)}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button onClick={() => router.push(`/admin/article/edit/${article.id}`)}
                          className="text-star-light hover:text-white mr-3 transition-colors">编辑</button>
                        <button onClick={() => handleDelete(article.id)}
                          className="text-red-400 hover:text-red-300 transition-colors">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-star-light/10">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-star-blue/20 text-gray-400 disabled:opacity-30 hover:text-white transition-all"
                >
                  上一页
                </button>
                <span className="text-sm text-gray-400 px-3">{page} / {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-star-blue/20 text-gray-400 disabled:opacity-30 hover:text-white transition-all"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </MagicCard>
    </div>
  );
}
