package com.personalblog.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.personalblog.entity.Article;

import java.util.List;

public interface ArticleService extends IService<Article> {
    IPage<Article> getArticlePage(int page, int size, Long categoryId, Long tagId, String keyword, Integer status);

    Article getArticleDetail(Long id);

    List<Article> getLatestArticles();

    List<Article> searchArticles(String keyword);

    List<Article> getArticlesByCategory(Long categoryId);

    List<Article> getArticlesByTag(Long tagId);
}
