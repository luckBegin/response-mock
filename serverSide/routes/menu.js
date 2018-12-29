var express = require('express');
var router = express.Router();
var service = require('./service/menu.service') ;
/* GET home page. */
router.get('/tree', function(req, res, next) {

	service.get()
        .then( data => {
            console.log(data);
			res.send({
				success: true ,
				data : [{
					children: [{
						iconPath: "anticon anticon-bars",
						id: 11,
						isButton : 0 ,
						url : '/project/config',
						menuDescriptions: [{
							description: "项目配置" ,
							locale: "zh_CN",
						}]
					}] ,
					iconPath: "anticon anticon-bars",
					id: 11,
					isButton: 0 ,
					menuDescriptions: [{
						description: "项目管理" ,
						locale: "zh_CN"
					}]
				},{
					children: data.data ,
					iconPath: "anticon anticon-bars",
					id: 11,
					isButton: 0 ,
					menuDescriptions: [{
						description: "项目列表" ,
						locale: "zh_CN"
					}]
				}]
			})
        })
        .catch(err => {
            res.send(err) ;
        })
});

module.exports = router;
