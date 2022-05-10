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