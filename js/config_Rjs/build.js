({ 



baseUrl: '../lib',   //相对于appDir，代表要查找js文件的起始文件夹，下文所有文件路径的定义都是基于这个baseUrl的

dir:"../abc",
name:"../main",

optimizeCss: 'standard', 

removeCombined: false,   //如果为true，将从输出目录中删除已合并的文件

paths: {    //相对baseUrl的路径
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
}) 