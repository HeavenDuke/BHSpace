/**
 * Created by heavenduke on 9/27/15.
 */
var express = require('express');
var controllers = require('../controllers').story;
var router = express.Router({
    mergeParams: true
});

router.post('/shuffle', controllers.shuffle);
router.get('/', controllers.list);
router.post('/', controllers.create);
router.post('/update/:storyId', controllers.update);
router.post('/upload/:storyId', controllers.upload);
router.post('/rate/:storyId', controllers.rate);
router.get('/random', controllers.random);
router.get('/:storyId', controllers.info);

module.exports = router;