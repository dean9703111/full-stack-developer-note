# Ch23 [白板題]設計一個簡易的抽獎程式

### 23.2.4 筆者提供的簡答

```js
// 寫一個函式，有默認的抽獎機率：一獎(1%)、二獎(2%)、三獎(3%)
function lottery(firstPrize = 1, secondPrize = 2, thirdPrize = 3) {
  let luckyBox = [];
  // 放入籤筒
  for (var i = 0; i < 100; i++) {
    if (firstPrize !== 0) {
      luckyBox.push("一獎");
      firstPrize--;
    } else if (secondPrize !== 0) {
      luckyBox.push("二獎");
      secondPrize--;
    } else if (thirdPrize !== 0) {
      luckyBox.push("三獎");
      thirdPrize--;
    } else {
      luckyBox.push("感謝獎");
    }
  }
  // 抽獎
  console.log(luckyBox[Math.floor(Math.random() * 99)]);
}
lottery();
```

若想測試，可以直接使用 [simple-lottery.js](./simple-lottery.js)，於終端輸入`node simple-lottery.js`即可測試。

### 23.3.1 如果使用者輸入的機率有小數點呢？

```js
function lottery(firstPrize = 1, secondPrize = 2, thirdPrize = 3) {
  // 取得最長小數點
  let tmp = [firstPrize, secondPrize, thirdPrize];
  let longest = 0;
  tmp.forEach((prize) => {
    let afterPoint = prize.toString().split(".")[1];
    if (afterPoint) {
      if (afterPoint.length > longest) {
        longest = afterPoint.length;
      }
    }
  });

  // 讓機率變整數
  let multiple = Math.pow(10, longest);
  // 沒有用 Math.floor 會出現 js 小數點結尾的 Bug，ex:11100.000000000002
  firstPrize = Math.floor(firstPrize * multiple);
  secondPrize = Math.floor(secondPrize * multiple);
  thirdPrize = Math.floor(thirdPrize * multiple);
  // 籤筒的總數量
  let max = multiple * 100;

  let luckyBox = [];
  // 放入籤筒
  for (var i = 0; i < max; i++) {
    if (firstPrize !== 0) {
      luckyBox.push("一獎");
      firstPrize--;
    } else if (secondPrize !== 0) {
      luckyBox.push("二獎");
      secondPrize--;
    } else if (thirdPrize !== 0) {
      luckyBox.push("三獎");
      thirdPrize--;
    } else {
      luckyBox.push("感謝獎");
    }
  }
  // 抽獎
  console.log(luckyBox[Math.floor(Math.random() * (max - 1))]);
}
lottery(1.11, 2.34, 3.567);
```

若想測試，可以直接使用 [float-lottery.js](./float-lottery.js)，於終端輸入`node float-lottery.js`即可測試。

### 23.3.2 你有考慮到使用者可能輸入不合理的機率嗎？

```js
function validateInput(firstPrize, secondPrize, thirdPrize) {
  // 確認是否為正數
  var reg = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
  if (!(reg.test(firstPrize) && reg.test(secondPrize) && reg.test(thirdPrize))) {
    console.log("請確認輸入參數皆為正數！");
    return false;
  }

  // 確認沒爆表
  if (firstPrize + secondPrize + thirdPrize > 100) {
    console.log("中獎機率超過 100 %，爆表了！");
    return false;
  }
  return true;
}

const argsArray = [
  [100, 2.34, 3.567], //中獎率不可能超過100
  [-1, 2.34, 3.567], //機率不可為負
  [1, "錯誤", 3.567], //機率不可含有文字
  [1, 2.34, 3.567],
];

argsArray.forEach((args) => {
  console.log("驗證: " + args);
  console.log(validateInput.apply(this, args));
});
```

若想測試，可以直接使用 [validate-lottery.js](./validate-lottery.js)，於終端輸入`node validate-lottery.js`即可測試。

### 23.3.3 你會用什麼方式來驗證程式的正確性？

```js
function initLuckyBox(firstPrize = 1, secondPrize = 2, thirdPrize = 3) {
  // 先驗證輸入參數
  if (!validateInput(firstPrize, secondPrize, thirdPrize)) {
    return;
  }
  // 取得最長小數點
  let tmp = [firstPrize, secondPrize, thirdPrize];
  let longest = 0;
  tmp.forEach((prize) => {
    let afterPoint = prize.toString().split(".")[1];
    if (afterPoint) {
      if (afterPoint.length > longest) {
        longest = afterPoint.length;
      }
    }
  });
  // 讓機率變整數
  let multiple = Math.pow(10, longest);
  // 沒有用 Math.floor 會出現 js 小數點結尾的 Bug，ex:11100.000000000002
  firstPrize = Math.floor(firstPrize * multiple);
  secondPrize = Math.floor(secondPrize * multiple);
  thirdPrize = Math.floor(thirdPrize * multiple);
  // 籤筒的總數量
  let max = multiple * 100;
  let luckyBox = [];
  // 放入籤筒
  for (var i = 0; i < max; i++) {
    if (firstPrize !== 0) {
      luckyBox.push("一獎");
      firstPrize--;
    } else if (secondPrize !== 0) {
      luckyBox.push("二獎");
      secondPrize--;
    } else if (thirdPrize !== 0) {
      luckyBox.push("三獎");
      thirdPrize--;
    } else {
      luckyBox.push("感謝獎");
    }
  }
  return luckyBox;
}

function lottery(luckyBox = []) {
  let max = luckyBox.length;
  // 抽獎
  let result = luckyBox[Math.floor(Math.random() * (max - 1))];
  return result;
}

function validateInput(firstPrize, secondPrize, thirdPrize) {
  // 確認是否為正數
  var reg = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
  if (!(reg.test(firstPrize) && reg.test(secondPrize) && reg.test(thirdPrize))) {
    console.log("請確認輸入參數皆為正數！");
    return false;
  }
  // 確認沒爆表
  if (firstPrize + secondPrize + thirdPrize > 100) {
    console.log("中獎機率超過 100 %，爆表了！");
    return false;
  }
  return true;
}

function qa(testTimes = 10000) {
  // 設定中獎機率
  let firstPrize = 1.5,
    secondPrize = 2.33,
    thirdPrize = 3.98;
  let thanksPrize = 100 - firstPrize - secondPrize - thirdPrize;
  let luckyBox = initLuckyBox(firstPrize, secondPrize, thirdPrize);
  let first = 0,
    second = 0,
    third = 0,
    thanks = 0;

  for (var i = 0; i < testTimes; i++) {
    let result = lottery(luckyBox);
    if (result == "一獎") {
      first++;
    } else if (result == "二獎") {
      second++;
    } else if (result == "三獎") {
      third++;
    } else {
      thanks++;
    }
  }

  console.log("一獎:" + ((first / testTimes) * 100).toFixed(2) + "% (" + firstPrize + "%)");
  console.log("二獎:" + ((second / testTimes) * 100).toFixed(2) + "% (" + secondPrize + "%)");
  console.log("三獎:" + ((third / testTimes) * 100).toFixed(2) + "% (" + thirdPrize + "%)");
  console.log("感謝獎:" + ((thanks / testTimes) * 100).toFixed(2) + "% (" + thanksPrize + "%)");
}
qa();

// console.log(lottery(initLuckyBox()));
```

若想測試，可以直接使用 [final-lottery.js](./final-lottery.js)，於終端輸入`node final-lottery.js`即可測試。
