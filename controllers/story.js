/**
 * Created by heavenduke on 10/23/15.
 */
var Error = require('../utils/Error');

exports.shuffle = function (req, res, next) {
    res.json({"url": req.originalUrl});
};

exports.list = function (req, res, next) {
    res.json({"url": req.originalUrl});};

exports.create = function (req ,res, next) {
    res.json({"url": req.originalUrl});
};

exports.update = function (req, res, next) {
    var Story = global.db.models.story;
    var query = {
        storyId: req.params.storyId
    };
};

exports.upload = function (req, res, next) {
    var Story = global.db.models.story;
    var query = {
        storyId: req.params.storyId
    };
};

exports.info = function (req, res, next) {
    var Story = global.db.models.story;
    var query = {
        storyId: req.params.storyId
    };
    Story.findOne({where: query}).then(function (story) {
        if (!story) {
            return next(new Error.Error.StoryNotExist());
        }
        else{
            story.getUser().then(function (user) {
                if(story.status == 'modifying' && user.userId != req.session.user.userId) {
                    return next(new Error.Error.IllegalStoryAccess());
                }
                else {
                    res.json({
                        status: 200,
                        story: {
                            title: story.title,
                            content: story.content,
                            created_at: story.createdAt,
                            creator: {
                                userId: user.userId,
                                username: user.username
                            }
                        }
                    });
                }
            });
        }
    });
};

exports.previous = function (req, res, next) {
    console.log('previous');
    res.json({"url": req.originalUrl});
};

exports.next = function (req, res, next) {
    console.log('next');
    res.json({"url": req.originalUrl});
};

exports.random = function (req, res, next) {
    console.log('random');
    res.json({"url": req.originalUrl});
};

exports.rate = function (req, res, next) {
    var Story = global.db.models.story;
    var Rate = global.db.models.rate;
    var query = {
        storyId: req.params.storyId
    };
    var rateQuery = {
        userId: req.session.user.userId
    };
    var rating = {
        rating: req.body.rating
    };
    Story.findONe({where: query}).then(function (story) {
        if (!story) {
            return next(new Error.Error.StoryNotExist());
        }
        else {
            Story.getRaters({where: rateQuery}).then(function (raters) {
                res.json({
                    status: 200,
                    raters: raters
                });
            });
        }
    });
}