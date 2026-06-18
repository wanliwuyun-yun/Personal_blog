package com.personalblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.personalblog.entity.Article;
import com.personalblog.mapper.ArticleMapper;
import com.personalblog.service.ArticleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Override
    public IPage<Article> getArticlePage(int page, int size, Long categoryId, Long tagId, String keyword) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
               .eq(Article::getDeleted, 0);

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

        return this.page(new Page<>(page, size), wrapper);
    }

    @Override
    public Article getArticleDetail(Long id) {
        baseMapper.incrementViewCount(id);
        return this.getById(id);
    }

    @Override
    public List<Article> getLatestArticles() {
        return baseMapper.selectLatest();
    }

    @Override
    public List<Article> searchArticles(String keyword) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
               .eq(Article::getDeleted, 0)
               .and(w -> w.like(Article::getTitle, keyword)
                          .or()
                          .like(Article::getContent, keyword));
        wrapper.orderByDesc(Article::getCreateTime);
        return this.list(wrapper);
    }

    @Override
    public List<Article> getArticlesByCategory(Long categoryId) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getCategoryId, categoryId)
               .eq(Article::getStatus, 1)
               .eq(Article::getDeleted, 0)
               .orderByDesc(Article::getCreateTime);
        return this.list(wrapper);
    }

    @Override
    public List<Article> getArticlesByTag(String tagName) {
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
               .eq(Article::getDeleted, 0)
               .like(Article::getTags, tagName)
               .orderByDesc(Article::getCreateTime);
        return this.list(wrapper);
    }
}
