/**
 * Created by heavenduke on 9/27/15.
 */
var express = require('express');
var controllers = require('../controllers').user;
var Authentication = require('../utils/Authentication');
var router = express.Router({
    mergeParams: true
});

router.get('/', Authentication.authentication, controllers.info);
router.post('/login', Authentication.unAuthentication, controllers.login);
router.post('/register', Authentication.unAuthentication, controllers.register);
router.post('/logout', Authentication.authentication, controllers.logout);
router.get('/:userId', controllers.info);
router.post('/', controllers.update);

module.exports = router;