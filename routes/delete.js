var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	var models =require('../models/');

	var deleteTitle = req.body.deleteTitle;
	console.log(deleteTitle);
	models.Page.remove({title: deleteTitle}, function(error){
		res.redirect('/');

	});
})


module.exports = router;
