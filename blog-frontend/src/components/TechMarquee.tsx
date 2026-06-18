"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import type { MarqueeItem } from "@/types";

const techStack: MarqueeItem[] = [
  { name: "SpringBoot", desc: "后端框架" },
  { name: "React", desc: "前端框架" },
  { name: "Next.js", desc: "全栈框架" },
  { name: "TailwindCSS", desc: "样式框架" },
  { name: "MySQL", desc: "数据库" },
  { name: "TypeScript", desc: "编程语言" },
  { name: "Framer Motion", desc: "动效库" },
  { name: "Java", desc: "编程语言" },
];

const articles: MarqueeItem[] = [
  { name: "技术分享", desc: "编程技术、框架使用" },
  { name: "生活随笔", desc: "日常感悟、旅行记录" },
  { name: "学习笔记", desc: "学习总结与心得" },
  { name: "项目实战", desc: "开发经验分享" },
];

const TechCard = ({ name, desc }: { name: string; desc: string }) => {
  return (
    <figure
      className={cn(
        "relative w-44 h-24 cursor-pointer overflow-hidden rounded-xl",
        "border border-star-light/20 p-4 mx-2",
        "bg-star-blue/30 backdrop-blur-xs",
        "hover:shadow-glow hover:border-star-light/60",
        "transition-all duration-300",
        "dark:text-white text-gray-100"
      )}
    >
      <div className="relative z-10">
        <h3 className="text-base font-bold tracking-tight">{name}</h3>
        <p className="mt-1 text-xs text-star-light/70">{desc}</p>
      </div>
    </figure>
  );
};

export function TechStackMarquee() {
  const firstRow = techStack.slice(0, 4);
  const secondRow = techStack.slice(4);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s] mt-4">
        {secondRow.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-star-dark to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-star-dark to-transparent pointer-events-none z-10" />
    </div>
  );
}

export function CategoryMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-2">
      <Marquee pauseOnHover className="[--duration:20s]">
        {articles.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-star-dark to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-star-dark to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default TechStackMarquee;
