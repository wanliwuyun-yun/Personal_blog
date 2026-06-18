"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { articleApi, categoryApi, tagApi } from "@/lib/api";
import type { Category, Tag } from "@/types";

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    categoryId: 0,
    tags: "",
    isTop: false,
  });

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          categoryApi.getAll(),
          tagApi.getAll(),
        ]);
        if (catRes.code === 200) setCategories(catRes.data);
        if (tagRes.code === 200) setTags(tagRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMeta();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("请输入文章标题");
      return;
    }
    setSaving(true);
    try {
      await articleApi.add(form);
      router.push("/admin");
    } catch {
      alert("保存失败，请检查后端是否运行");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-star-light mb-6">✍️ 写文章</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 标题 */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">文章标题</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="请输入文章标题"
            className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20
                     text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50
                     transition-colors"
          />
        </div>

        {/* 分类和置顶 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">分类</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20
                       text-white focus:outline-none focus:border-star-light/50 transition-colors"
            >
              <option value={0}>选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isTop}
                onChange={(e) => setForm({ ...form, isTop: e.target.checked })}
                className="rounded border-star-light/30 bg-star-blue/20"
              />
              置顶
            </label>
          </div>
        </div>

        {/* 摘要 */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">摘要</label>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            placeholder="文章摘要（可选）"
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20
                     text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50
                     transition-colors resize-none"
          />
        </div>

        {/* Markdown 编辑器 */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            内容 (Markdown)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="使用 Markdown 语法编写文章..."
            rows={18}
            className="w-full px-4 py-3 rounded-lg bg-star-blue/20 border border-star-light/20
                     text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50
                     transition-colors resize-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-star-light/20 border border-star-light/30
                     text-star-light hover:bg-star-light/30 disabled:opacity-50
                     transition-all text-sm font-medium"
          >
            {saving ? "发布中..." : "发布文章"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-star-light/10 text-gray-400
                     hover:text-white transition-all text-sm"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
