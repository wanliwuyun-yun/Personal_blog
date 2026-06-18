package com.personalblog.controller;

import com.personalblog.common.Result;
import com.personalblog.entity.Comment;
import com.personalblog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/article/{articleId}")
    public Result<List<Comment>> list(@PathVariable Long articleId) {
        return Result.success(commentService.getCommentsByArticleId(articleId));
    }

    @PostMapping("/add")
    public Result<Comment> add(@RequestBody Comment comment) {
        comment.setCreateTime(LocalDateTime.now());
        comment.setStatus(0); // pending review
        commentService.save(comment);
        return Result.success("评论提交成功，等待审核", comment);
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        commentService.removeById(id);
        return Result.success("删除成功", null);
    }
}
