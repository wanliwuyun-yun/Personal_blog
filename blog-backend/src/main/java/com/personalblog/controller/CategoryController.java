package com.personalblog.controller;

import com.personalblog.common.Result;
import com.personalblog.entity.Category;
import com.personalblog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public Result<List<Category>> all() {
        return Result.success(categoryService.list());
    }

    @GetMapping("/with-count")
    public Result<List<Map<String, Object>>> withCount() {
        return Result.success(categoryService.getCategoriesWithCount());
    }

    @PostMapping("/add")
    public Result<Category> add(@RequestBody Category category) {
        category.setCreateTime(LocalDateTime.now());
        categoryService.save(category);
        return Result.success("添加成功", category);
    }

    @PutMapping("/update")
    public Result<Category> update(@RequestBody Category category) {
        categoryService.updateById(category);
        return Result.success("更新成功", category);
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        categoryService.removeById(id);
        return Result.success("删除成功", null);
    }
}
