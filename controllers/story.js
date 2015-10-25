/**
 * Created by heavenduke on 10/23/15.
 */
var Error = require('../utils/Error');

exports.shuffle = function (req, res, next) {
    res.json({"url": req.originalUrl});
};

exports.list = function (req, res, next) {
    res.json({"url": req.originalUrl});};

/**
 * 创建一个故事片段
 * 可以标明故事时接续什么的，也可以不标明，不标明则认定为从头开始
 */
exports.create = function (req ,res, next) {
    var Story = global.db.models.story;
    var query = {
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.userId
    };
    if(req.body.status == 'accepted') {
        query.status = 'acceoted';
    }
    if (req.body.parentId) {
        var queryParent = {
            storyId: req.body.parentId
        };
        Story.findOne({where: queryParent}).then(function (parent) {
            if (!parent) {
                return next(new Error.Error.StoryNotExist('您正在为一段不存在的故事撰写序章'));
            }
            else {
                query.parentId = parent.storyId;
                Story.create(query).then(function (story) {
                    res.json({
                        status: 200,
                        storyId: story.storyId
                    });
                });
            }
        });
    }
    else {
        Story.create(query).then(function (story) {
            res.json({
                status: 200,
                storyId: story.storyId
            });
        });
    }
};

/**
 * 更新一个故事
 * 暂时仅仅允许更新故事的标题与故事的内容
 */
exports.update = function (req, res, next) {
    var Story = global.db.models.story;
    var query = {
        storyId: req.params.storyId
    };
    Story.findOne({where: query}).then(function (story) {
        if(!story) {
            return next(new Error.Error.StoryNotExist());
        }
        else if (story.status != 'modifying') {
            return next(new Error.Error.IllegalStoryAccess('该故事片段已提交，不可修改'));
        }
        else{
            if(req.body.title) story.title = req.body.title;
            if(req.body.content) story.title = req.body.content;
            story.save().then(function (story) {
                res.json({
                    status: 200,
                    storyId: story.storyId
                });
            });
        }
    });
};

exports.upload = function (req, res, next) {
    var Story = global.db.models.story;
    var query = {
        storyId: req.params.storyId
    };
    Story.findOne({where: query}).then(function (story) {
        if(!story) {
            return next(new Error.Error.StoryNotExist());
        }
        else if (story.status != 'modifying') {
            return next(new Error.Error.IllegalStoryAccess('该故事片段已提交'));
        }
        else{
            story.status = 'accepted';
            story.save().then(function (story) {
                res.json({
                    status: 200,
                    storyId: story.storyId
                });
            });
        }
    });
};

/**
 * 根据ID获取一段故事
 * 上传storyId,返回Story
 * 具体数据结构参见API文档
 * 已完成测试
 */
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
            getStory(req, res, story);
        }
    });
};

/**
 * 随机搜索一段故事
 * 已经完成测试
 * 三种模式
 * 第一种：随机搜索一个开头 type=initial
 * 第二种，随机搜索某个故事后续的故事 type=next 并且必须包含parentId
 * 第三种：随机搜索某个中间篇章，type=middle
 */
exports.random = function (req, res, next) {
    var Story = global.db.models.story;
    var query = {};
    var randomSelect = function (query) {
        Story.findAll({where: query}).then(function (stories) {
            if (stories.length == 0) {
                return next(new Error.Error.StoryNotExist('未能成功找到您想要寻找的故事'));
            }
            else {
                var story = stories[Math.floor(Math.random() * stories.length)];
                getStory(req, res, story);
            }
        });
    }
    switch(req.query.type) {
        case 'initial':
            query.parentId = null;
            randomSelect(query);
            break;
        case 'next':
            query = {
                parentId: req.query.parentId
            };
            randomSelect(query);
            break;
        case 'middle':
            query = {
                parentId: {$ne: null}
            };
            randomSelect(query);
            break;
        default:
            return next(new Error.Error.IllegalStoryAccess('无法按照您要求的方式进行搜索'));
    }
};

exports.rate = function (req, res, next) {
    var Story = global.db.models.story;
    var Rate = global.db.models.rate;
    var query = {
        storyId: req.params.storyId
    };
    var rateQuery = {
        storyId: req.params.storyId,
        userId: req.session.user.userId
    };
    var rating = {
        rating: parseInt(req.body.rating),
        storyId: req.params.storyId,
        userId: req.session.user.userId
    };
    Rate.findOne({where: rateQuery}).then(function (rate) {
        if(!rate) {
            Story.findOne({where: query}).then(function (story) {
                if (!story) {
                    return next(new Error.Error.StoryNotExist());
                }
                else {
                    Rate.create(rating).then(function (rate) {
                        res.json({
                            status: 200,
                            rating: rate.rating
                        });
                    })
                }
            });
        }
        else {
            rate.rating = parseInt(req.body.rating);
            rate.save().then(function (frate) {
                res.json({
                    status: 200,
                    rating: frate.rating
                });
            });
        }
    });
};

var getStory = function (req, res, story) {
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
                    parentId: story.parentId,
                    creator: {
                        userId: user.userId,
                        username: user.username
                    }
                }
            });
        }
    });
}