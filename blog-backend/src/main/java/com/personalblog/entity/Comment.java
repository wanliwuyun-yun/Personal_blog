package com.personalblog.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("comment")
public class Comment {
    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("article_id")
    private Long articleId;

    @TableField("nickname")
    private String nickname;

    @TableField("email")
    private String email;

    @TableField("content")
    private String content;

    @TableField("status")
    private Integer status; // 0=pending, 1=approved, -1=rejected

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableLogic
    @TableField("deleted")
    private Integer deleted;
}
