var express = require('express');
var router = express.Router();
var models = require('../models/');


/* GET home page. */
router.get('/', function(req, res, next) {
	models.Page.find(function(err, data){
		res.render('index', { docs: data });
	});
});


router.get('/wiki/:title', function(req, res, next){
	var title = req.params.title;

	models.Page.findOne({ url_name: title }, function(err, data){
		var similarTags = data.tags;
		var currentPage = data;

		models.Page.findSimilar(similarTags,currentPage.title,function(err,data){
			res.render('show', {
				doc: currentPage, 
				tags: similarTags,
				docs: data, 
				searchedTags: similarTags.join(", ")
			});
	})
	});


})


module.exports = router;
