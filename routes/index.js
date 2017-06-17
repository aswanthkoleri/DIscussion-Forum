var express = require('express');
var router = express.Router();
// article
var ArticleProvider = require('../article-provider').ArticleProvider;

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
        tags: req.param('tags')
    }, function( error, docs) {
        res.redirect('/')
    });
});



router.get('/archives',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
		res.render('archives', {isauth:1});
	}
	else
		res.render('archives', {isauth:0});
});

router.get('/blog',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
		res.render('blog', {isauth:1});
	}
	else
		res.render('blog', {isauth:0});
});

router.get('/page',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
		res.render('page', {isauth:1});
	}
	else
		res.render('page', {isauth:0});
});



router.get('/profile',ensureAuthenticated,function(req, res, next){
	 res.render('profile');
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
