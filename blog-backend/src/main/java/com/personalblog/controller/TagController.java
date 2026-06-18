package com.personalblog.controller;

import com.personalblog.common.Result;
import com.personalblog.entity.Tag;
import com.personalblog.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/all")
    public Result<List<Tag>> all() {
        return Result.success(tagService.list());
    }

    @GetMapping("/with-count")
    public Result<List<Map<String, Object>>> withCount() {
        return Result.success(tagService.getTagsWithCount());
    }

    @PostMapping("/add")
    public Result<Tag> add(@RequestBody Tag tag) {
        tag.setCreateTime(LocalDateTime.now());
        tagService.save(tag);
        return Result.success("添加成功", tag);
    }

    @PutMapping("/update")
    public Result<Tag> update(@RequestBody Tag tag) {
        tagService.updateById(tag);
        return Result.success("更新成功", tag);
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        tagService.removeById(id);
        return Result.success("删除成功", null);
    }
}
