let express = require("express");
let app = express();

//主要用于post方式
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json(); //适用于axios发送的数据，因为axios发送的是一个json

//连接服务器
let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    prot: 3306,
    user: "root",
    database: "1601nclass" //数据库名称
});

//查看数据库是否连接成功
connection.connect(err => {
    //如果err的返回结果为null表示连接成功
    if (err) {
        throw err;
    }
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
        // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post("/logined", jsonParser, (req, res) => {
    console.log(req.body);
    //应该做判断的  增删改查  算了 不做了
    res.json({
        code: 1,
        msg: "登录成功"
    });
})
app.listen(9000);