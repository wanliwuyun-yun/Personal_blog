package com.personalblog.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.Statement;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final DataSource dataSource;

    public DataInitializer(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) {
        try (Connection conn = dataSource.getConnection()) {
            boolean tableExists = isTableExists(conn, "ARTICLE");

            if (!tableExists) {
                log.info("Tables not found, initializing schema...");
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
                populator.addScript(new ClassPathResource("schema.sql"));
                populator.setSeparator(";");
                populator.execute(dataSource);
                log.info("Schema initialized successfully");
            } else {
                log.info("Tables already exist, skipping schema initialization");
            }

            if (isDatabaseEmpty(conn)) {
                log.info("Database is empty, inserting seed data...");
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
                populator.addScript(new ClassPathResource("data.sql"));
                populator.setSeparator(";");
                populator.execute(dataSource);
                log.info("Seed data inserted successfully");
            } else {
                log.info("Database already has data, skipping seed data insertion");
            }

        } catch (Exception e) {
            log.error("Data initialization failed", e);
        }
    }

    private boolean isTableExists(Connection conn, String tableName) {
        try {
            DatabaseMetaData meta = conn.getMetaData();
            try (ResultSet rs = meta.getTables(null, null, tableName, new String[]{"TABLE"})) {
                return rs.next();
            }
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isDatabaseEmpty(Connection conn) {
        try (Statement stmt = conn.createStatement()) {
            var rs = stmt.executeQuery("SELECT COUNT(*) FROM article");
            if (rs.next()) {
                return rs.getInt(1) == 0;
            }
        } catch (Exception ignored) {
        }
        return true;
    }
}
