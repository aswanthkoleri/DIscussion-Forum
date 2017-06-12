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
  res.render('demo', { title: 'Express' });
});

router.get('/archives',ensureAuthenticated, function(req, res, next) {
  res.render('archives', { title: 'Express' });
});

router.get('/blog',ensureAuthenticated, function(req, res, next) {
  res.render('blog', { title: 'Express' });
});

router.get('/page',ensureAuthenticated, function(req, res, next) {
  res.render('page', { title: 'Express' });
});

router.get('/single',ensureAuthenticated, function(req, res, next) {
  res.render('single', { title: 'Express' });
});


module.exports = router;
