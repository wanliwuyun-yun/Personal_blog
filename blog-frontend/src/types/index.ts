export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  categoryId: number;
  tags: string;
  coverImage: string | null;
  viewCount: number;
  isTop: boolean;
  status: number;
  createTime: string;
  updateTime: string;
  categoryName?: string;
  tagList?: Tag[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createTime: string;
  count?: number;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  createTime: string;
  count?: number;
}

export interface PageResult<T> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  records: T[];
}

export interface ApiResult<T> {
  code: number;
  msg: string;
  data: T;
}

export interface MarqueeItem {
  name: string;
  desc: string;
  icon?: string;
}
