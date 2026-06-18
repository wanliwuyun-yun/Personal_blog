package com.personalblog.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("article")
public class Article {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String title;

    private String summary;

    @TableField("content")
    private String content;

    @TableField("category_id")
    private Long categoryId;

    @TableField("tags")
    private String tags;

    @TableField("cover_image")
    private String coverImage;

    @TableField("view_count")
    private Integer viewCount;

    @TableField("is_top")
    private Boolean isTop;

    @TableField("status")
    private Integer status;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("update_time")
    private LocalDateTime updateTime;

    @TableLogic
    @TableField("deleted")
    private Integer deleted;

    @TableField(exist = false)
    private String categoryName;
}
