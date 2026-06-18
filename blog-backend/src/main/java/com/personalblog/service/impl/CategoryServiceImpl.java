package com.personalblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.personalblog.entity.Article;
import com.personalblog.entity.Category;
import com.personalblog.mapper.CategoryMapper;
import com.personalblog.service.ArticleService;
import com.personalblog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {

    @Autowired
    private ArticleService articleService;

    @Override
    public List<Map<String, Object>> getCategoriesWithCount() {
        List<Category> categories = this.list();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Category category : categories) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", category.getId());
            item.put("name", category.getName());
            item.put("description", category.getDescription());
            long count = articleService.count(new LambdaQueryWrapper<Article>()
                    .eq(Article::getCategoryId, category.getId())
                    .eq(Article::getStatus, 1));
            item.put("count", count);
            result.add(item);
        }
        return result;
    }
}
