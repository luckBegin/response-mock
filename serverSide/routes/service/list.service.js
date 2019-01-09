const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const ListService = {
	get : ( pageNumber , pageSize , method , url , id ) => {

		let _sql = 'select id , url , method  , statusCode , createUser , response , remark , projectId , createTime from request where projectId = ' + id ;
		let _countSql = "select count(id) as count from request where projectId = " + id ;
		let arr = [] ;
		if(method){
			_sql += ' method = ?' ;
			_countSql += " method = " + projectName ;
			arr.push(method) ;
		};

		if(url){
			_sql += " url = ? ";
			_countSql += " url = " + enable ;
			arr.push(enable) ;
		};

		if(arguments.length < 2 )
			_sql += ` limit ${ (pageNumber - 1) * pageSize } , ${ pageSize * pageNumber }` ;

		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(`${_sql}; ${ _countSql } ` , arr , (err ,result) => {
					if(err){
						const data = response(false , null , null , err) ;
						reject(data) ;
					}else{
						const page = {
							pageSize: pageSize ,
							totalNumber: result[1][0].count
						};
						const data = response(true , result[0] , page ) ;
						resolve(data);
					}

					con.end() ;
				});
			});
		}));
	},

	post : (data) => {
		let _sql = 'insert into request(url , method , statusCode , response , projectId , remark) values(?,?,?,?,?,?)' ;
		let arr = [ data.url , data.method , data.statusCode , data.response , data.projectId  , data.remark] ;
		return new Promise( ((resolve, reject) => {
			mysql(con => {
				con.query("select count(id) as count from request where url = ? and method = ?" , [data.url , data.method] , (err , res) =>{
					if(err){
						reject( response(false , '' , '' , err)) ;
						return ;
					};

					if(res[0] && res[0]['count'] <= 0){
						con.query(_sql , arr , ( err2 , result ) => {
							if(err2){
								reject( response(false , '' , '' , err2)) ;
							}else{
								resolve( response(true , '' , '' ,'' )) ;
							};
							con.end() ;
						});
					}else{
						reject( response(false , '' , '' , "该数据已存在")) ;
						con.end() ;
					}
				});

			});
		}));
	},

	delete : ( id ) => {
		let _sql = 'delete from request where id = ?' ;

		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(_sql , [id] , ( err ,result ) => {
					if(err){
						reject( response(false , '' , '' , err)) ;
					}else{
						resolve( response(true , '' , '' ,'' )) ;
					};
					con.end() ;
				});
			});
		}));
	},
	put: (data)  => {
		let _sql = 'update request set ' ;
		let arr = [] ;
		if(data.url){
			_sql += " url = ? ," ;
			arr.push(data.url) ;
		};

		if(data.method){
			_sql += ' method = ? , ' ;
			arr.push(data.method) ;
		};

		if(data.statusCode){
			_sql += ' statusCode = ? ,' ;
			arr.push(data.statusCode) ;
		};

		if(data.response){
			_sql += ' response = ? ,' ;
			arr.push(data.response) ;
		};

		if(data.remark){
			_sql += ' remark = ?' ;
			arr.push(data.remark) ;
		};

		_sql += ' where id = ' + data.id ;

		return new Promise( ( (resolve, reject) => {
			mysql( con => {
				con.query(_sql , arr , (err ,result) => {
					if(err){
						reject( response(false , '' , '' , err)) ;
					}else{
						resolve( response(true , '' , '' ,'' )) ;
					};
					con.end() ;
				});
			});
		}));
	}
};
module.exports = ListService ;