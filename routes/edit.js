var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:title',function(req,res,next){
	var models =require('../models/');

	var title = req.params.title;
	
	models.Page.findOne({title: title}, function(error, data){
		console.log(data.tags);
		res.render('add_page', { doc: data, tags: data.tags.join(' '), button_title: 'EDIT'  });
	});

})


router.post('/submit',function(req,res,next){
	var models =require('../models/');

	var title = req.body.pageTitle;
	var content = req.body.pageText;
	var tags = req.body.pageTags.toLowerCase().split(" ");
	var oldTitle = req.body.oldTitle;

		
 
	function nameCheck(pageTitle){
		return pageTitle.replace(" ","_").replace(/\W/g,"");
	} 

	function pageNameGenerator(){
		 var pageNameLength = Math.round((Math.random()*8)+8)
	 var pageName = '';
	 for(var i=0; i<pageNameLength ;i++){
	     var randChar = Math.round((Math.random()*74)+48);
	     pageName += String.fromCharCode(randChar);
	 }
	 return pageName;
	}

	var url_name = nameCheck(req.body.pageTitle) || nameCheck(pageNameGenerator());

	models.Page.update({title: oldTitle},{ $set: {
		'title': title,
		'content':content,
		'url_name': url_name,
		'tags': tags
	}}, function(error){
		res.status(201).redirect('/');
	});
})

module.exports = router;
