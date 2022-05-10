# Ch17 設計資料庫時會考量哪些點？

### 17.2.1 在 Table 建立有效的 Index

- **SETP 1**：建立測試用的 **users** Table

  ```sql
  CREATE TABLE users
    (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255),
      INDEX index_name (name),
      PRIMARY KEY (id)
    );

  INSERT INTO users
              (name,password)
  VALUES      ("寶寶不說","123"); 
  ```

- **SETP 2**：下 SQL 指令了解是否使用 Index

  - **SQL A**：`EXPLAIN SELECT id FROM users WHERE name= "寶寶不說";`
  - **SQL B**：`EXPLAIN SELECT password FROM users WHERE name= "寶寶不說";`

- **SETP 3**：建立 Coverage Index 優化 SQL B

  - **先將資料庫 drop 掉**：`DROP TABLE users;`
  - **重新建立測試資料以及「Coverage Index」**

    ```sql
    CREATE TABLE users
      (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        INDEX name_password(name,password),
        PRIMARY KEY (id)
      );

    INSERT INTO users
                (name,password)
    VALUES      ("寶寶不說","123"); 
    ```

  - **再次執行 SQL B**：`EXPLAIN SELECT password FROM users WHERE name= "寶寶不說";`

### 參考資源

1. [MySQL 資料庫面試題](https://www.gushiciku.cn/pl/poXE/zh-tw)
2. [你在 Table 建立的 Index 真的有效嗎？用範例帶你理解 Coverage Index 的意義(筆者部落格)](https://medium.com/dean-lin/f852af308c27)
3. [MySQL 與 PostgreSQL 相比哪個更好？](https://zi.media/@yidianzixun/post/FaABsS)
