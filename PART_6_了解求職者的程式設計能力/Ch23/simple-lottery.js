// 寫一個函式，有默認的抽獎機率：一獎(1%)、二獎(2%)、三獎(3%)
function lottery (firstPrize = 1, secondPrize = 2, thirdPrize = 3) {
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