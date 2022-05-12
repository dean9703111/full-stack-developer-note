# Ch20 如何解決高併發情境的商品秒殺問題

### 20.2.2 使用 Node.js + Redis 解決高併發秒殺問題

如果完全沒有相關基礎，建議先參考下面連結，來安裝 Redis 以及它的 GUI 工具

- MacOS
  - [手把手帶你在 MacOS 安裝 Redis ＆Another Redis Desktop Manager](https://medium.com/dean-lin/8d0b45062f9)
- Windows
  - [在 Windows 下載與安裝 Redis](https://marcus116.blogspot.com/2019/02/how-to-install-redis-in-windows-os.html)
  - [Redis 管理工具 - Another Redis Desktop Manager](https://marcus116.blogspot.com/2020/04/tool-redis-another-redis-desktop-manager.html)

- **主程式：redis-seckill.js**

  - 先啟用 Redis Client 端。
  - 建立專案資料夾，在資料夾下輸入 `npm init` 初始化專案，再輸入 `yarn add ioredis` 來安裝套件。
  - 用 `prepare` 函式，以 Hash type 建立參加秒殺的產品庫存。
  - 用 `seckill` 函式模擬使用者購買行為，緩存並執行 Lua 腳本。

  ```js
  const fs = require("fs");
  const Redis = require("ioredis");
  const redis = new Redis({
      host: "127.0.0.1",
      port: 6379,
      password: "",
  });

  redis.on("error", function (error) {
      console.error(error);
  });

  async function prepare (itemName) {
      // 參加秒殺活動的商品庫存
      await redis.hmset(itemName, "Total", 100, "Booked", 0);
  }

  const seckillScript = fs.readFileSync("./seckill.lua");

  async function seckill (itemName, userName) {
      // 1. 緩存腳本取得 sha1 值
      const sha1 = await redis.script("load", seckillScript);
      // console.log(sha1);

      // 2. 透過 evalsha 執行腳本
      // redis Evalsha 命令基本語法如下
      // EVALSHA sha1 numkeys key [key ...] arg [arg ...]
      redis.evalsha(sha1, 1, itemName, 1, "order_list", userName);
  }

  function main () {
      console.time("seckill");
      const itemName = "item_name";
      prepare(itemName);
      for (var i = 1; i < 10000; i++) {
          const userName = "baobao" + i;
          seckill(itemName, userName);
      }
      console.timeEnd("seckill");
  }
  main();
  ```

- **Lua 腳本：seckill.lua**
  在 Lua 腳本執行邏輯：「確認下單數量」➜「取得商品庫存」➜「如果庫存足夠就下單」➜「儲存購買者資訊（List type）」。

  ```lua
  local itemName = KEYS[1]
  local n = tonumber(ARGV[1])
  local orderList = ARGV[2]
  local userName = ARGV[3]
  if not n  or n == 0 then
    return 0
  end
  local vals = redis.call("HMGET", itemName, "Total", "Booked");
  local total = tonumber(vals[1])
  local booked = tonumber(vals[2])
  if not total or not booked then
    return 0
  end
  if booked + n <= total then
    redis.call("HINCRBY", itemName, "Booked", n)
    redis.call("LPUSH", orderList, userName)
    return n
  end
  return 0
  ```

### 20.2.3 模擬秒殺情境確認商品沒有超賣

- **SETP 1**：在專案資料夾下輸入 `node redis-seckill.js` 模擬秒殺

### 參考資源

1. [手把手帶你在 MacOS 安裝 Redis ＆Another Redis Desktop Manager](https://medium.com/dean-lin/8d0b45062f9)
2. [用 Node.js + Redis 解決高併發秒殺問題](https://medium.com/dean-lin/e814fe26a0f2)
3. [redis 之 sorted sets 類型及操作](https://www.huaweicloud.com/articles/6785018d60d6272a49565cb148d661af.html)
4. [使用 redis 的有序集合實現排行榜功能](https://www.gushiciku.cn/pl/2MPj/zh-tw)
