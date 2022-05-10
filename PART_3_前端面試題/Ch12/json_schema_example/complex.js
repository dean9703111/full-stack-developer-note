var Validator = require('jsonschema').Validator;
var v = new Validator();

var addressSchema = {
  "id": "/SimpleAddress",
  "type": "object",
  "properties": {
    "lines": {
      "type": "array",
      "items": { "type": "string" }
    },
    "zip": { "type": "string" },
    "city": { "type": "string" },
    "country": { "type": "string" }
  },
  "required": ["country"]
};
const personSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number", maximum: 150 },
    address: { $ref: "/SimpleAddress" },
  },
  required: ["name", "age"],
};
v.addSchema(addressSchema, '/SimpleAddress');
var person = {
  name: "baobao",
  age: 14,
  address: {
    lines: ["111-11 Xinyi District"],
    zip: "110",
    city: "Taipie",
    country: "TW"
  }
};
let result = v.validate(person, personSchema);
console.log("valid：" + result.valid);
console.log(result);