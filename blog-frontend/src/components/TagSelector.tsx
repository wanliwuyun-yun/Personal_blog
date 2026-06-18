"use client";

import { useEffect, useState } from "react";
import { tagApi } from "@/lib/api";
import type { Tag } from "@/types";

interface TagSelectorProps {
  value: string;
  onChange: (tags: string) => void;
}

export default function TagSelector({ value, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const selectedIds = value ? value.split(",").map(Number).filter(Boolean) : [];

  useEffect(() => {
    tagApi.getAll().then((res) => {
      if (res.code === 200) setTags(res.data);
    }).catch(() => {});
  }, []);

  const toggleTag = (tagId: number) => {
    const newSelected = selectedIds.includes(tagId)
      ? selectedIds.filter((id) => id !== tagId)
      : [...selectedIds, tagId];
    onChange(newSelected.join(","));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedIds.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            className="group relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: isSelected ? tag.color + "40" : tag.color + "15",
              border: isSelected
                ? `1.5px solid ${tag.color}`
                : `1px solid ${tag.color}30`,
              color: isSelected ? tag.color : tag.color + "aa",
            }}
          >
            {tag.name}
            {isSelected && (
              <span className="ml-1 text-xs opacity-60">✓</span>
            )}
          </button>
        );
      })}
      {tags.length === 0 && (
        <p className="text-sm text-gray-500">暂无可用标签，请在标签管理页面创建</p>
      )}
    </div>
  );
}
