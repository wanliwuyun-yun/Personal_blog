package com.personalblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.personalblog.entity.Comment;
import com.personalblog.mapper.CommentMapper;
import com.personalblog.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Override
    public List<Comment> getCommentsByArticleId(Long articleId) {
        LambdaQueryWrapper<Comment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Comment::getArticleId, articleId);
        wrapper.eq(Comment::getStatus, 1); // only approved
        wrapper.orderByAsc(Comment::getCreateTime);
        return list(wrapper);
    }
}
