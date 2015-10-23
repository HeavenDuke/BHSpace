/**
 * Created by heavenduke on 9/27/15.
 */
var express = require('express');
var controllers = require('../controllers').user;
var router = express.Router({
    mergeParams: true
});

router.get('/', controllers.info);
router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.post('/logout', controllers.logout);
router.get('/:userId', controllers.info);
router.put('/', controllers.update);

module.exports = router;