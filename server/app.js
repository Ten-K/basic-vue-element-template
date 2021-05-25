const { json } = require('express');
let express = require('express');//引入express模块

let app = express();

// 加载模块
const nedb = require('nedb');
// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
  filename: './data/save.db',
  autoload: true
});
const roleDb = new nedb({
  filename: './data/role.db',
  autoload: true
});

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
    username = data.username
    if (data.username == 'admin' && data.password == 'admin') {
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

//当前用户权限
app.post('/roleAuth',(req, res)=>{
  let data = '';
  let result
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    let { username } = JSON.parse(data)
    roleDb.find({ username },(err, ret) => {
      if (err) return result = err
      result = {
        code: 0,
        msg: 'ok',
        data:{
          data: ret[0].list
        }
      }
      res.send(result);
    })
  })
})

//权限列表
app.post('/roleAuthList',(req, res)=>{
  let data = '';
  let result
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    roleDb.find({},(err, ret) => {
      if (err) return result = err
      result = {
        code: 0,
        msg: 'ok',
        data:{
          data: ret
        }
      }
      res.send(result);
    })
  })
})

//编辑用户权限
app.post('/update/roleAuth',(req, res)=>{
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = JSON.parse(postdata)
    let {_id,list} = postdata
    roleDb.update({_id},{$set:{list}}, (err, ret) => {
      if (err) return result = err
      result = {
        code: 0,
        msg: 'ok',
      }
      res.send(result);
    });
  })
})

//table模块新增
app.post('/table/add', function (req, res) {
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    // 插入单项
    db.insert(JSON.parse(postdata), (err, ret) => {
      if (err) return result = err
      result = {
        code: 0,
        msg: 'ok',
      }
      res.send(result);
    });
  })
});

//table模块编辑
app.post('/table/updata', function (req, res) {
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = JSON.parse(postdata)
    let {_id,username,operateContent,createTime} = postdata
    db.update({_id},{$set:{operateContent,username,createTime}}, (err, ret) => {
      if (err) return result = err
      result = {
        code: 0,
        msg: 'ok',
      }
      res.send(result);
    });
  })
});

//table模块删除
app.post('/table/delete', function (req, res) {
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = JSON.parse(postdata)
    let { _id } = postdata
    db.remove({ _id }, function (err, ret) {
      if (err) return result = err
      result = {
        code: 0,
        msg: 'ok',
      }
      res.send(result);
    });
  })
});

//table模块批量删除
app.post('/table/deletes', function (req, res) {
  let postdata = '';
  let result
  let i = 0
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { ids } = JSON.parse(postdata)
    ids.forEach(_id => {
      db.remove({_id}, function (err, ret) {
        if (err) return result = err
        result = {
          code: 0,
          msg: 'ok',
        }
        i++
        if(i == ids.length){
          res.send(result)
        }
      });
    });
  })
});

//table模块查询
app.get('/table/list', function (req, res) {
  let params = JSON.parse(req.query.data)
  params = params.keyword == null ? {} : { username:params.keyword }
  db.find(params).sort({createTime: -1}).exec(function (err, ret) {
    if (err) return result = err
    result = {
      code: 0,
      msg: 'ok',
      data:{
        data: ret,
        total: ret.length
      }
    }
    res.send(result);
  });
  // db.find(params,(err,ret)=>{
  //   if (err) return result = err
  //   result = {
  //     code: 0,
  //     msg: 'ok',
  //     data:{
  //       data: ret,
  //       total: ret.length
  //     }
  //   }
  //   res.send(result);
  // })
})

//定义端口，此处所用为3000端口，可自行更改
let server = app.listen(3000, function () {
  console.log('runing 3000...');
})


//Websocket
let ws = require("nodejs-websocket");
console.log("开始建立链接");
ws.createServer(function (conn) {
  conn.on("text", function (str) {
    console.log("info", str);
    conn.send(`${str}（机器人`)
  });
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  })
}).listen(8001);
console.log("链接建立完毕");