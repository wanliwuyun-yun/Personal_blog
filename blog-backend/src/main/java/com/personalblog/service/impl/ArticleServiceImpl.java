package com.personalblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.personalblog.entity.Article;
import com.personalblog.entity.Category;
import com.personalblog.mapper.ArticleMapper;
import com.personalblog.mapper.CategoryMapper;
import com.personalblog.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Autowired
    private CategoryMapper categoryMapper;

    private void populateCategoryName(Article article) {
        if (article != null && article.getCategoryId() != null) {
            Category category = categoryMapper.selectById(article.getCategoryId());
            if (category != null) {
                article.setCategoryName(category.getName());
            }
        }
    }

    private void populateCategoryNames(List<Article> articles) {
        if (articles == null || articles.isEmpty()) return;
        List<Long> catIds = articles.stream()
                .map(Article::getCategoryId)
                .filter(id -> id != null && id > 0)
                .distinct()
                .collect(Collectors.toList());
        if (catIds.isEmpty()) return;
        List<Category> cats = categoryMapper.selectBatchIds(catIds);
        Map<Long, String> catMap = cats.stream()
                .collect(Collectors.toMap(Category::getId, Category::getName));
        articles.forEach(a -> a.setCategoryName(catMap.get(a.getCategoryId())));
    }

    @Override
    public IPage<Article> getArticlePage(int page, int size, Long categoryId, Long tagId, String keyword, Integer status) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();

        if (status != null) {
            wrapper.eq(Article::getStatus, status);
        } else {
            wrapper.eq(Article::getStatus, 1); // 默认只查已发布
        }

        if (categoryId != null && categoryId > 0) {
            wrapper.eq(Article::getCategoryId, categoryId);
        }

        if (tagId != null && tagId > 0) {
            wrapper.like(Article::getTags, tagId);
        }

        if (keyword != null && !keyword.trim().isEmpty()) {
            wrapper.and(w -> w.like(Article::getTitle, keyword)
                              .or()
                              .like(Article::getContent, keyword));
        }

        wrapper.orderByDesc(Article::getIsTop)
               .orderByDesc(Article::getCreateTime);

        IPage<Article> articlePage = this.page(new Page<>(page, size), wrapper);
        populateCategoryNames(articlePage.getRecords());
        return articlePage;
    }

    @Override
    public Article getArticleDetail(Long id) {
        baseMapper.incrementViewCount(id);
        Article article = this.getById(id);
        populateCategoryName(article);
        return article;
    }

    @Override
    public List<Article> getLatestArticles() {
        List<Article> articles = baseMapper.selectLatest();
        populateCategoryNames(articles);
        return articles;
    }

    @Override
    public List<Article> searchArticles(String keyword) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
               .and(w -> w.like(Article::getTitle, keyword)
                          .or()
                          .like(Article::getContent, keyword));
        wrapper.orderByDesc(Article::getCreateTime);
        List<Article> articles = this.list(wrapper);
        populateCategoryNames(articles);
        return articles;
    }

    @Override
    public List<Article> getArticlesByCategory(Long categoryId) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getCategoryId, categoryId)
               .eq(Article::getStatus, 1)
               .orderByDesc(Article::getCreateTime);
        List<Article> articles = this.list(wrapper);
        populateCategoryNames(articles);
        return articles;
    }

    @Override
    public List<Article> getArticlesByTag(Long tagId) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
               .like(Article::getTags, tagId)
               .orderByDesc(Article::getCreateTime);
        List<Article> articles = this.list(wrapper);
        populateCategoryNames(articles);
        return articles;
    }
}
