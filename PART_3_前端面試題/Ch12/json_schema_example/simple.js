var Validator = require('jsonschema').Validator;
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
    age: 14
};
// 錯誤測試用
// var person = {
//     age: 200
// };
let result = v.validate(person, personSchema);
console.log("valid：" + result.valid);
console.log(result);