var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'Express' });
});

router.get('/archives', function(req, res, next) {
  res.render('archives', { title: 'Express' });
});

router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Express' });
});

router.get('/page', function(req, res, next) {
  res.render('page', { title: 'Express' });
});

router.get('/single', function(req, res, next) {
  res.render('single', { title: 'Express' });
});


module.exports = router;
