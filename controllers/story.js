/**
 * Created by heavenduke on 10/23/15.
 */

exports.shuffle = function (req, res, next) {
    res.json({"url": req.originalUrl});
};

exports.list = function (req, res, next) {
    res.json({"url": req.originalUrl});};

exports.create = function (req ,res, next) {
    res.json({"url": req.originalUrl});
};

exports.update = function (req, res, next) {
    res.json({"url": req.originalUrl});
};

exports.upload = function (req, res, next) {
    res.json({"url": req.originalUrl});
};

exports.info = function (req, res, next) {
    console.log('index')
    res.json({"url": req.originalUrl});
};

exports.previous = function (req, res, next) {
    console.log('previous');
    res.json({"url": req.originalUrl});
};

exports.next = function (req, res, next) {
    console.log('next');
    res.json({"url": req.originalUrl});
};