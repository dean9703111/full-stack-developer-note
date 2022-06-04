# Ch13 你會的後端框架不只一個，可以說明一下它們之間的差異嗎？

### 13.2.1 PHP VS Node.js

用 PHP 實現非阻塞（non-blocking）：[reactPHP](https://reactphp.org/)  
Node.js 可以透過 PM2 的 Cluster Mode 達到多執行緒：[PM2](https://pm2.keymetrics.io/)

### 13.2.2 用 supervisor 讓 Node.js 熱更新

- **STEP 1**：在全域安裝套件`npm install supervisor -g`
- **STEP 2**：建立一個`myapp.js`的檔案，並複製貼上下面程式

  ```js
  var http = require('http');
  http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  }).listen(3000, '127.0.0.1'); 
  ```

- **STEP 3**：用`node myapp.js`啟動程式後，修改`res.end("Hello World!");`的內容；刷新網頁後`內容不變`。
- **STEP 4**：改用`supervisor myapp.js`啟動程式，修改`res.end("Hello World!");`的內容；刷新網頁後`內容更新`。

### 參考資源：

1. [PHP + Apache Stack vs Node.js](https://thomashunter.name/posts/2012-06-21-php-vs-nodejs)
2. [服務端 I/O 效能大比拼：Node、PHP、Java、Go](https://www.itread01.com/content/1549876684.html)
3. [簡析 Node.js 特點與應用場景](https://jishuin.proginn.com/p/763bfbd2cab5)
4. [詳細版 | 用 Supervisor 守護你的 Node.js 進程](https://www.jianshu.com/p/6d84e5efe99d)
5. [淺談 Node.js 和 PHP 程式管理](https://iter01.com/403097.html)
