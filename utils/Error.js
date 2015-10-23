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

var IllegalLogin = (function (superClass) {
    extend(IllegalLogin, superClass);
    function IllegalLogin(message) {
        this.message = message != null ? message : exports.MESSAGES.ILLEGAL_LOGIN;
        this.name = 'IllegalLogin';
        Error.captureStackTrace(this, IllegalLogin);
    }

    return IllegalLogin;
})(Error);

var IllegalDistribution = (function (superClass) {
    extend(IllegalDistribution, superClass);
    function IllegalDistribution(message) {
        this.message = message != null ? message : exports.MESSAGES.ILLEGAL_DISTRIBUTION;
        this.name = 'IllegalDistribution';
        Error.captureStackTrace(this, IllegalDistribution);
    }

    return IllegalDistribution;
})(Error);

exports.MESSAGES = {
    ILLEGAL_EMAIL: "邮件格式非法",
    ILLEGAL_TIME: "时间设置不合法",
    ILLEGAL_LOGIN: "工号或密码不正确",
    ILLEGAL_ROLE: "您无法切换至目标身份",
    ILLEGAL_ACCESS: "您无权进行当前操作",
    ILLEGAL_CREATION: "处理人员需要设置默认审核人员",
    ILLEGAL_DISTRIBUTION: "拥有回复权限的处理人员不能指定一人以上",
    ILLEGAL_TRANSMISSION: "对方已经在当前任务内！",
    INSUFFICIENT_HANDLER: "必须指定一名处理人员！",
    DUPLICATE_DISTRIBUTION: "已经向指定的部分人员分派过该任务！",
    NOT_LOGGED_IN: "请您登录",
    HAVE_LOGGED_IN: "您已登录",
    USER_EXISTED: "用户已存在",
    UNKNOWN_ERROR: "系统异常，请稍后重试",
    EMAIL_ERROR: "因网络等原因，邮件无法发送",
    CONFIG_ERROR: "邮箱设置修改失败"
};

exports.Error = {
    IllegalLogin: IllegalLogin,
    IllegalDistribution: IllegalDistribution
};