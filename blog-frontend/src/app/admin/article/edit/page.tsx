"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { articleApi, categoryApi, uploadApi } from "@/lib/api";
import type { Article, Category } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import TagSelector from "@/components/TagSelector";

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    categoryId: 0,
    tags: "",
    coverImage: "",
    isTop: false,
    status: 1,
  });

  useEffect(() => {
    categoryApi.getAll().then((res) => {
      if (res.code === 200) setCategories(res.data);
    }).catch(() => {});
  }, []);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadApi.image(file);
      if (res.code === 200) {
        setForm({ ...form, coverImage: res.data });
        setCoverPreview(res.data);
      }
    } catch {
      alert("上传失败");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (status: number) => {
    if (!form.title.trim()) return alert("请输入文章标题");
    setSaving(true);
    try {
      const payload = { ...form, status };
      await articleApi.add(payload);
      router.push("/admin");
    } catch {
      alert("保存失败，检查后端是否运行");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-star-light mb-6">✍️ 写文章</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(1); }} className="space-y-6">
        {/* Cover Image */}
        <MagicCard className="p-5 relative">
          <BorderBeam duration={10} size={40} />
          <h2 className="text-sm text-gray-400 mb-3">封面图片</h2>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
          {coverPreview ? (
            <div className="relative group">
              <img src={coverPreview} alt="cover" className="w-full h-40 object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity rounded-xl">
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-sm bg-white/20 rounded-lg text-white hover:bg-white/30">更换</button>
                <button type="button" onClick={() => { setCoverPreview(""); setForm({...form, coverImage: ""}); }}
                  className="px-3 py-1.5 text-sm bg-red-500/30 rounded-lg text-red-300 hover:bg-red-500/50">移除</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-xl border-2 border-dashed border-star-light/20 flex flex-col items-center justify-center text-gray-500 hover:border-star-light/40 hover:text-gray-300 transition-all">
              {uploading ? (
                <span className="animate-pulse">上传中...</span>
              ) : (
                <>
                  <span className="text-2xl mb-1">🖼️</span>
                  <span className="text-sm">点击上传封面图片</span>
                </>
              )}
            </button>
          )}
        </MagicCard>

        {/* Title & Category */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">文章标题</label>
            <input type="text" value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              placeholder="请输入文章标题"
              className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">分类</label>
            <select value={form.categoryId}
              onChange={(e) => setForm({...form, categoryId: Number(e.target.value)})}
              className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white focus:outline-none focus:border-star-light/50 transition-colors">
              <option value={0}>选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">标签</label>
          <TagSelector value={form.tags} onChange={(tags) => setForm({...form, tags})} />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">摘要</label>
          <textarea value={form.summary}
            onChange={(e) => setForm({...form, summary: e.target.value})}
            placeholder="文章摘要（可选）"
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors resize-none" />
        </div>

        {/* Content */}
        <MagicCard className="p-5 relative">
          <BorderBeam duration={12} size={60} />
          <label className="block text-sm text-gray-400 mb-2">内容 (Markdown)</label>
          <textarea value={form.content}
            onChange={(e) => setForm({...form, content: e.target.value})}
            placeholder="使用 Markdown 语法编写文章..."
            rows={22}
            className="w-full px-4 py-3 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors resize-none font-mono text-sm leading-relaxed" />
        </MagicCard>

        {/* Options & Submit */}
        <div className="flex items-center flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" checked={form.isTop}
              onChange={(e) => setForm({...form, isTop: e.target.checked})}
              className="rounded border-star-light/30 bg-star-blue/20" />
            置顶
          </label>
          <div className="flex-1" />
          <button type="button" onClick={() => handleSubmit(0)} disabled={saving}
            className="px-5 py-2.5 rounded-lg border border-star-light/20 text-gray-400 hover:text-white disabled:opacity-50 transition-all text-sm">
            保存草稿
          </button>
          <ShimmerButton type="submit" disabled={saving}>
            {saving ? "发布中..." : "发布文章"}
          </ShimmerButton>
        </div>
      </form>
    </div>
  );
}
