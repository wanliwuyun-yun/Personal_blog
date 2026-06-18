package com.personalblog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personalblog.entity.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ArticleMapper extends BaseMapper<Article> {

    @Select("SELECT * FROM article WHERE deleted = 0 AND status = 1 ORDER BY is_top DESC, create_time DESC LIMIT 5")
    List<Article> selectLatest();

    @Select("SELECT * FROM article WHERE deleted = 0 AND status = 1 AND (title LIKE CONCAT('%', #{keyword}, '%') OR content LIKE CONCAT('%', #{keyword}, '%'))")
    List<Article> searchByKeyword(String keyword);

    @Update("UPDATE article SET view_count = view_count + 1 WHERE id = #{id}")
    void incrementViewCount(Long id);
}
