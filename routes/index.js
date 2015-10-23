var Error = require('../utils/Error');
var Authentication = require('../utils/Authentication');
var express = require('express');
var router = express.Router({
  mergeParams: true
});

var modules = {
  user: require('./user'),
  story: require('./story')
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({"hello": "world"});
});

router.use('/user', modules.user);
router.use('/story', modules.story);

module.exports = router;