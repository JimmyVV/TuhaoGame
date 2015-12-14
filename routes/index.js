var express = require('express');
router = express.Router(),
    Post = require('../models/post'),
    async = require('async'),
    multer = require('multer'),
    fs = require('fs'),
    utils = require('utility');

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
            //接受传来参数的长度
            if (len > 68) {
                res.redirect('/');
                return false;
            }
            async.waterfall([
                function( cb) {
                    //如果存在,则不inserrt，如果不存在则insert;
                        Post.save(utils.md5(name), function(err, mark) {
                            
                            if (err) {
                                res.redirect('/');
                                return false;
                            }
                            cb(null, mark);
                        })
                    // }
                },
                //获取tyrants;
                function(mark, cb) {
                    if (mark) {
                        /*
                         * 获得土豪的信息内容
                         */
                        Post.getTyrant(tyrant_name, function(err, data) {
                            //获得单个土豪信息                              
                            cb(err, data);
                        })
                    }
                },
                function(data, cb) {
                    //解析土豪信息的基本格式
                    Post.saveUser(utils.md5(name), data, function(err) {
                        cb(err, data);
                    })

                }

            ], function(err, data) {
                //如果存在错误,返回首页
                
                if (!err) {
                    res.redirect('./');
                    return false;
                }
                //返回获得的单个土豪信息;
                res.json(data);
            })
        });
    //提醒用户，使用手机端;
    app.route('/redict')
        .get(function(req, res) {
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
    // app.route('/getName')
    //     .post(function(req, res) {
    //         var data = "";
    //         req.setEncoding('utf-8');
    //         var name = utils.md5(req.body.name); //获取用户的数据H
    //         Post.save(name, (err, mark) => {
    //             if (mark) {
    //                 res.json({
    //                     name: name
    //                 });
    //             } else {
    //                 res.json(false);
    //             }
    //         });

    //     })
    app.route('/result')
        .get(function(req, res) {
            var name = req.query.name;
            res.render( "result",{name:name});
        })
    app.route('/getResult')
        .get(function(req,res){
             var name = utils.md5(req.query.name);
            Post.fetchTyrant(name, function(mark, arr) {
                //获得相应的土豪信息,还要进行发送请求进行遍历。
                if (mark) {
                    res.json(arr);
                } else {
                    res.redirect('/');
                }
            })
        })
    app.route('/**')
        .get(function(req, res) {
            res.redirect('/');
        });

}
