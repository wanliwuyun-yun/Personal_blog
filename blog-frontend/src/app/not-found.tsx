import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative px-4">
      <Meteors number={20} />
      <div className="text-center relative z-10">
        <div className="text-8xl font-bold text-gradient mb-4">404</div>
        <h2 className="text-2xl font-bold text-white mb-2">✨ 星辰迷航</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          这片星空尚未被绘制，你寻找的页面在宇宙中迷失了方向。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                     bg-star-blue/30 border border-star-light/20
                     text-star-light hover:bg-star-blue/50 hover:border-star-light/40
                     transition-all duration-300"
        >
          <span>←</span>
          <span>返回地球（首页）</span>
        </Link>
      </div>
    </div>
  );
}
