package com.personalblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.personalblog.entity.Article;
import com.personalblog.entity.Tag;
import com.personalblog.mapper.TagMapper;
import com.personalblog.service.ArticleService;
import com.personalblog.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    @Autowired
    private ArticleService articleService;

    @Override
    public List<Map<String, Object>> getTagsWithCount() {
        List<Tag> tags = this.list();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Tag tag : tags) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", tag.getId());
            item.put("name", tag.getName());
            item.put("color", tag.getColor());
            long count = articleService.count(new LambdaQueryWrapper<Article>()
                    .like(Article::getTags, tag.getId())
                    .eq(Article::getStatus, 1));
            item.put("count", count);
            result.add(item);
        }
        return result;
    }
}
