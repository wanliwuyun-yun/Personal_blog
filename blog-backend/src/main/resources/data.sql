-- 初始化分类
INSERT INTO category (id, name, description, create_time, deleted) VALUES
(1, '技术分享', '编程技术、框架使用、开发经验分享', '2024-01-01 00:00:00', 0),
(2, '生活随笔', '日常生活感悟、旅行记录', '2024-01-01 00:00:00', 0),
(3, '学习笔记', '学习过程中的笔记和总结', '2024-01-01 00:00:00', 0),
(4, '项目实战', '实际项目开发经验总结', '2024-01-01 00:00:00', 0);

-- 初始化标签
INSERT INTO tag (id, name, color, create_time, deleted) VALUES
(1, 'Java', '#FF6B6B', '2024-01-01 00:00:00', 0),
(2, 'SpringBoot', '#4ECDC4', '2024-01-01 00:00:00', 0),
(3, 'React', '#61DAFB', '2024-01-01 00:00:00', 0),
(4, '前端', '#FFD93D', '2024-01-01 00:00:00', 0),
(5, '数据库', '#6C5CE7', '2024-01-01 00:00:00', 0),
(6, '服务器', '#A8E6CF', '2024-01-01 00:00:00', 0),
(7, '生活', '#FF85A2', '2024-01-01 00:00:00', 0),
(8, '学习', '#45B7D1', '2024-01-01 00:00:00', 0);

-- 初始化文章
INSERT INTO article (id, title, summary, content, category_id, tags, cover_image, view_count, is_top, status, create_time, update_time, deleted) VALUES
(1, 'SpringBoot 3.x 入门指南', '详细介绍SpringBoot 3.x的核心特性和入门使用方法，适合初学者快速上手。',
'# SpringBoot 3.x 入门指南

## 什么是 SpringBoot？

SpringBoot 是 Spring 框架的一个子项目，旨在简化 Spring 应用的初始搭建和开发过程。

## 核心特性

1. **自动配置** - SpringBoot 根据依赖自动配置应用
2. **起步依赖** - 简化 Maven/Gradle 配置
3. **嵌入式服务器** - 内嵌 Tomcat、Jetty 等
4. **健康检查** - 提供 Actuator 监控端点

## 快速开始

### 1. 创建项目

使用 Spring Initializr 创建项目，选择需要的依赖。

### 2. 编写第一个 Controller

```java
@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, SpringBoot 3!";
    }
}
```

### 3. 运行项目

直接运行 main 方法即可启动应用。

## 总结

SpringBoot 3.x 带来了很多新特性，如虚拟线程支持、GraalVM 原生镜像等，是 Java 开发的首选框架。
', 1, '1,2', NULL, 128, 1, 1, '2024-01-15 10:00:00', '2024-06-01 10:00:00', 0),

(2, 'React 18 新特性详解', '深入探讨 React 18 带来的并发模式、自动批处理等核心新特性。',
'# React 18 新特性详解

## 并发模式 (Concurrent Mode)

React 18 引入了全新的并发渲染机制。

## 自动批处理

React 18 默认启用自动批处理，多个状态更新会被合并。

```jsx
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只会触发一次重渲染
}
```

## useTransition

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchQuery(input);
});
```

## Suspense 改进

支持服务端渲染的 Suspense。

## 总结

React 18 带来的并发特性使得 UI 渲染更加流畅。
', 1, '3,4', NULL, 85, 0, 1, '2024-02-20 14:30:00', '2024-05-15 10:00:00', 0),

(3, '我的2024年度总结', '回顾2024年的学习、工作和生活，展望2025年的规划。',
'# 我的2024年度总结

## 技术成长

2024年是技术飞速发展的一年，我深入学习了：

- SpringBoot 3.x 微服务架构
- React 18 和 Next.js 14
- Docker 容器化部署
- CI/CD 自动化流程

## 工作回顾

在工作中参与了多个重要项目的开发。

## 生活感悟

保持学习的热情，保持对世界的好奇。

## 2025 展望

- 深入学习云原生技术
- 打造自己的技术品牌
- 坚持运动，保持健康
', 2, '7,8', NULL, 256, 1, 1, '2024-12-31 23:59:00', '2024-12-31 23:59:00', 0),

(4, 'MySQL 性能优化实战', '从索引优化、SQL优化、架构设计等角度分享MySQL性能调优经验。',
'# MySQL 性能优化实战

## 索引优化

### 选择合适的索引类型

- B+Tree 索引：适用于范围查询
- 哈希索引：适用于等值查询

### 索引设计原则

1. 为经常作为查询条件的字段创建索引
2. 使用联合索引时注意最左前缀原则
3. 避免过多的索引导致写入性能下降

## SQL 优化

```sql
-- 避免使用 SELECT *
SELECT id, name FROM users WHERE status = 1;

-- 使用 EXISTS 代替 IN
SELECT * FROM orders o
WHERE EXISTS (SELECT 1 FROM users u WHERE u.id = o.user_id);
```

## 架构优化

- 读写分离
- 分库分表
- 缓存策略

## 总结

性能优化是一个持续的过程，需要不断监控和调整。
', 1, '1,5', NULL, 192, 0, 1, '2024-03-10 09:00:00', '2024-04-20 10:00:00', 0),

(5, 'Next.js 14 服务端组件深度解析', '全面解析 Next.js 14 的服务端组件、客户端组件和流式渲染。',
'# Next.js 14 服务端组件深度解析

## 服务端组件 vs 客户端组件

### 服务端组件（默认）
- 在服务器上渲染
- 可以直接访问数据库
- 减少客户端 JavaScript

### 客户端组件
- 使用 `"use client"` 声明
- 支持交互和生命周期
- 可以访问浏览器 API

## 数据获取模式

```tsx
// 服务端组件直接获取数据
async function BlogList() {
  const posts = await db.posts.findMany();
  return <PostList posts={posts} />;
}
```

## 流式渲染

使用 `loading.tsx` 和 `Suspense` 实现流式加载。

## 总结

Next.js 14 的服务端组件大幅提升了应用性能和开发体验。
', 1, '3,4', NULL, 67, 0, 1, '2024-04-05 16:00:00', '2024-05-10 10:00:00', 0),

(6, 'Docker 容器化部署指南', '从零开始学习 Docker 容器化技术，实现应用的一键部署。',
'# Docker 容器化部署指南

## 什么是 Docker？

Docker 是一个开源的容器化平台。

## 基本概念

- **镜像 (Image)**：应用的只读模板
- **容器 (Container)**：镜像的运行实例
- **Dockerfile**：构建镜像的配置文件

## 编写 Dockerfile

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:8080"
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root123
```

## 总结

Docker 让应用的部署变得简单、可靠、可重复。
', 1, '6', NULL, 143, 0, 1, '2024-05-20 11:00:00', '2024-06-01 10:00:00', 0);
