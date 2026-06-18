package com.personalblog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.personalblog.entity.Tag;

import java.util.List;
import java.util.Map;

public interface TagService extends IService<Tag> {
    List<Map<String, Object>> getTagsWithCount();
}
