var Error = require('../utils/Error');
var Authentication = require('../utils/Authentication');
var express = require('express');
var router = express.Router({
  mergeParams: true
});
var modules = {
  user: require('./user'),
  epic: require('./epic'),
  story: require('./story')
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Seer勘误系统', user: req.session.user});
});

module.exports = router;