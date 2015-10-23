/**
 * Created by heavenduke on 9/27/15.
 */

var crypto = require('crypto');

exports.authentication = function (req, res, next) {
    if (!req.session.user) {
        req.flash('message', Error.MESSAGES.NOT_LOGGED_IN);
        return res.redirect('/user/login');
    }
    next();
};

exports.unAuthentication = function (req, res, next) {
    if (req.session.user) {
        req.flash('message', Error.MESSAGES.HAVE_LOGGED_IN);
        return res.redirect('/');
    }
    next();
};

exports.checkPassword = function(encodedPass, uploadedPass) {
    var md5 = crypto.createHash('md5');
    var splitedPass = encodedPass.split('$');
    md5.update(splitedPass[0] + uploadedPass);
    return md5.digest("hex") == splitedPass[1];
};