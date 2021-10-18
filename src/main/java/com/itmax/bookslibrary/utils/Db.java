package com.itmax.bookslibrary.utils;

import org.json.JSONObject;

import java.sql.Connection;
import java.sql.DriverManager;

public class Db {
    private static JSONObject config;
    private static Connection connection;
    private static final String PREFIX = "KH181_0_";

    private static BookOrm bookOrm;

    public static BookOrm getBookOrm() {
        if (bookOrm == null)
            bookOrm = new BookOrm(connection, PREFIX, config);
        return bookOrm;
    }

    public static boolean setConnection(JSONObject json) {
        try {
            String dbms = json.getString("dbms");

            if (dbms.equalsIgnoreCase("Oracle")) {
                String connectionString;

                try {
                    connectionString = String.format(
                            "jdbc:oracle:thin:%s/%s@%s:%d/XE",
                            json.getString("user"),
                            json.getString("pass"),
                            json.getString("host"),
                            json.getInt("port")
                    );

                    DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());

                    connection = DriverManager.getConnection(connectionString);
                    config = json;

                    return true;
                } catch (Exception ex) {
                    System.err.println("Db: " + ex.getMessage());
                }
            } else {
                System.err.println("Db: Unsupported DBMS");
            }
        } catch (Exception ex) {
            System.err.println("Db: " + ex.getMessage());
        }

        connection = null;
        config = null;

        return false;
    }
}
