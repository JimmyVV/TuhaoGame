var mongodb = require('./database'),
	async = require('async'),
	assert = require('assert');
function Post(name) {
  this.name = name;
}
module.exports = Post;
//存储测试者姓名
Post.prototype.save = function(name,callback) {
	var user = {  //设置用户姓名
		name:this.name
	}
   async.waterfall([
   	function(cb){  //打开数据库
   		mongodb.open(function(err,db){
            cb(err,db);
         });
   	},
   	function(db,cb){  //打开col
   		db.collection('user',function(err,col){
            cb(err,col)
         });
   	},
   	function(col,cb){  //处理doc
   		col.insert(user,function(err){
            cb(err,true);
         })
   	},
   	],function(err,mark){
   		mongodb.close();
   		callback(err,mark);
   	});
};
//检测是否存在测试者姓名;
Post.get=function(name,callback){
	async.waterfall([
		function(cb){
			mongodb.open(function(err,db){
				cb(err,db);
			});
		},
		function(db,cb){
			db.collection('user',function(err,col){
				cb(err,col);
			})
		},
		function(col,cb){
			//查找对应的测试者
			col.find({name:name}).toArray(function(err,doc){
				//检测是否存在,并返回测试结果;
				cb(err,doc);
			})
		}
	],function(err,doc){
		callback(err,doc);
	})
}
//获得土豪信息
Post.getTyrant = function(name,callback){
	 async.waterfall([
   	function(cb){  //打开数据库
   		mongodb.open(function(err,db){
            cb(err,db)
         });
   	},
   	function(db,cb){  //打开col
   		db.collection('posts',function(err,col){
            cb(err,col)
         });
   	},
      function(col,cb){
         col.count({name:{$nin:name}}).then(function(count){            
              var ran = Math.floor(count*Math.random());
               col.find({name:{$nin:name}}).skip(ran).limit(1)
               .toArray().then(function(docs){
                  console.log(docs[0]);
                  cb(null,docs[0]);
               })
         });
      }  
   	],function(err,data){         
   		mongodb.close();          
   		callback(err,data);
   	});
}

