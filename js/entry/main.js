require.config({　　
    baseUrl: "js/lib",
    paths: {　　　　　　
        "jquery": "jquery.min", //都不加后缀.js
        'zepto': 'zepto',
        'zepto-custom': 'zepto-custom',
        'async': 'async.min',
        'los': "localStorage", //加载localStorage文件,使数据存储在本地
        "underscore": "underscore.min",
        "backbone": "backbone",
        'focus': "../entry/modules/input-focus",
        'deferred': 'deferred',
        'touch': 'touch',
        'event':"event",
        'callbacks': 'callbacks',
        'utils': "../entry/modules/utils",
        'textFormat':"../entry/modules/textFormat"
    },
    map: {
        '*': {
            'zepto': 'zepto-custom'
        },
        'zepto-custom': {
            'zepto': 'zepto'
        }
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'zepto'],
            exports: 'Backbone'
        },
        'zepto': {
            exports: '$'
        },
        'deferred': {
            exports: '$',
            deps: ['zepto']
        },
        "event":{
            exports: '$',
            deps: ['zepto']
        },
        'touch': {
            exports: '$',
            deps: ['zepto']
        },
        'callbacks': {
            exports: '$',
            deps: ['zepto']
        }
    }
});
require(['underscore', 'zepto', 'backbone', 'async', 'focus','event', 'deferred', 'callbacks', 'touch', 'utils','textFormat'], function(_, $, Backbone, async) {　　
    Pathurl = {
        getTyrant: '/getTyrant'
    };　
    function textWidth(text) {        
         var sensor = $('<pre>'+ text +'</pre>').css({display: 'inline'});   //因为pre标签,可以保留空格和换行符,
        $('body').append(sensor); 
        var width = sensor.width();        
        sensor.remove(); 
        return width;
    };
    //创建对应的变量

    var Participants = Backbone.Model.extend({
        default: {
            name: '',
            tyrant: [] //包含属性: name:'',content:'xxxxxx<name>xxxx'   name是测试人的名字
        },
        /*
         * 检测tyrant是否含有一样的数据
         */
        detechOver: function(obj) {
            var mark = false;
            this.tyrant.forEach(function(val, index) {
                if (val.name === obj.name) {
                    mark = false;
                    return;
                } else mark = true;
            })
            return mark;
        },
        setName: function(name) {
            this.set({
                name: name
            });
        },
        getTyrant: function() {
            return this.get('tyrant');
        },
        addTyrant: function(data) {
            var tyrant = this.get('tyrant'),
                len = tyrant.length,
                obj = {
                    name: data.name,
                    title: data.title,
                    scripts: data.scripts,
                    src:data.src
                };
            if (len === 4) {
                tyrant.shift();
            }
            tyrant.push(obj);

        },
        /*
         * 解析后台传回来的tyrant的信息;
         */
        parseScript: function(name, script) {
            script = script.replace("<name>", this.name); //替换tyrant里面的值
            var obj = {
                name: name,
                script: script
            };
            if (this.detechOver()) {
                this.tyrant.push(obj);
            }
        }
    })　
    var IndexView = Backbone.View.extend({
        el: $('.i-index'),
        info: $('.i-index #i-prompt'),
        confirm_btn: $('#i-confirm-btn'), //确认提交按钮
        events: {
            'keyup #i-testname': 'limitLength',
            'tap #i-confirm-btn': 'jumpTo'
        },
        render: function() {
            var _this = this;
            this.$el.show();
            $('body').addClass('i-index-show');
            this.$el.find('.i-testname').inputFocus("输入测试姓名");           
            setTimeout(function() {
                _this.setAnimation();
            }, 10);
        },
        promptShow: function() {
            this.info.text("您输入的字符过长,请重新输入~");
        },
        promptHide: function() {
            this.info.text("");
        },
        hide: function() {
            this.$el.hide();
        },
        limitLength: function(e) {
            var text = this.$el.find('#i-testname').val(),
                len = textWidth(text),
                event = e,
                _this = this;                
            if (text === "输入测试姓名") {
                _this.info.text("姓名不能为空~");
                return false
            }
            
            if (len > 61) {
                //超出输入的长度，做出提示                                           
                _this.promptShow();
                return false;
            } else {
                _this.promptHide();
                par.setName(text);
                return true;
            }

        },
        setAnimation: function() {
            var ele = this.$el.find('.logo-mayun,.logo-liuQD,.logo-liJC,.logo-Bill,.logo-wangSC,.i-words,.words-right,.words-left,.words-rich,.logo-building1,.logo-building2,.logo-building3');
            ele.addClass('now');
            setTimeout(function(){$('body').addClass('now');},2000)  
        },
        isValidate: function(sign) {
            return sign;
        },
        jumpTo: function() {
            if (this.limitLength()) {
                router.navigate("/test", {
                    trigger: true,
                    replace: true
                });
            }
        }
    });

    var LoadingView = Backbone.View.extend({
        el: $('.l-loading'),
        decade: $('.l-loading #l-decade'),
        bit: $('.l-loading #l-bits'),
        initialize: function() {
            this.render();
        },
        hide: function() {
            this.$el.hide();
        },
        render: function() {
            var imgs = ['img/index/confirm.png',
                'img/author.png',
                'img/coin.png',
                'img/index/thigh.png',
                'img/test/test-s4cdb85fdf3.png',
                'img/index/logo/mayun.png',
                'img/index/logo/liuQD.png',
                'img/index/logo/liJC.png',
                'img/index/logo/Bill.png',
                'img/index/logo/wangSC.png',
                'img/index/logo/building1.png',
                'img/index/logo/building2.png',
                'img/index/logo/building3.png',
                'img/index/confirm.png',
                'img/index/thigh.png',
                'img/index/logo/title.png',
                'img/test/others.png',
                'img/test/follow.png'
            ]; //设置图片路径
            this.preload(imgs);
        },
        setNum: function(num) {
            var num = Math.floor(num),
                bit, decade,
                _this = this;
            if (num === 100) {
                bit = decade = 9;
            } else {
                bit = num % 10; //获取各位数
                decade = Math.floor(num / 10); //获取十位数
            }
            _this.bit.removeClass().addClass('num-' + bit);
            setTimeout(function() {
                _this.decade.removeClass().addClass('num-' + decade);
            }, 200);
        },
        preload: function(imgs) {
            var len = imgs.length,
                mark = 0,
                arr = new Array(),
                _this = this;
            for (i = 0; i < len; i++) { //这里调用传入的参数
                arr[i] = new Image()
                arr[i].onload = function() {
                    mark++;
                    async.series([ //串行执行代码
                        function(cb) {
                            if (mark <= len) {
                                var num = Number(mark / len).toFixed(4) * 100;
                                $('.l-cover').width(num + '%');
                                _this.setNum(num);
                            }
                            cb();
                        }
                    ], function() {
                        if (mark === len) {
                            setTimeout(function() {
                                _this.hide();
                                index.render();
                                _this.isFinish(true);
                            }, 1000);
                        }
                    });

                }
                arr[i].src = imgs[i];
            }
        },
        isFinish: function(sign) {
            if (sign === null || sign == '') {
                return false
            } else return sign;
        }
    });
    var TestView = Backbone.View.extend({
        el: $('#t-test'),
        figure: $('#t-figure'), //头像
        name: $('#t-name'), //姓名
        title: $('#t-title'), //标题
        scripts: $('#t-scripts'), //脚本
        trans: $('.t-transition,#test-first,#test-second,#t-message,.t-layer'),  
        music:$('#loading'),     
        events: {
            'tap #t-again-btn': 'testAgain',
            'tap #t-produce-btn': 'obtainResult'
        },
        render: function() {
            var name = par.get('name');
            this.name.text(name);
            this.sendAjax();
            this.$el.show();
        },
        changeInfo: function(data) {
            this.title.text(data.title);
            this.scripts.text(data.scripts);
            var src = data.src.replace('.png',"1.png");
            this.figure.attr('src', src);
            par.addTyrant(data); //存储获得的tyrant;    
        },
        ajax: function(url, opts) {
            sendAjax(url, opts);
        },
        /*
         * 发送获取土豪信息
         */
        sendAjax: function() {
            var _this = this,
                name = par.get('name'),
                len = textWidth(name),
                tyrant = par.getTyrant(), //获取土豪信息
                mark = false,
                tyrant_name = tyrant.map(function(val) { //生成已经获得的土豪信息
                    return val.name; //返回姓名组成的数组
                }),
                url = Pathurl.getTyrant + "?name=" + name + "&len=" + len;
            _this.ajax(url, {
                method: "post",
                data: {
                    "name": tyrant_name
                },
                contentType: "application/json",
                success: function(data) {
                    _this.changeInfo(JSON.parse(data));
                },
                error: function(data) {
                    var con = confirm("网络问题~~需要刷新吗?");
                    if (con) {
                        window.location.href = "/";
                    }
                }

            });
            // $.post(url, {
            //     "name": []
            // }, function(res) {
            //     console.log(res);
            // }, "json");
            // $.ajax({
            //     url:url,
            //     type:'post',
            //     data:{

            //     },
            //     dataType:"JSON",
            //     success:function(data){
            //         console.log("success");
            //     },
            //     error:function(xhr,type){
            //         console.log('fail');
            //     }
            // })
        },
        hide: function() {
            this.$el.hide();
        },
        showTran: function() {
            this.trans.addClass('now');
        },
        hideTran: function() {
            this.trans.removeClass('now');
        },
        testAgain: function() {
            var _this = this,
                audio =  _this.music[0];
            _this.showTran();
            _this.sendAjax();
            if(!!(document.createElement('video').canPlayType)){
                if (audio.readyState == 4) {  // android会走此逻辑
                    audio.play(); 
                } else {    // iOS走此逻辑
                    audio.addEventListener("canplaythrough", function() {
                        // @todo
                    }, false);
                    audio.load();    // 需要主动触发下，不然不会加载
                    audio.play();  
                }
                  
            }
            setTimeout(function() {
                _this.hideTran();
            }, 3000);
        },
        obtainResult: function() {
            router.navigate("/result", {
                trigger: true,
                replace: true
            });
        }
    });
    var ResultView = Backbone.View.extend({
        el: $('.r-result'),
        first: $('.r-first,g.r-first'),
        first_text: $('.r-first-text').find('span'),
        first_img: $('.r-first').find('.figure'),
        second: $('.r-second,g.r-second'),
        second_text: $('.r-second-text').find('span'),
        second_img: $('.r-second').find('.figure'),
        third: $('.r-third,g.r-third'),
        third_text: $('.r-third-text').find('span'),
        third_img: $('.r-third').find('.figure'),
        fourth: $('.r-fourth,g.r-fourth'),
        fourth_text: $('.r-fourth-text').find('span'),
        fourth_img: $('.r-fourth').find('.figure'),
        result_name:$('#r-name'),
        events: {
            'tap #r-again-btn': 'backIndex'
        },
        render: function() {
            this.$el.show();
            this.fillName(); //填入姓名
            this.showTyrant();  //显示相关土豪信息
        },
        backIndex: function() {
           window.location.href="/";
        },
        shuffle: function(array) { //乱序算法
            var m = array.length,
                t, i;
            // 如果还剩有元素…
            while (m) {
                // 随机选取一个元素…
                i = Math.floor(Math.random() * m--); //随机抽取除前面抽取的牌,
                //与当前最后的元素(不包括以及抽取的元素).交换元素
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;

        },
        fillName:function(){            
            this.result_name.text(par.get('name'));

        },
        showTyrant: function() {
            var tyrant = this.shuffle(par.getTyrant()),
                _this = this,                
                len = tyrant.length;
            switch (len) {
                case 1:
                    _this.fillInfo(tyrant[0], 1);
                    break;
                case 2:
                    _this.fillInfo(tyrant[0], 1);
                    _this.fillInfo(tyrant[1], 4);
                    break;
                case 3:
                    _this.fillInfo(tyrant[0], 1);
                    _this.fillInfo(tyrant[1], 4);
                    _this.fillInfo(tyrant[2], 3);
                    break;
                case 4:
                    _this.fillInfo(tyrant[0], 1);
                    _this.fillInfo(tyrant[1], 4);
                    _this.fillInfo(tyrant[2], 3);
                    _this.fillInfo(tyrant[3], 2);
                    break;
            }

        },
        fillInfo: function(tyrant, order) {
            var _this = this,
                text, img, $ele;
            switch (order) {
                case 1:
                    text = _this.first_text;
                    img = _this.first_img;
                    $ele = _this.first;
                    break;
                case 2:
                    text = _this.second_text;
                    img = _this.second_img;
                    $ele = _this.second;
                    break;
                case 3:
                    text = _this.third_text;
                    img = _this.third_img;
                    $ele = _this.third;
                    break;
                case 4:
                    text = _this.fourth_text;
                    img = _this.fourth_img;
                    $ele = _this.fourth;
                    break;
            }
            console.info(tyrant.scripts+ order);
            console.log(new textFormat(tyrant.scripts,order).content)
            text.html(new textFormat(tyrant.scripts,order).content);    //处理输入的Content
            img.attr('src', tyrant.src);

            setTimeout(function() {
                $ele.each(function(){                    
                    this.classList.add('now');
                })                
            }, 1000);
        },
        hide: function() {
            this.$el.hide();
        }
    });

    var Router = Backbone.Router.extend({
        routes: {
            '': 'loading',
            'test': 'test',
            'result': 'obtainResult'
        },
        loading: function() {
            if (loading.isFinish()) {
                loading.hide();
                index.render();
            } else {
                loading.render();
            }
        },
        test: function() {
            test.render();
            index.hide();
        },
        obtainResult: function() {
            result.render();
            test.hide();
        }
    })
    var router = new Router,
        loading = new LoadingView, //加载页面
        index = new IndexView, //主页
        test = new TestView, //测试页面
        result = new ResultView, //结果页面
        par = new Participants({
            tyrant: [],
            name: ''
        }); //创建一个测试用例
    Backbone.history.start({
        pushState: true
    });
});
