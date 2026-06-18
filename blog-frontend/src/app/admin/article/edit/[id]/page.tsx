"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { articleApi, categoryApi, uploadApi } from "@/lib/api";
import type { Category } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import TagSelector from "@/components/TagSelector";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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
    if (!params.id) return;
    Promise.all([
      categoryApi.getAll(),
      articleApi.getById(Number(params.id)),
    ]).then(([catRes, artRes]) => {
      if (catRes.code === 200) setCategories(catRes.data);
      if (artRes.code === 200) {
        const a = artRes.data;
        setForm({
          title: a.title || "",
          summary: a.summary || "",
          content: a.content || "",
          categoryId: a.categoryId || 0,
          tags: a.tags || "",
          coverImage: a.coverImage || "",
          isTop: a.isTop || false,
          status: a.status ?? 1,
        });
      }
    }).catch(() => alert("加载失败")).finally(() => setLoading(false));
  }, [params.id]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadApi.image(file);
      if (res.code === 200) setForm({...form, coverImage: res.data});
    } catch { alert("上传失败"); }
    finally { setUploading(false); }
  };

  const handleSubmit = async (status: number) => {
    if (!form.title.trim()) return alert("请输入标题");
    setSaving(true);
    try {
      await articleApi.update({ id: Number(params.id), ...form, status });
      router.push("/admin");
    } catch { alert("保存失败"); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto space-y-4">
      {[1,2,3].map(i => <div key={i} className="skeleton h-16 w-full" />)}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-star-light mb-6">✏️ 编辑文章</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(form.status); }} className="space-y-6">
        {/* Cover Image */}
        <MagicCard className="p-5 relative">
          <BorderBeam duration={10} size={40} />
          <h2 className="text-sm text-gray-400 mb-3">封面图片</h2>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
          {form.coverImage ? (
            <div className="relative group">
              <img src={form.coverImage} alt="cover" className="w-full h-40 object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity rounded-xl">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 text-sm bg-white/20 rounded-lg text-white hover:bg-white/30">更换</button>
                <button type="button" onClick={() => setForm({...form, coverImage: ""})} className="px-3 py-1.5 text-sm bg-red-500/30 rounded-lg text-red-300">移除</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-xl border-2 border-dashed border-star-light/20 flex flex-col items-center justify-center text-gray-500 hover:border-star-light/40 hover:text-gray-300 transition-all">
              {uploading ? <span className="animate-pulse">上传中...</span> : <><span className="text-2xl mb-1">🖼️</span><span className="text-sm">点击上传封面图片</span></>}
            </button>
          )}
        </MagicCard>

        {/* Title & Category */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">文章标题</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white focus:outline-none focus:border-star-light/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">分类</label>
            <select value={form.categoryId} onChange={e => setForm({...form, categoryId: Number(e.target.value)})}
              className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white focus:outline-none">
              <option value={0}>选择分类</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">标签</label>
          <TagSelector value={form.tags} onChange={tags => setForm({...form, tags})} />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">摘要</label>
          <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white resize-none focus:outline-none focus:border-star-light/50 transition-colors" />
        </div>

        {/* Content */}
        <MagicCard className="p-5 relative">
          <BorderBeam duration={12} size={60} />
          <label className="block text-sm text-gray-400 mb-2">内容 (Markdown)</label>
          <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={22}
            className="w-full px-4 py-3 rounded-lg bg-star-blue/20 border border-star-light/20 text-white resize-none font-mono text-sm leading-relaxed focus:outline-none focus:border-star-light/50 transition-colors" />
        </MagicCard>

        {/* Options */}
        <div className="flex items-center flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" checked={form.isTop} onChange={e => setForm({...form, isTop: e.target.checked})}
              className="rounded border-star-light/30 bg-star-blue/20" /> 置顶
          </label>
          <select value={form.status} onChange={e => setForm({...form, status: Number(e.target.value)})}
            className="px-3 py-1.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-sm text-gray-400">
            <option value={1}>已发布</option>
            <option value={0}>草稿</option>
          </select>
          <div className="flex-1" />
          <button type="button" onClick={() => handleSubmit(0)} disabled={saving}
            className="px-5 py-2.5 rounded-lg border border-star-light/20 text-gray-400 hover:text-white disabled:opacity-50 transition-all text-sm">
            另存为草稿
          </button>
          <ShimmerButton type="submit" disabled={saving}>
            {saving ? "保存中..." : "保存修改"}
          </ShimmerButton>
        </div>
      </form>
    </div>
  );
}
