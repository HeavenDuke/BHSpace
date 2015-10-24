/**
 * Created by heavenduke on 9/27/15.
 */

var crypto = require('crypto');
var Error = require('./Error');

exports.authentication = function (req, res, next) {
    if (!req.session.user) {
        throw new Error.Error.NotLoggedIn();
    }
    else {
        next();
    }
};

exports.unAuthentication = function (req, res, next) {
    if (req.session.user) {
       throw new Error.Error.HaveLoggedIn();
    }
    else {
        next();
    }
};

exports.checkPassword = function(encodedPass, uploadedPass) {
    var md5 = crypto.createHash('md5');
    var splitedPass = encodedPass.split('$');
    md5.update(splitedPass[0] + uploadedPass);
    return md5.digest("hex") == splitedPass[1];
};

exports.constructUserSession = function (req, user) {
    req.session.user = {
        userId: user.userId,
        username: user.username
    };
};

exports.deleteUserSession = function (req) {
    delete req.session.user;
};

exports.constructPassword = function (password) {
    var nonceStr = '';
    var alphabet = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var alphalen = alphabet.length;
    var md5 = crypto.createHash('md5');

    for(var i=0;i<8;i++) {
        nonceStr += alphabet.charAt(Math.floor(Math.random() * alphalen));
    }
    md5.update(nonceStr + password);
    return nonceStr + '$' + md5.digest("hex");
};