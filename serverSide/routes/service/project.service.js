const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const ProjectService = {
	get : ( pageNumber , pageSize , projectName , enable ) => {

		let _sql = 'select id , projectName , remark  , enable , createTime from project' ;
		let _countSql = "select count(id) as count from project" ;
		let arr = [] ;

		if(projectName || enable){
			_sql += " where " ;
			_countSql += ' where ' ;
		};

		if(projectName){
			_sql += ' projectName = ?' ;
			_countSql += " projectName = " + projectName ;
			arr.push(projectName) ;
		};

		if(enable){
			_sql += " enable = ? ";
			_countSql += " enable = " + enable ;
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
						resolve(data)
					}
				});
			});
		}));
	},

	put : ( data ) => {
		return new Promise( ((resolve, reject) => {
			let _sql = 'update project set ' ;
			const  arr = [] ;
			if(data.enable === 0 || data.enable === 1){
				_sql += " enable = ? ";
				arr.push(data.enable) ;
			};

			if( data.projectName ){
				_sql += ' , projectName = ? ' ;
				arr.push(data.projectName) ;
			};

			if(data.remark){
				_sql += " , remark = ?" ;
				arr.push(data.remark) ;
			};

			_sql += ' where id =' + data.id ;

			mysql( con => {
				console.log(_sql) ;
				console.log(arr) ;
				con.query(_sql , arr , ( err ,result ) => {
					if(err)
						reject( response(false , err , '' , '' )) ;
					else
						resolve( response(true , "" , "" ,"" )) ;
				});
			})
		}));
	},

	delete : ( id ) => {

	},

	post : ( data ) => {
		return new Promise( ( (resolve, reject) =>  {
			const _sql = `insert into project(projectName , remark , enable) values(? , ? ,?)` ;

			mysql( con => {
				con.query(_sql , [data.projectName , data.remark , parseInt(data.enable) ] , ( err ,result ) => {
					if(err)
						reject( response(false ,'', '' , err ));
					else
						resolve( response(true , ''  , '' , '' )) ;
				});
			})
		}));
	}
}
module.exports = ProjectService ;