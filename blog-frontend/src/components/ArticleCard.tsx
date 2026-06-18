"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn, formatDate, getTagColor } from "@/lib/utils";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const tagList = article.tags
    ? article.tags.split(",").filter(Boolean).map((id) => ({
        id: parseInt(id),
        name: `Tag ${id}`,
        color: getTagColor(parseInt(id)),
      }))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group"
    >
      <Link href={`/article/${article.id}`}>
        <article
          className={cn(
            "relative rounded-xl p-6 cursor-pointer",
            "border border-star-light/10 bg-star-blue/20 backdrop-blur-sm",
            "hover:shadow-glow hover:border-star-light/40",
            "transition-all duration-300 overflow-hidden"
          )}
        >
          {article.isTop && (
            <div className="absolute top-3 right-3 px-2 py-0.5 text-xs rounded-full
                          bg-gradient-to-r from-purple-500/40 to-blue-500/40
                          border border-purple-400/30 text-star-light">
              置顶
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-star-light/50 mb-3">
            <span>{formatDate(article.createTime)}</span>
            <span>·</span>
            <span>{article.viewCount} 阅读</span>
          </div>

          <h2 className="text-xl font-bold mb-2 text-white group-hover:text-star-light
                        transition-colors duration-300">
            {article.title}
          </h2>

          <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span
                key={tag.id}
                className="px-2.5 py-0.5 text-xs rounded-full"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                  border: `1px solid ${tag.color}40`,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* 悬浮发光效果 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 pointer-events-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-star-light/5 to-transparent
                          blur-xl" />
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
