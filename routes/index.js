var express = require('express');
var router = express.Router();
var truncate = require('html-truncate');
var paginate = require('mongoose-paginate');
// article
var ArticleProvider = require('../article-provider').ArticleProvider;
var User = require('../models/user');
//article
var articleProvider = new ArticleProvider('localhost', 27017);
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}



/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		articleProvider.findAll( function(error,docs){
        res.render('index', { isauth:1,articles:docs});
    })
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('index', { isauth:0,articles:docs});
    })
		}
	
  
});

router.get('/posts/:id?', function(req, res, next) {
	if(req.isAuthenticated()){
		articleProvider.findAll( function(error,docs){
        res.render('tagsindex', { isauth:1,articles:docs,tag:req.param('id')});
    })
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('tagsindex', { isauth:0,articles:docs,tag:req.param('id')});
    })
		}
	
  
});

router.get('/newpost',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
  	    articleProvider.findAll( function(error,docs){
        res.render('newpost', { isauth:1,articles:docs});
    })
		
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('newpost', { isauth:0,articles:docs});
    })
		}
});
router.post('/newpost', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body'),
        truncbody : truncate(req.param('body'),300),
        tags: req.param('tags'),
        user: req.param('user')
    }, function( error, docs) {
        res.redirect('/')
    });
});


router.get('/profile',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
  	    articleProvider.findAll( function(error,docs){
        res.render('profile', { isauth:1,articles:docs});
    })
		
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('profile', { isauth:0,articles:docs});
    })
		}
});

router.get('/page',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
  	    articleProvider.findAll( function(error,docs){
        res.render('page', { isauth:1,articles:docs});
    })
		
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('page', { isauth:0,articles:docs});
    })
		}
});


router.get('/blog',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
  	    articleProvider.findAll( function(error,docs){
        res.render('blog', { isauth:1,articles:docs});
    })
		
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('blog', { isauth:0,articles:docs});
    })
		}
});


router.get('/archives',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
  	    articleProvider.findAll( function(error,docs){
        res.render('archives', { isauth:1,articles:docs});
    })
		
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('archives', { isauth:0,articles:docs});
    })
		}
});


router.get('/:id?', function(req, res) {
    if(req.isAuthenticated()){
		articleProvider.findAll( function(error,docs){
        res.render('single', { isauth:1,articles:docs,id:req.params.id});
    })
	}
	else
		{
			articleProvider.findAll( function(error,docs){
        res.render('single', { isauth:0,articles:docs,id:req.params.id});
    })
		}
});


router.post('/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/' + req.param('_id'))
       });
});


module.exports = router;
