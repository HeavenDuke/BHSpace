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

    return InvalidLogin;
})(Error);

var InvalidUserUpdate = (function (superClass) {
    extend(InvalidUserUpdate, superClass);
    function InvalidUserUpdate(message) {
        this.message = message != null ? message : exports.MESSAGES.INVALID_USER_UPDATE;
        this.name = 'InvalidUserUpdate';
        this.status = 401;
        Error.captureStackTrace(this, InvalidUserUpdate);
    }

    return InvalidUserUpdate;
})(Error);

var NotLoggedIn = (function (superClass) {
    extend(NotLoggedIn, superClass);
    function NotLoggedIn(message) {
        this.message = message != null ? message : exports.MESSAGES.NOT_LOGGED_IN;
        this.name = 'NotLoggedIn';
        this.status = 401;
        Error.captureStackTrace(this, NotLoggedIn);
    }

    return NotLoggedIn;
})(Error);

var HaveLoggedIn = (function (superClass) {
    extend(HaveLoggedIn, superClass);
    function HaveLoggedIn(message) {
        this.message = message != null ? message : exports.MESSAGES.HAVE_LOGGED_IN;
        this.name = 'HaveLoggedIn';
        this.status = 401;
        Error.captureStackTrace(this, HaveLoggedIn);
    }

    return HaveLoggedIn;
})(Error);

var DuplicateUser = (function (superClass) {
    extend(DuplicateUser, superClass);
    function DuplicateUser(message) {
        this.message = message != null ? message : exports.MESSAGES.DUPLICATE_USER;
        this.name = 'DuplicateUser';
        this.status = 401;
        Error.captureStackTrace(this, DuplicateUser);
    }

    return DuplicateUser;
})(Error);

exports.MESSAGES = {
    USER_NOT_EXIST: '用户不存在！',
    INVALID_LOGIN: '您输入的昵称或密码有误，请重新输入',
    DUPLICATE_USER: '您所使用的名字已经被注册过了哟',
    HAVE_LOGGED_IN: '您已登陆',
    NOT_LOGGED_IN: '您还没有登陆',
    INVALID_USER_UPDATE: '您输入的密码有误，请重新输入'
};

exports.Error = {
    UserNotExist: UserNotExist,
    InvalidLogin: InvalidLogin,
    DuplicateUser: DuplicateUser,
    HaveLoggedIn: HaveLoggedIn,
    NotLoggedIn: NotLoggedIn,
    InvalidUserUpdate: InvalidUserUpdate
};