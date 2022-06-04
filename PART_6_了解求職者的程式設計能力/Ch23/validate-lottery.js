function lottery (firstPrize = 1, secondPrize = 2, thirdPrize = 3) {
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
  // 抽獎
  console.log(luckyBox[Math.floor(Math.random() * (max - 1))]);
}

function validateInput (firstPrize, secondPrize, thirdPrize) {
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
