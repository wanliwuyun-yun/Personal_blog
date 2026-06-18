"use client";

import { useEffect, useState } from "react";
import { categoryApi } from "@/lib/api";
import type { Category } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await categoryApi.getAll();
      if (res.code === 200) setCategories(res.data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("请输入分类名称");
    try {
      if (editing) {
        await categoryApi.update({ id: editing.id, name: form.name, description: form.description, createTime: editing.createTime });
      } else {
        await categoryApi.add({ name: form.name, description: form.description, createTime: "" });
      }
      setForm({ name: "", description: "" });
      setEditing(null);
      fetchData();
    } catch { alert("操作失败"); }
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此分类？")) return;
    try { await categoryApi.delete(id); fetchData(); } catch { alert("删除失败"); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-star-light">📂 分类管理</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <MagicCard className="p-5 relative">
          <BorderBeam duration={10} size={40} />
          <h2 className="text-lg font-bold text-white mb-4">{editing ? "编辑分类" : "新建分类"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">名称</label>
              <input type="text" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="分类名称"
                className="w-full px-3 py-2 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">描述</label>
              <input type="text" value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                placeholder="分类描述（可选）"
                className="w-full px-3 py-2 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors" />
            </div>
            <div className="flex gap-2">
              <ShimmerButton onClick={handleSubmit}>
                {editing ? "更新" : "创建"}
              </ShimmerButton>
              {editing && (
                <button onClick={() => { setEditing(null); setForm({ name: "", description: "" }); }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  取消
                </button>
              )}
            </div>
          </div>
        </MagicCard>

        {/* List */}
        <MagicCard className="p-5">
          <h2 className="text-lg font-bold text-white mb-4">所有分类</h2>
          {loading ? (
            <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="skeleton h-12 w-full" />)}</div>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暂无分类</p>
          ) : (
            <div className="space-y-2">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg bg-star-blue/10 border border-star-light/5 hover:bg-star-blue/20 transition-colors">
                  <div>
                    <p className="text-white text-sm font-medium">{cat.name}</p>
                    {cat.description && <p className="text-gray-500 text-xs">{cat.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(cat)}
                      className="text-xs text-star-light hover:text-white transition-colors">编辑</button>
                    <button onClick={() => handleDelete(cat.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors">删除</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </MagicCard>
      </div>
    </div>
  );
}
