//实例化express
let express = require("express");
let app = express();

//主要用于post方式
let bodyParser = require("body-parser");
let parserEncoded = bodyParser.urlencoded({ extended: false });
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

//登录接口
app.post("/login", jsonParser, (req, res) => {
    connection.query('SELECT * FROM `user` WHERE username=?', [req.body.username], (err, result) => {
        if (err) {
            res.send({ code: 1, msg: "服务器故障，查询失败" });
        };
        if (result.length == 0) { //当数据库中不存在用户名的时候，往数据库里面添加
            // connection.query('INSERT INTO `user`(`username`, `password`) VALUES (?,?)', [req.body.username, r-eq.body.password], (err, result) => {
            //     if (err) {
            //         res.send({ code: 1, msg: "新增用户失败" });
            //     } else {
            //         res.send({ code: 0, msg: "新增用户成功" });
            //     }
            // })
            res.send({ code: 1, msg: "您输入的用户不存在" })
        } else {
            connection.query('SELECT * FROM `user` WHERE username=? and password=?', [req.body.username, req.body.password], (err, result) => {
                console.log(req.body.username, req.body.password);
                if (err) {
                    res.send({ code: 1, msg: "登录失败" });
                } else {
                    if (result.length == 0) {
                        res.send({ code: 1, msg: "您输入的用户名或密码错误，登录失败" });
                    } else {
                        res.send({ code: 0, msg: "登录成功" });
                    }
                }
            })
        }
    })
});
//拉取数据库用户列表
app.get("/userList", (req, res) => { //status=1的表示已经删除的
    connection.query('SELECT id,username,birthday,phone,address FROM `user` WHERE status=?', ["0"], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                res.send({
                    code: 0,
                    data: result
                });
            } else {
                res.send({ code: 1, msg: "数据库失败" })
            }
        }
    })
});
//删除用户的接口  假删除  将自身的status的值由0变成1
app.get("/delUser", (req, res) => {
    console.log(req.query.id);
    //更新：update 表名 set  列名1=值1，列名2=值2 where 范围。 注：修改多个列的时候用逗号隔开。
    connection.query('UPDATE `user` SET `status`=1 WHERE id=?', [req.query.id], (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send({ code: 0, msg: "删除成功" })
        }
    })
});
//获取个人角色的接口
app.get("/rolerList", (req, res) => {
    let id = req.query.id,
        rolerName = [];
    connection.query('select * from roler', (err, result) => {
        if (err) return err;
        rolerName = result;
        if (id) {
            connection.query('select rid,rolername from user_roler, roler where user_roler.rid=roler.id and user_roler.status=1 and user_roler.uid=' + id, (err, results) => {
                if (err) throw err;
                res.json({
                    code: 0,
                    rolerName,
                    myRoler: results
                })
            })
        } else {
            res.json({
                code: 0,
                rolerName,
                myRoler: []
            })
        }
    })
});
// 移除角色标签
app.get('/removeRoler', (req, res) => {
    console.log(req.query);
    connection.query('update user_roler set status=0 where uid=? and rid=?', [req.query.uid, req.query.rid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows) {
            res.json({
                code: 0,
                msg: '删除成功!'
            })
        } else {
            res.json({
                code: -1,
                msg: '删除失败!'
            })
        }
    })
});
// 添加角色标签
app.get('/addTag', (req, res) => {
    //{ uid: '9', rid: '1' }
    let uid = req.query.uid, //用户
        rid = req.query.rid; //角色

    // 先查询用户是否有该角色，如果有则不添加
    connection.query(`select rid from user_roler where uid=? and rid=? and status =1`, [uid, rid], function(err, rows, fields) {
        if (err) throw err;
        console.log('rows...', rows);
        if (rows.length) {
            res.json({
                code: -2,
                msg: '已有该角色'
            })
        } else {
            connection.query(`insert into user_roler (uid, rid) values(?, ?)`, [uid, rid], function(err, rows) {
                if (err) throw err;
                if (rows.insertId) {
                    res.json({
                        code: 0,
                        msg: '添加角色成功'
                    })
                } else {
                    res.json({
                        code: -1,
                        msg: '添加角色失败'
                    })
                }
            });
        }
    });
});
//判断用户权限
app.get("/accessList", (req, res) => {
    //获取用户名和数据表中的user匹配 得到用户uid
    connection.query(`select id from user where username=?`, [req.query.username], (err, result) => {
        if (err) throw err;
        if (result[0].id) {
            let uid = result[0].id;
            connection.query(`select access.accessname from user,user_roler,roler_access,access where user.id=user_roler.uid 
            and user_roler.rid = roler_access.rid and roler_access.aid = access.id and uid=? and user_roler.status=1 group by access.id`, [uid], function(err, rows) {
                if (err) throw err;
                res.json({
                    code: 0,
                    list: rows
                })
            });
        }
    })
});

// 生成成绩单数据
// app.get('/reportList', (req, res) => {
//     connection.query(`select id from user`, function(err, result) {
//         if (err) throw err;
//         // result  每一个用户的id  uid
//         let score = [], //分数
//             dayStr = ``;
//         for (let i = 20; i <= 31; i++) { // 生成20号到31号的成绩单
//             let dayScore = [];
//             for (let y = 0; y < result.length; y++) { // 给每个用户生成一个成绩
//                 dayScore.push({
//                     id: result[y].id,
//                     score: Math.floor((Math.random() * 20)) + 80
//                 })
//                 dayStr += `(${result[y].id}, ${Math.floor((Math.random()*20))+80}, "2018-07-${i}"),`
//             }
//             score.push({
//                 data: `2018-07-${i}`,
//                 list: dayScore
//             })
//         }
//         connection.query(`insert into report (uid, score, data) values ${dayStr.slice(0, dayStr.length-1)}`, function(err, rows, fields) {
//             if (err) throw err;
//             res.json(rows);
//         })
//     });
// });
//获取成绩单数据
app.get("/reportTable", (req, res) => {
    connection.query(`select uid,username,score,data from report,user where report.uid=user.id and report.status=0`, (err, result) => {
        if (err) throw err;
        console.log(result.length);
        if (result.length) {
            res.json({ code: 0, msg: "查询成绩成功", data: result })
        } else {
            res.json({ code: 1, msg: "查询成绩失败" })
        }
    })
})
app.listen(9000);