/**
 * Created by heavenduke on 9/27/15.
 */
var express = require('express');
var controllers = require('../controllers').epic;
var router = express.Router({
    mergeParams: true
});

module.exports = router;