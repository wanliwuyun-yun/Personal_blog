# StarBlog - 科技星空风格个人博客前端

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.4-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.4.5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.4-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Node.js-v20.14.0-339933?style=flat-square&logo=node.js" alt="Node.js" />
</p>

<p align="center">
  <b>一个充满科技感与星空浪漫的个人博客前端项目</b>
</p>

<p align="center">
  <a href="#项目简介">项目简介</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#功能特性">功能特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#部署">部署</a>
</p>

---

## 项目简介

StarBlog 是一个现代化的个人博客前端项目，采用深色星空主题设计，配合流畅的动画效果，为用户提供沉浸式的阅读体验。项目基于 Next.js 14 App Router 构建，支持服务端渲染（SSR）和静态生成（SSG），具有优秀的性能和 SEO 表现。

### 在线预览

> 🚧 部署链接即将上线...

### 截图展示

> 📸 项目截图即将添加...

---

## 技术栈

### 核心框架

| 技术 | 版本 | 说明 |
|------|------|------|
| [Next.js](https://nextjs.org/) | 14.2.4 | React 全栈框架，支持 App Router |
| [React](https://react.dev/) | 18.3.1 | 用户界面构建库 |
| [TypeScript](https://www.typescriptlang.org/) | 5.4.5 | 类型安全的 JavaScript 超集 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.4 | 原子化 CSS 框架 |

### UI 组件与动画

| 技术 | 说明 |
|------|------|
| [shadcn/ui](https://ui.shadcn.com/) | 高质量的 React 组件库 |
| [Radix UI](https://www.radix-ui.com/) | 无样式、可访问的 UI 组件原语 |
| [Framer Motion](https://www.framer.com/motion/) | React 动画库（通过 `motion` 包） |
| [tsParticles](https://particles.js.org/) | 粒子动画效果 |
| [Lucide React](https://lucide.dev/) | 优雅的图标库 |

### 内容处理

| 技术 | 说明 |
|------|------|
| [react-markdown](https://github.com/remarkjs/react-markdown) | Markdown 渲染 |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | GitHub Flavored Markdown 支持 |
| [rehype-highlight](https://github.com/rehypejs/rehype-highlight) | 代码高亮 |
| [rehype-slug](https://github.com/rehypejs/rehype-slug) | 标题锚点 |

### 工具库

| 技术 | 说明 |
|------|------|
| [Axios](https://axios-http.com/) | HTTP 客户端 |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 类名处理工具 |
| [next-themes](https://github.com/pacocoursey/next-themes) | 主题管理 |

---

## 项目结构

```
blog-frontend/
├── .next/                  # Next.js 构建输出
├── node_modules/           # 依赖包
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── about/          # 关于页面
│   │   ├── admin/          # 后台管理
│   │   │   ├── article/    # 文章编辑
│   │   │   ├── articles/   # 文章列表
│   │   │   ├── categories/ # 分类管理
│   │   │   └── tags/       # 标签管理
│   │   ├── article/[id]/   # 文章详情页
│   │   ├── category/       # 分类页面
│   │   ├── search/         # 搜索页面
│   │   ├── tag/            # 标签页面
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   ├── not-found.tsx   # 404 页面
│   │   └── page.tsx        # 首页
│   ├── components/         # 组件目录
│   │   ├── ui/             # UI 组件（shadcn/ui + MagicUI）
│   │   ├── ArticleCard.tsx # 文章卡片
│   │   ├── Navbar.tsx      # 导航栏
│   │   ├── Sidebar.tsx     # 侧边栏
│   │   ├── StarBackground.tsx  # 星空背景
│   │   ├── TechMarquee.tsx # 技术栈跑马灯
│   │   └── ...
│   ├── lib/                # 工具库
│   │   ├── api.ts          # API 封装
│   │   └── utils.ts        # 工具函数
│   └── types/              # TypeScript 类型定义
│       └── index.ts
├── .dockerignore           # Docker 忽略文件
├── .nvmrc                  # Node 版本管理
├── components.json         # shadcn/ui 配置
├── Dockerfile              # Docker 构建文件
├── next.config.js          # Next.js 配置
├── package.json            # 项目依赖
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.ts      # Tailwind CSS 配置
└── tsconfig.json           # TypeScript 配置
```

---

## 功能特性

### 前台功能

- ✅ **响应式设计** - 完美适配桌面端和移动端
- ✅ **深色主题** - 星空主题设计，支持主题切换
- ✅ **文章展示** - 支持 Markdown 渲染、代码高亮
- ✅ **分类管理** - 文章分类浏览
- ✅ **标签系统** - 标签云和标签筛选
- ✅ **搜索功能** - 全文搜索支持
- ✅ **动画效果** - 粒子背景、平滑过渡、悬停动效
- ✅ **SEO 优化** - 服务端渲染，友好的搜索引擎收录

### 后台管理

- ✅ **文章管理** - 创建、编辑、删除文章
- ✅ **分类管理** - 分类增删改查
- ✅ **标签管理** - 标签增删改查

### 技术亮点

- 🚀 **Next.js 14 App Router** - 现代化的路由和渲染模式
- 🎨 **Tailwind CSS** - 原子化 CSS，快速构建界面
- ✨ **Framer Motion** - 流畅的页面过渡和交互动画
- 🌟 **tsParticles** - 动态星空粒子背景
- 📝 **Markdown 支持** - 完整的 Markdown 渲染能力
- 🐳 **Docker 支持** - 一键容器化部署

---

## 快速开始

### 环境要求

- **Node.js**: v20.14.0（推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理）
- **npm**: 8.x 或更高版本

### 安装步骤

1. **克隆仓库**

```bash
git clone <your-repo-url>
cd blog-frontend
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

创建 `.env.local` 文件：

```env
# 后端 API 地址
BACKEND_URL=http://localhost:8081

# 可选：独立输出模式
OUTPUT_STANDALONE=1
```

4. **启动开发服务器**

```bash
npm run dev
```

访问 http://localhost:3000 查看项目。

### 构建生产版本

```bash
npm run build
npm start
```

---

## 部署

### Docker 部署

项目已配置 Docker 支持，使用多阶段构建优化镜像大小：

```bash
# 构建镜像
docker build -t blog-frontend .

# 运行容器
docker run -p 3000:3000 -e BACKEND_URL=http://your-backend:8081 blog-frontend
```

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 一键部署

### 静态导出

如需静态导出（无需 Node.js 服务器）：

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}
```

---

## 开发指南

### 添加新页面

在 `src/app` 目录下创建新的文件夹和 `page.tsx`：

```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return <div>新页面内容</div>;
}
```

### 添加 UI 组件

使用 shadcn/ui CLI 添加组件：

```bash
npx shadcn add button
```

### API 调用

使用封装好的 API 模块：

```typescript
import { articleApi } from '@/lib/api';

// 获取文章列表
const res = await articleApi.getList({ page: 1, size: 10 });
```

---

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 许可证

[MIT](LICENSE) © 2024 StarBlog

---

## 致谢

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MagicUI](https://magicui.design/)

---

<p align="center">
  用 ❤️ 和 ☕ 构建
</p>