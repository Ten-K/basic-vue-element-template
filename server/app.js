var express = require('express');//引入express模块

var app = express();

/* 
*引入mysql部分代码----后期添加数据库使用
*
*/

/* const mysql = require("mysql");
// 连接basictest数据库
var db = mysql.createConnection({ host: 'localhost', port: '3306', user: "root", password: '123456', database: 'basictest' });
// 查询students表
db.query("SELECT * FROM students",(err,data)=>{
	if(err){
		console.log('err!',err);
	}else{
		console.log("success",JSON.stringify(data));
	}
}); */

app.all('*', function (req, res, next) {//允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//登录
app.post('/login', function (req, res) {
  var data = '';
  let result
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(data)
    if (data.username == '123' && data.password == '123') {
      result = {
        code: 0,
        msg: 'ok',
      }
    } else {
      result = {
        code: 1,
        msg: '账号或密码错误',
      }
    }
    res.send(result);
  })
});
//test接口
app.get('/list/product', function (req, res) {
  let result = {
    code: 0,
    msg: 'ok',
    data: {
      "name": "huawei",
      "price": "1999",
      "title": "huawei huawei huawei",
      "id": "1"
    }
  }
  res.send(result)
})
//表格组件的数据
app.get('/table/list', function (req, res) {
  //数据
  let result = {
    code: 0,
    msg: 'ok',
    data: {
      data: [
        { operateContent: "测试1", username: "1", creationTime: "2020-09-08" },
        { operateContent: "测试2", username: "2", creationTime: "2020-09-08" },
        { operateContent: "测试3", username: "1", creationTime: "2020-09-14" },
        { operateContent: "测试4", username: "2", creationTime: "2020-09-14" }
      ]
    }
  }
  res.send(result)
})
//定义端口，此处所用为3000端口，可自行更改
var server = app.listen(3000, function () {
  console.log('runing 3000...');
})