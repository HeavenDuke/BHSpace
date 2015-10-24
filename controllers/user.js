/**
 * Created by heavenduke on 10/23/15.
 */

var Error = require('../utils/Error');
var Authentication = require('../utils/Authentication');

exports.login = function (req, res, next) {
    var User = global.db.models.user;
    var query = {
        username: req.body.username
    }
    console.log(query);
    User.findOne({where: query}).then(function (user) {
        if (!user) {
            return next(Error.Error.UserNotExist());
        }
        else {
            if (user.username == query.username && Authentication.checkPassword(user.password, req.body.password)) {
                req.session.user = {
                    userId: user.userId,
                    username: user.username
                };
                res.json({
                    status: 200
                });
            }
            else {
                return next(new Error.Error.InvalidLogin());
            }
        }
    });
};

exports.register = function (req, res, next) {
    var User = global.db.models.user;
    var userData = {
        username: req.body.username,
        password: Authentication.constructPassword(req.body.password)
    };
    var query = {
        username: req.body.username
    };
    User.findOne({where: query}).then(function (user) {
        if (user) {
            return next(Error.Error.DuplicateUser());
        }
        else {
            //console.log(userData);
            User.create(userData).then(function (user) {
                Authentication.constructUserSession(req, user);
                res.json({
                    status: 200,
                    userId: user.userId
                });
            });
        }
    });
};

/**
 * 登出
 * 路由 POST /user/logout
 * 已测试通过
 */
exports.logout = function (req, res, next) {
    Authentication.deleteUserSession(req);
    res.json({
        status: 200
    });
};

/**
 * 查看用户个人信息
 * 路由 GET /user/(:userId)
 * 若路由中包含userId，则查询对应用户，否则查看个人信息
 * 已测试通过
 */
exports.info = function (req, res, next) {
    var User = global.db.models.user;
    var query = {}
    if(req.params.userId) { query.userId = req.params.userId; }
    else { query.userId = req.session.user.userId }
    User.findOne({where: query}).then(function (user) {
        if (!user) {
            return next(Error.Error.UserNotExist());
        }
        else {
            res.json({
                status: 200,
                userId: user.userId,
                username: user.username
            });
        }
    });
};

exports.update = function (req, res, next) {
    var User = global.db.models.user;
    var query = {
        userId: req.session.user.userId
    };
    User.findOne({where: query}).then(function (user) {
        if (!user) {
            return next(Error.Error.UserNotExist());
        }
        else {
            if (req.body.newPassword && req.body.oldPassword) {
                if (Authentication.checkPassword(user.password, req.body.oldPassword)) {
                    user.password = Authentication.constructPassword(req.body.newPassword);
                    user.save().then(function(user) {
                        Authentication.constructUserSession(req, user);
                        res.json({
                            status: 200
                        });
                    });
                }
                else {
                    return next(new Error.Error.InvalidUserUpdate());
                }
            }
            else {
                res.json({
                    status: 200
                });
            }
        }
    })
};