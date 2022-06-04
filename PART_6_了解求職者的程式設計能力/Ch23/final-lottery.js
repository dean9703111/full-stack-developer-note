function initLuckyBox (firstPrize = 1, secondPrize = 2, thirdPrize = 3) {
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

function lottery (luckyBox = []) {
    let max = luckyBox.length;
    // 抽獎
    let result = luckyBox[Math.floor(Math.random() * (max - 1))];
    return result;
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

function qa (testTimes = 100000) {
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
