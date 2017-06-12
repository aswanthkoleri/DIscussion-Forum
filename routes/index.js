var express = require('express');
var router = express.Router();



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
		res.render('index', {isauth:1});
	}
	else
		res.render('index', {isauth:0});
  
});
router.get('/demo',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
		res.render('demo', {isauth:1});
	}
	else
		res.render('demo', {isauth:0});
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

router.get('/single',ensureAuthenticated, function(req, res, next) {
  if(req.isAuthenticated()){
		res.render('single', {isauth:1});
	}
	else
		res.render('single', {isauth:0});
});

router.get('/profile',ensureAuthenticated,function(req, res, next){
	 res.render('profile');
});


module.exports = router;
