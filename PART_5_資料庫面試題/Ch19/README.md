# Ch19 關聯式資料庫要如何設計避免超賣？

### 19.2.3 在 MySQL DB 實作悲觀鎖

- **STEP 1**：建立模擬資料
  - 先用 SQL command 建立一個簡單的 Table 並新增 data。
    ```sql
    CREATE TABLE items
      (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        num INT NOT NULL,
        PRIMARY KEY (id)
      );

    INSERT INTO items
                (name,num)
    VALUES      ("iPhone",1); 
    ```
  - 確認資料是否建立成功。
    ```sql
    SELECT * FROM items; 
    ```
- **STEP 2**：開一個視窗模擬 A 客戶搶購行為
  - Transaction 的開始要用 `begin;`，不然 MySQL 會自動提交。
  - 在 A 購買前先將 `id=1` 的 data 加上悲觀鎖，`此時這行 data 只有 A 可以操作`。
    ```sql
    SELECT num
    FROM   items
    WHERE  id = 1
    FOR UPDATE; 
    ```
- **STEP 3**：`開另一個視窗`模擬 B 客戶搶購行為
  - 一樣將 `id=1` 的 data 加上悲觀鎖，下完指令後便會`進入等待的模式，要等 A 執行 commit 完成交易或是指令逾時`才能繼續。
  ```sql
  begin;

  SELECT num
  FROM   items
  WHERE  id = 1
  FOR UPDATE; 
  ```
- **STEP 4**：回到 A 客戶的視窗完成交易
  - 讓 A 執行購買的動作，將 data 的 num 減一。
    ```sql
    UPDATE items
    SET    num = num - 1
    WHERE  id = 1; 
    ```
  - 然後檢視修改後的 data 是否符合預期。
    ```sql
    SELECT num FROM items WHERE id = 1;
    ```
  - 最後下 `commit;` 結束這次交易。
- **STEP 5**：當 A 完成交易後回到 B 的視窗
  你會發現因為 A 釋放了悲觀鎖，所以 B 結束等待並且獲得鎖；但 data 的 num 已經變成 0 了，只能放棄購買。



### 19.2.4 在 MySQL DB 實作樂觀鎖

- **STEP 1**：建立模擬資料
  - 先用 SQL command 建立一個簡單的 Table 並新增 data，`比起悲觀鎖的 Table，樂觀鎖多了一個 version 的欄位`。
    ```sql
    CREATE TABLE happy_items
      (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        num INT NOT NULL,
        version INT NOT NULL,
        PRIMARY KEY (id)
      );

    INSERT INTO happy_items
                (name,num,version)
    VALUES      ("iPhone",1,0); 
    ```
  - 確認資料是否建立成功。
    ```sql
    SELECT * FROM happy_items; 
    ```
- **STEP 2**：規劃實作邏輯思路
  - A 跟 B 客戶在購買前會先將 `id=1` 的 data 找出來。
  - A 先購買，此時會以 `id=1 和 version=0` 作為 where 條件來更新 data，更新後 num -1、version +1 變成 `id=1、num=0、version=1`。
  - B 購買時會因為同樣是用 `id=1 和 version=0` 為 where 條件，所以會因為找不到 version=0 的 data 而無法更新。
- **STEP 3**：模擬搶購情境，A 跟 B 客戶購買前先查詢庫存
  - A 及 B 執行查詢的 SQL command 會取得相同的 iPhone 庫存資訊。
    ```sql
    SELECT num,version FROM happy_items WHERE id = 1;
    ```
- **STEP 4**：A 客戶先執行購買的 SQL command

  - A 先購買 iPhone 並更新 data。
    ```sql
    UPDATE happy_items
    SET    num = num - 1,version = version + 1
    WHERE  id = 1
          AND version = 0; 
    ```
  - 檢視修改後的 data 是否符合預期。
    ```sql
    SELECT num,version FROM happy_items WHERE id = 1;
    ```

- **STEP 5**：B 客戶再執行購買的 SQL command
  ```sql
  UPDATE happy_items
  SET    num = num - 1,version = version + 1
  WHERE  id = 1
        AND version = 0; 
  ```
  此時 B 的購買就會失敗，在執行購買的 SQL command 後你會發現沒有 Row 被更新，因為`庫存資訊已更新，但 SQL command 的 version 還是舊的`。

### 參考資源

1. [理解資料庫『悲觀鎖』和『樂觀鎖』的觀念](https://medium.com/dean-lin/2cabb858726d#55e3)
