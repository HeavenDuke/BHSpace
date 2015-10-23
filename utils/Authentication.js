/**
 * Created by heavenduke on 9/27/15.
 */
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