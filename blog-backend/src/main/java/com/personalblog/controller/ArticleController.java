package com.personalblog.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.personalblog.common.PageResult;
import com.personalblog.common.Result;
import com.personalblog.entity.Article;
import com.personalblog.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/list")
    public Result<PageResult<Article>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long tagId,
            @RequestParam(required = false) String keyword) {
        IPage<Article> articlePage = articleService.getArticlePage(page, size, categoryId, tagId, keyword);
        return Result.success(PageResult.from(articlePage));
    }

    @GetMapping("/{id}")
    public Result<Article> detail(@PathVariable Long id) {
        Article article = articleService.getArticleDetail(id);
        if (article == null) {
            return Result.error("文章不存在");
        }
        return Result.success(article);
    }

    @GetMapping("/latest")
    public Result<List<Article>> latest() {
        return Result.success(articleService.getLatestArticles());
    }

    @GetMapping("/search")
    public Result<List<Article>> search(@RequestParam String keyword) {
        return Result.success(articleService.searchArticles(keyword));
    }

    @PostMapping("/add")
    public Result<Article> add(@RequestBody Article article) {
        article.setCreateTime(LocalDateTime.now());
        article.setUpdateTime(LocalDateTime.now());
        article.setViewCount(0);
        article.setStatus(1);
        articleService.save(article);
        return Result.success("发布成功", article);
    }

    @PutMapping("/update")
    public Result<Article> update(@RequestBody Article article) {
        article.setUpdateTime(LocalDateTime.now());
        articleService.updateById(article);
        return Result.success("更新成功", article);
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        articleService.removeById(id);
        return Result.success("删除成功", null);
    }
}
