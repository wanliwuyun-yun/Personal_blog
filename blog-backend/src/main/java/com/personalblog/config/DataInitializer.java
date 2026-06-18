package com.personalblog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DataSource dataSource;

    @Value("${spring.jpa.hibernate.ddl-auto:update}")
    private String ddlAuto;

    public DataInitializer(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        // 使用 H2 时自动初始化数据
        if (ddlAuto.equals("update")) {
            try {
                Resource schemaResource = new ClassPathResource("schema.sql");
                if (schemaResource.exists()) {
                    ScriptUtils.executeSqlScript(dataSource.getConnection(), schemaResource);
                }
                Resource dataResource = new ClassPathResource("data.sql");
                if (dataResource.exists()) {
                    ScriptUtils.executeSqlScript(dataSource.getConnection(), dataResource);
                }
            } catch (Exception e) {
                // 表已存在时会报错，忽略即可
                System.out.println("Data initialization skipped: " + e.getMessage());
            }
        }
    }
}
