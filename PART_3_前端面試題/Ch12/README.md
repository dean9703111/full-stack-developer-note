# Ch12 在使用後端的資料前，你有先做驗證嗎？

### 12.2.1 認識「JSON schema」

```js
const person_schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number", maximum: 150 },
  },
  required: ["name", "age"],
};
```

### 12.2.2 安裝「jsonschema」並了解它的優點

#### 安裝步驟

- **SETP 1**：建立一個專案資料夾。
- **SETP 2**：在終端機輸入 `npm init` 初始化專案。
- **SETP 3**：在終端機輸入 `npm i jsonschema` 安裝套件。

### 12.2.3 「jsonschema」驗證範例

- **SETP 1**：在專案資料夾下建立「simple.js」來了解如何驗證 JSON 資料結構。
- **STEP 2**：以剛剛的 `person_schema` 作為範例來跟大家做講解，程式如下：

  ```js
  var Validator = require("jsonschema").Validator;
  var v = new Validator();

  const personSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number", maximum: 150 },
    },
    required: ["name", "age"],
  };
  var person = {
    name: "baobao",
    age: 14,
  };
  let result = v.validate(person, personSchema);
  console.log("valid：" + result.valid);
  console.log(result);
  ```

- **STEP 3**：在終端機輸入 `node simple.js` ，觀察套件驗證結果
- **STEP 4**：了解輸出參數的意義
- **STEP 5**：將`person`改為錯誤的資料結構：

  - 將必填參數`name`移除
  - 把 age 的數字填寫`超過最大值`

  ```js
  var person = {
    age: 200,
  };
  ```

- **STEP 6**：在終端機輸入 `node simple.js` ，確認驗證結果的 errors 是否捕捉到錯誤。

> [jsonschema 官網](https://www.npmjs.com/package/jsonschema)

### 12.3.1 前端開發時會考慮哪些問題

[Responsively](https://medium.com/dean-lin/de5f9efe9f4c)

### 參考資源

1. [拒當前端黑鍋俠！用「jsonschema」來驗證後端回傳的 json 資料結構](https://medium.com/dean-lin/a0940809a394#08eb)
2. [前端工程師面試問題集](https://h5bp.org/Front-end-Developer-Interview-Questions/translations/chinese-traditional/)
