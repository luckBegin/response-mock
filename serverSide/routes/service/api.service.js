const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const APIService = {
	query : ( url , id , method ) => {
		let urlArr = url.match(/\/\w+/g) ;
		let _arr = urlArr.filter( ( item , index ) =>  index < urlArr.length - 1 ) ;
		let _url = '' ;
		_arr.forEach( item =>  _url += item ) ;

		const _sql = `select id , url , method  , statusCode , createUser , response , remark , projectId , createTime from request where url regexp '^${_url}'` ;

		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(_sql , ( err, result ) => {
					if(err){
						reject({
							success : false ,
							code :400 ,
							message :err ,
							data : "" ,
						})
					}else{
						if(result.length === 0){
							reject({
								success : false ,
								code :400 ,
								message :"该接口不存在" ,
								data : "" ,
							})
						}else{
							let item = result.filter( item => item.url.match(/\/[\w|?]+/g).length === urlArr.length )[0] ;
							if(item){
								resolve({
									success : true ,
									code : 200 ,
									message : "" ,
									data : JSON.parse(item.response)
								});
							}else{
								reject({
									success : false ,
									code :400 ,
									message :"该接口不存在" ,
									data : "" ,
								});
							};
						};
					};
				});
			});
		}));
	}
};
module.exports = APIService ;