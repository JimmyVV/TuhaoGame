var express = require('express');
router = express.Router(),
    Post = require('../models/post'),
    async = require('async'),
    multer = require('multer'),
    fs = require('fs');
module.exports = function(app) {
    app.route('/')
        .get(function(req, res) {
            res.render('index');
        });
    app.route('/getTyrant') //获得土豪信息
        //修改post获取的内容，前端会发送 已经存放的土豪名字(array),只需要做的，查询不包含的信息
        .post(function(req, res) {
            var name = req.query.name,
                len = Number(req.query.len),
                tyrant_name = req.body.name; //获取data传入的信息
            console.log(req.body);
            //接受传来参数的长度
            if (len > 68) {
                res.redirect('/');
                return false;
            }
            async.waterfall([
                function(cb) {
                    //检测是否已经存在测试者的姓名;
                    Post.get(name, function(err, doc) {

                        if (err) {
                            res.redirect('/');
                            return false;
                        }

                        if (doc.length !== 0) {
                            cb(err, true); //已经存在
                            return false;
                        }

                        cb(err, false); //如果不存在

                    })
                },
                //返回存在结果
                function(mark, cb) {
                    if (mark) { //检测存在的结果
                        //如果存在,则直接获取tyrants
                        cb(null, true);
                    } else {
                        //如果不存在，存放信息;
                        var post = new Post(name);
                        post.save(name, function(err, mark) {
                            if (err) {
                                res.redirect('/');
                                return false;
                            }
                            cb(null, mark);
                        })
                    }
                },
                //获取tyrants;
                function(mark, cb) {
                    if (mark) {
                        /*
                         * 获得土豪的信息内容
                         */

                        Post.getTyrant(tyrant_name, function(err, data) {
                            //获得单个data                               
                            cb(err, data);
                        })
                    }
                },

            ], function(err, data) {
                //如果存在错误,返回首页
                if (err) {
                    res.redirect('./');
                    return false;
                }
                //返回获得的单个土豪信息;
                res.json(data);
            })
        });
//提醒用户，使用手机端;
    app.route('/redict')
        .get(function(req,res){
            res.render('redict');
        })
    var upload = multer({
        dest: "./upload/",
        rename: function(fileldname, filename) {
            // console.log(filename);
            return filename;
        }
    });
    var destName = '';
    app.post("/upload/img", upload.single('img'), function(req, res) {
        destName = "./img/portrait/" + req.file.originalname;
        fs.renameSync(req.file.path, destName);
        res.send("/img/portrait/" + req.file.originalname);
    })
    app.route('/upload')
        .get(function(req, res) {
            res.render('upload');
        })
        .post(function(req, res) {
            console.log(req.body);
            var tyrant = {
                name: req.body.name,
                title: req.body.title,
                scripts: req.body.scripts,
                src: req.body.src
            }
            if (tyrant.name == null || tyrant.title == null || tyrant.scripts == null || tyrant.src == null) {
                res.redirect('/');
                return;
            }
            console.log(tyrant);
            var post = new Post(tyrant);
            post.saveData(tyrant, function(err, mark) {
                if (err) {
                    res.redirect('/');
                    return false;
                }
                if (mark) {
                    //存储成功!
                   res.json("ok");
                   
                }
            })
          
        })

    // app.route('/upload')
    //     .get(function(req,res){
    //         res.render();
    //     })
    //     .post(function(req,res){
    //        console.log(req.body);
    //        console.log(req.files);

    //     });
    app.route('/**')
        .get(function(req, res) {
            res.redirect('/');
        });

}
