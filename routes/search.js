var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req,res,next){
	res.render('search_page',{title: 'WikiStack'})
})

router.post('/submit',function(req,res,next){
	var models =require('../models/');
	var tags = req.body.pageTags.toLowerCase().split(" ");
	console.log(tags);
	models.Page.findByTag(tags,function(err,data){
		console.log(data);
		res.render('index', {docs: data, searchedTags: tags.join(", ")});
	})
})


router.get('/tag/:tag',function(req,res,next){
	var pageTags = req.params.tag;
	var models =require('../models/');
		var tags = pageTags.toLowerCase().split(" ");
		// console.log(tags);
		models.Page.findByTag(tags,function(err,data){
			console.log(data);
			res.render('index', {docs: data, searchedTags: tags.join(", ")});
	})
})

module.exports = router;
