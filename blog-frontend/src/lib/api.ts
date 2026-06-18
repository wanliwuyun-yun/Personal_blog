import axios from "axios";
import type { ApiResult, Article, Category, PageResult, Tag } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// ===== 文章 API =====
export const articleApi = {
  getList(params?: {
    page?: number;
    size?: number;
    categoryId?: number;
    tagId?: number;
    keyword?: string;
  }): Promise<ApiResult<PageResult<Article>>> {
    return api.get("/article/list", { params });
  },

  getById(id: number): Promise<ApiResult<Article>> {
    return api.get(`/article/${id}`);
  },

  getLatest(): Promise<ApiResult<Article[]>> {
    return api.get("/article/latest");
  },

  search(keyword: string): Promise<ApiResult<Article[]>> {
    return api.get("/article/search", { params: { keyword } });
  },

  add(article: Partial<Article>): Promise<ApiResult<Article>> {
    return api.post("/article/add", article);
  },

  update(article: Partial<Article>): Promise<ApiResult<Article>> {
    return api.put("/article/update", article);
  },

  delete(id: number): Promise<ApiResult<null>> {
    return api.delete(`/article/${id}`);
  },
};

// ===== 分类 API =====
export const categoryApi = {
  getAll(): Promise<ApiResult<Category[]>> {
    return api.get("/category/all");
  },

  getWithCount(): Promise<ApiResult<(Category & { count: number })[]>> {
    return api.get("/category/with-count");
  },

  add(category: Partial<Category>): Promise<ApiResult<Category>> {
    return api.post("/category/add", category);
  },

  update(category: Partial<Category>): Promise<ApiResult<Category>> {
    return api.put("/category/update", category);
  },

  delete(id: number): Promise<ApiResult<null>> {
    return api.delete(`/category/${id}`);
  },
};

// ===== 标签 API =====
export const tagApi = {
  getAll(): Promise<ApiResult<Tag[]>> {
    return api.get("/tag/all");
  },

  getWithCount(): Promise<ApiResult<(Tag & { count: number })[]>> {
    return api.get("/tag/with-count");
  },

  add(tag: Partial<Tag>): Promise<ApiResult<Tag>> {
    return api.post("/tag/add", tag);
  },

  update(tag: Partial<Tag>): Promise<ApiResult<Tag>> {
    return api.put("/tag/update", tag);
  },

  delete(id: number): Promise<ApiResult<null>> {
    return api.delete(`/tag/${id}`);
  },
};

export default api;
