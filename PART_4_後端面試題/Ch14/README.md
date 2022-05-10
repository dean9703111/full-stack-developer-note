# Ch14 請簡述 Node.js 的 Event Loop

### 14.2.2 用 Node.js 範例程式確認自己是否理解 Event Loop

```js
console.log("start");

process.nextTick(function () {
  console.log("nextTick1");
});

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise");
  resolve("resolve");
}).then(function (result) {
  console.log(result);
});

(async function () {
  console.log("async");
})();

setImmediate(function () {
  console.log("setImmediate");
});

process.nextTick(function () {
  console.log("nextTick2");
});

console.log("end");
```

### 參考資源：

1. [Node.js 的 Event Loop (事件輪詢)到底在做什麼？(筆者部落格)](https://medium.com/dean-lin/c7129063d0f4)
2. [15 個常見的 Node.js 面試問題及答案](https://www.gushiciku.cn/pl/gOTo/zh-tw)
3. [你有沒有想過，到底 Server 是如何「同時處理多個 requests」的？ - Node.js 篇](https://ithelp.ithome.com.tw/articles/10230126)
