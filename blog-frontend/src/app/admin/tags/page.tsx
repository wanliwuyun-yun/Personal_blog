"use client";

import { useEffect, useState } from "react";
import { tagApi } from "@/lib/api";
import type { Tag } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const TAG_COLORS = ["#4ECDC4","#FF6B6B","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8","#F7DC6F","#BB8FCE","#85C1E9"];

export default function AdminTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [form, setForm] = useState({ name: "", color: TAG_COLORS[0] });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await tagApi.getAll();
      if (res.code === 200) setTags(res.data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("请输入标签名称");
    try {
      if (editing) {
        await tagApi.update({ id: editing.id, name: form.name, color: form.color, createTime: editing.createTime });
      } else {
        await tagApi.add({ name: form.name, color: form.color, createTime: "" });
      }
      setForm({ name: "", color: TAG_COLORS[0] });
      setEditing(null);
      fetchData();
    } catch { alert("操作失败"); }
  };

  const handleEdit = (tag: Tag) => {
    setEditing(tag);
    setForm({ name: tag.name, color: tag.color });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此标签？")) return;
    try { await tagApi.delete(id); fetchData(); } catch { alert("删除失败"); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-star-light">🏷️ 标签管理</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <MagicCard className="p-5 relative">
          <BorderBeam duration={10} size={40} />
          <h2 className="text-lg font-bold text-white mb-4">{editing ? "编辑标签" : "新建标签"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">名称</label>
              <input type="text" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="标签名称"
                className="w-full px-3 py-2 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">颜色</label>
              <div className="flex flex-wrap gap-2">
                {TAG_COLORS.map(color => (
                  <button key={color}
                    onClick={() => setForm({...form, color})}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      form.color === color ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <ShimmerButton onClick={handleSubmit}>
                {editing ? "更新" : "创建"}
              </ShimmerButton>
              {editing && (
                <button onClick={() => { setEditing(null); setForm({ name: "", color: TAG_COLORS[0] }); }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  取消
                </button>
              )}
            </div>
          </div>
        </MagicCard>

        {/* List */}
        <MagicCard className="p-5">
          <h2 className="text-lg font-bold text-white mb-4">所有标签</h2>
          {loading ? (
            <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="skeleton h-12 w-full" />)}</div>
          ) : tags.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暂无标签</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <div key={tag.id} className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: tag.color + "30", border: `1px solid ${tag.color}60` }}>
                  <span style={{ color: tag.color }}>{tag.name}</span>
                  <button onClick={() => handleEdit(tag)}
                    className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-white transition-all">✎</button>
                  <button onClick={() => handleDelete(tag.id)}
                    className="opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-300 transition-all">×</button>
                </div>
              ))}
            </div>
          )}
        </MagicCard>
      </div>
    </div>
  );
}
