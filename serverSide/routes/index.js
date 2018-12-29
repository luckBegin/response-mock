var express = require('express');
var router = express.Router();
var servive = require('./service/project.service') ;
var listServive = require('./service/list.service') ;

/* GET home page. */
router.get('/config', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    var pageSize = req.query.pageSize || 10;
    var pageNumber = req.query.currentPage || 1 ;
    var projectName = req.query.projectName ;
    var enabled = req.query.enabled ;
    servive.get(pageNumber , pageSize , projectName , enabled)
        .then( data => {
          res.send(data)
        })
        .catch( err => res.send(err))

});


router.post("/config" , (req,res,next) => {
    var data = req.body ;
    servive.post(data)
        .then( data => {
            res.send(data) ;
        })
        .catch( err => {
            res.send(err) ;
        });
});

router.put("/config" , (req,res,next) => {
	var data = req.body ;
	servive.put(data)
		.then( data => {
			res.send(data) ;
		})
		.catch( err => {
			res.send(err) ;
		});
});

router.get("/list" , ( req , res , next) => {
	var pageSize = req.query.pageSize || 10;
	var pageNumber = req.query.currentPage || 1 ;
	var projectId = req.query.projectId ;
	listServive.get( pageNumber , pageSize , req.query.method , req.query.url , projectId)
		.then( data => {
			res.send(data)
		})
		.catch( err => res.send(err))
});

router.post("/list" , ( req , res , next ) => {
	var data = req.body ;
	listServive.post(data)
		.then( data => {
			res.send(data);
		})
		.catch( err => {
			res.send(err) ;
		});
});

router.delete("/list/:id" , (req,res,next) => {
	var id = req.params.id ;

	listServive.delete(id)
		.then( data => {
			res.send(data);
		})
		.catch( err => {
			res.send(err) ;
		});
});

router.put("/list" , (req,res,next) => {
	var data = req.body ;

	listServive.put(data)
		.then( data => {
			res.send(data);
		})
		.catch( err => {
			res.send(err) ;
		});
});
module.exports = router;
