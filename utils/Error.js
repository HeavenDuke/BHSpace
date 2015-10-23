/**
 * Created by heavenduke on 9/27/15.
 */
var extend = function (child, parent) {
    for (var key in parent) {
        if (parent.hasOwnProperty(key)) {
            child[key] = parent[key];
        }
    }
    function ctor() {
        this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};

var UserNotExist = (function (superClass) {
    extend(UserNotExist, superClass);
    function UserNotExist(message) {
        this.message = message != null ? message : exports.MESSAGES.USER_NOT_EXIST;
        this.name = 'UserNotExist';
        this.status = 404;
        Error.captureStackTrace(this, UserNotExist);
    }

    return UserNotExist;
})(Error);

var InvalidLogin = (function (superClass) {
    extend(InvalidLogin, superClass);
    function InvalidLogin(message) {
        this.message = message != null ? message : exports.MESSAGES.INVALID_LOGIN;
        this.name = 'InvalidLogin';
        this.status = 401;
        Error.captureStackTrace(this, InvalidLogin);
    }

    return UserNotExist;
})(Error);

exports.MESSAGES = {
    USER_NOT_EXIST: '用户不存在！',
    INVALID_LOGIN: '您输入的用户名或密码有误，请重新输入'
};

exports.Error = {
    UserNotExist: UserNotExist,
    InvalidLogin: InvalidLogin
};