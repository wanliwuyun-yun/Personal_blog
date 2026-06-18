"use client";

import { motion } from "motion/react";
import { CategoryMarquee } from "@/components/TechMarquee";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Java / SpringBoot", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "MySQL / 数据库", level: 85 },
  { name: "Docker / DevOps", level: 70 },
  { name: "Python", level: 65 },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-4xl font-bold text-gradient mb-3">关于我</h1>
        <p className="text-gray-400">一名热爱技术与星空的开发者</p>
      </motion.div>

      {/* 个人简介 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={cn(
          "rounded-xl p-8 mb-8",
          "border border-star-light/10 bg-star-blue/20 backdrop-blur-sm"
        )}
      >
        <h2 className="text-2xl font-bold text-star-light mb-4">👋 你好！</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed">
          <p>
            我是一名全栈开发者，热衷于使用 Java 和 React 构建优雅的应用。
            这个博客是我记录技术成长、分享知识的地方。
          </p>
          <p>
            我相信技术不仅是工具，更是连接人与世界的桥梁。
            在代码之外，我热爱星空、摄影和探索未知的事物。
          </p>
          <p>
            这个博客使用 SpringBoot + Next.js 构建，采用了星空科技风的设计，
            希望能给你带来不一样的浏览体验。
          </p>
        </div>
      </motion.div>

      {/* 技能 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={cn(
          "rounded-xl p-8 mb-8",
          "border border-star-light/10 bg-star-blue/20 backdrop-blur-sm"
        )}
      >
        <h2 className="text-2xl font-bold text-star-light mb-6">💻 技能</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-star-light/60">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-star-blue/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-star-blue to-star-light"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 联系方式 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={cn(
          "rounded-xl p-8 mb-8",
          "border border-star-light/10 bg-star-blue/20 backdrop-blur-sm"
        )}
      >
        <h2 className="text-2xl font-bold text-star-light mb-4">📬 联系方式</h2>
        <div className="space-y-3 text-gray-400">
          <div className="flex items-center gap-3">
            <span>📧</span>
            <span>email@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <span>🐱</span>
            <span>github.com/your-username</span>
          </div>
          <div className="flex items-center gap-3">
            <span>💬</span>
            <span>@your_twitter</span>
          </div>
        </div>
      </motion.div>

      {/* 底部跑马灯 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <CategoryMarquee />
      </motion.div>
    </div>
  );
}
