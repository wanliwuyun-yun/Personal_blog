package com.personalblog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.personalblog.entity.Category;

import java.util.List;
import java.util.Map;

public interface CategoryService extends IService<Category> {
    List<Map<String, Object>> getCategoriesWithCount();
}
