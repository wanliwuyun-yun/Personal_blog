package com.personalblog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.personalblog.entity.Comment;

import java.util.List;

public interface CommentService extends IService<Comment> {
    List<Comment> getCommentsByArticleId(Long articleId);
}
