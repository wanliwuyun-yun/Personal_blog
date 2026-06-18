package com.personalblog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.personalblog.entity.Tag;
import com.personalblog.mapper.TagMapper;
import com.personalblog.service.TagService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    @Override
    public List<Map<String, Object>> getTagsWithCount() {
        List<Tag> tags = this.list();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Tag tag : tags) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", tag.getId());
            item.put("name", tag.getName());
            item.put("color", tag.getColor());
            result.add(item);
        }
        return result;
    }
}
