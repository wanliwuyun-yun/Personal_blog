"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { articleApi, commentApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Article, BlogComment } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentForm, setCommentForm] = useState({ nickname: "", email: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    articleApi.getById(Number(params.id))
      .then(res => {
        if (res.code === 200) setArticle(res.data);
        else setError("文章不存在");
      })
      .catch(() => setError("无法连接服务器"))
      .finally(() => setLoading(false));

    commentApi.getByArticle(Number(params.id))
      .then(res => { if (res.code === 200) setComments(res.data); })
      .catch(() => {});
  }, [params.id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.nickname.trim() || !commentForm.content.trim()) {
      return alert("请填写昵称和评论内容");
    }
    setSubmitting(true);
    try {
      const res = await commentApi.add({
        articleId: Number(params.id),
        nickname: commentForm.nickname,
        email: commentForm.email,
        content: commentForm.content,
      });
      if (res.code === 200) {
        alert("评论提交成功，等待审核");
        setCommentForm({ nickname: "", email: "", content: "" });
      }
    } catch {
      alert("提交失败");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-6 w-full mb-3" />)}
    </div>
  );

  if (error || !article) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🔭</div>
      <h2 className="text-2xl font-bold text-star-light mb-2">文章未找到</h2>
      <p className="text-gray-400 mb-6">{error || "这篇文章可能已被删除"}</p>
      <Link href="/" className="px-6 py-3 rounded-lg bg-star-blue/30 border border-star-light/20 text-star-light hover:bg-star-blue/50 transition-all">返回首页</Link>
    </div>
  );

  return (
    <>
      <ScrollProgress className="bg-gradient-to-r from-[#4ECDC4] via-[#45B7D1] to-[#A97CF8]" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Back */}
          <button onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-star-light transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-star-light/10">
              <img src={article.coverImage} alt={article.title} className="w-full h-64 md:h-80 object-cover" />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>👤 KevinYao</span>
              <span>📅 {formatDate(article.createTime)}</span>
              <span>👁️ {article.viewCount} 阅读</span>
              {article.categoryName && <span>📂 {article.categoryName}</span>}
            </div>
          </header>

          {/* Summary */}
          {article.summary && (
            <div className="mb-8 p-4 rounded-xl border border-star-light/10 bg-star-blue/20">
              <p className="text-gray-400 italic">{article.summary}</p>
            </div>
          )}

          {/* Content */}
          <div className="article-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Author Bio */}
          <MagicCard className="p-6 mt-12 relative">
            <BorderBeam duration={10} size={40} />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] flex items-center justify-center text-2xl font-bold text-white">
                K
              </div>
              <div>
                <h3 className="text-white font-bold">KevinYao</h3>
                <p className="text-sm text-gray-400 mt-0.5">个人博客作者 · 技术爱好者 · 专注于 Web 开发与云计算</p>
              </div>
            </div>
          </MagicCard>

          {/* Navigation */}
          <div className="mt-6 pt-6 border-t border-star-light/10">
            <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-star-light transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回文章列表
            </Link>
          </div>
        </motion.article>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-star-light mb-6">💬 评论</h2>

          {/* Comment Form */}
          <MagicCard className="p-5 mb-6 relative">
            <BorderBeam duration={12} size={50} />
            <form onSubmit={handleComment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" value={commentForm.nickname}
                  onChange={e => setCommentForm({...commentForm, nickname: e.target.value})}
                  placeholder="昵称 *" required
                  className="px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors" />
                <input type="email" value={commentForm.email}
                  onChange={e => setCommentForm({...commentForm, email: e.target.value})}
                  placeholder="邮箱（可选）"
                  className="px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors" />
              </div>
              <textarea value={commentForm.content}
                onChange={e => setCommentForm({...commentForm, content: e.target.value})}
                placeholder="写下你的评论..." rows={4} required
                className="w-full px-4 py-2.5 rounded-lg bg-star-blue/20 border border-star-light/20 text-white placeholder-gray-500 focus:outline-none focus:border-star-light/50 transition-colors resize-none" />
              <button type="submit" disabled={submitting}
                className="px-6 py-2.5 rounded-lg bg-star-light/20 border border-star-light/30 text-star-light hover:bg-star-light/30 disabled:opacity-50 transition-all text-sm font-medium">
                {submitting ? "提交中..." : "提交评论"}
              </button>
            </form>
          </MagicCard>

          {/* Comment List */}
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">暂无评论，来写第一条吧 ✨</p>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 rounded-xl bg-star-blue/20 border border-star-light/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-star-blue/40 flex items-center justify-center text-sm text-star-light font-bold">
                      {comment.nickname[0]}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{comment.nickname}</p>
                      <p className="text-xs text-gray-500">{comment.createTime?.slice(0, 10)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
