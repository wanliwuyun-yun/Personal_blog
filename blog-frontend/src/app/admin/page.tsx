"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { articleApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await articleApi.getList({ page: 1, size: 100 });
      if (res.code === 200) {
        setArticles(res.data.records);
      } else {
        setError("加载失败");
      }
    } catch (err) {
      setError("无法连接到服务器，请确保后端已启动");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这篇文章吗？")) return;
    try {
      await articleApi.delete(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch {
      alert("删除失败");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-star-light">📝 文章管理</h1>
        <button
          onClick={() => router.push("/admin/article/edit")}
          className="px-4 py-2 rounded-lg bg-star-blue/40 border border-star-light/20
                   text-star-light hover:bg-star-blue/60 transition-all text-sm"
        >
          ✍️ 写文章
        </button>
      </div>

      {error && (
        <div className="text-center py-12 text-gray-400">
          <p>{error}</p>
          <button
            onClick={fetchArticles}
            className="mt-4 px-4 py-2 rounded-lg bg-star-blue/30 border border-star-light/20
                     text-star-light hover:bg-star-blue/50 transition-all"
          >
            重试
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton h-16 w-full" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">📭</div>
          <p>还没有文章，开始写第一篇吧！</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-star-light/10 text-gray-400">
                <th className="text-left py-3 px-4">标题</th>
                <th className="text-left py-3 px-4 hidden md:table-cell">分类</th>
                <th className="text-left py-3 px-4 hidden md:table-cell">阅读</th>
                <th className="text-left py-3 px-4 hidden sm:table-cell">时间</th>
                <th className="text-right py-3 px-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-star-light/5 hover:bg-star-blue/20 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="text-white">{article.title}</span>
                    {article.isTop && (
                      <span className="ml-2 text-xs text-purple-400">[置顶]</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-400 hidden md:table-cell">
                    Category {article.categoryId}
                  </td>
                  <td className="py-3 px-4 text-gray-400 hidden md:table-cell">
                    {article.viewCount}
                  </td>
                  <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">
                    {formatDate(article.createTime)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => router.push(`/admin/article/edit/${article.id}`)}
                      className="text-star-light hover:text-white mr-3 transition-colors"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
