# Ch16 設計 API 時會考慮哪些點？

### 16.2.2 了解後端驗證的重要性，並認識常見的 Validation Rule

[Laravel Validation Rule](https://laravel.tw/docs/5.0/validation#available-validation-rules)

```php
$validator = Validator::make($request->all(), [
    'email' =>  ['required', 'email', 'string', 'max:255', 'unique:users'],
    'name' =>  ['required', 'string', 'max:50'],
    'password' => ['required', 'string', 'max:255', 'min:8', 'regex:/^.*(?=.{8,})(?=.*?[a-zA-Z])(?=.*?[0-9]).*$/', 'confirmed']
]);
```

### 參考資源

1. [進階 RESTful API 討論](https://ithelp.ithome.com.tw/articles/10224134)
2. [透過 JWT 實作驗證機制](https://medium.com/麥克的半路出家筆記/2e64d72594f8)
3. [認識 Cookie、Session、Token 與 JWT](https://blog.yyisyou.tw/5d272c64/)
4. [簡單聊一聊 Cookie、Session、Token、JWT 的區別和作用](https://segmentfault.com/a/1190000021810849)
