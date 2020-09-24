const { json } = require('express');
let express = require('express');//引入express模块
const mysql = require("mysql");

let app = express();

// 连接basictest数据库
var db = mysql.createConnection({ host: 'localhost', port: '3306', user: "root", password: '123456', database: 'basictest' });

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
  let data = '';
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

//table模块新增
app.post('/table/add', function (req, res) {
  let addSql = 'INSERT INTO tableList(operateContent, username) VALUES(?,?)';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { operateContent, username } = JSON.parse(postdata)
    db.query(addSql, [operateContent, username], (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//table模块编辑
app.post('/table/updata', function (req, res) {
  let updataSql = 'UPDATE tableList SET operateContent = ?,username = ? WHERE userid = ?';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { operateContent, username, userid } = JSON.parse(postdata)
    db.query(updataSql, [operateContent, username, userid], (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//table模块删除
app.post('/table/delete', function (req, res) {
  let delSql = 'DELETE FROM tableList WHERE userid = ?';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { userid } = JSON.parse(postdata)
    db.query(delSql, [userid], (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//table模块批量删除
app.post('/table/deletes', function (req, res) {
  let delSqls = 'DELETE FROM tableList WHERE userid in (';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { ids } = JSON.parse(postdata)
    let str = ids.join(',')
    delSqls = `${delSqls}${str})`
    db.query(delSqls, (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//table模块查询
app.get('/table/list', function (req, res) {
  // 查询tableList表, 没有数据库时，可注释data，使用上面的data数据
  let searchSql
  if (req.query.keyword) {
    searchSql = `SELECT * FROM tableList WHERE username in (${req.query.keyword})`
  } else {
    searchSql = "SELECT * FROM tableList"
  }
  let result
  db.query(searchSql, (err, data) => {
    if (err) {
      result = err
    } else {
      result = {
        code: 0,
        msg: 'ok',
        data: {
          // data: [
          //   { userid:'1', operateContent: "测试1", username: "1", createTime: "2020-09-08" },
          //   { userid:'2', operateContent: "测试2", username: "2", createTime: "2020-09-08" },
          //   { userid:'3', operateContent: "测试3", username: "1", createTime: "2020-09-14" },
          //   { userid:'4', operateContent: "测试4", username: "2", createTime: "2020-09-14" }
          // ]
          data
        }
      }
    }
    res.send(result)
  });
})

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
//定义端口，此处所用为3000端口，可自行更改
let server = app.listen(3000, function () {
  console.log('runing 3000...');
})