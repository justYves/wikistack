var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req,res,next){
	res.render('add_page',{title: 'WikiStack'})
})

router.post('/submit',function(req,res,next){
	var models =require('../models/');

	var title = req.body.pageTitle;
	var content = req.body.pageText;
	
	
 
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

	var page = new models.Page({
		'title': title,
		'content':content,
		'url_name': url_name
	})
	page.save();
	res.status(201).redirect('/');

	// res.send("title: " + title + ";\n " + 'content: ' +content + ";\n" + "url: " + url_name);
})

module.exports = router;
