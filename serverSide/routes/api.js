var service = require('./service/api.service') ;
/* GET home page. */

const  handler = function(req , res ) {
	var method = req.method ;
	var projectId = req.headers.projectId ;
	var url = req.url ;
	// if(/\d+/g.test(projectId)){
		service.query(url , 3 , method )
			.then( data => {
				res.header("Content-Type", "application/json");
				res.send(data) ;
			})
			.catch( err => {
				res.status(400) ;
				res.send( err ) ;
			})
	// }else{
	// 	res.status(400) ;
	// 	res.send({
	// 		success : false ,
	// 		code : 400 ,
	// 		message : "请求头中的projectId不合法",
	// 		data : ""
	// 	});
	// };
};

module.exports = handler;
