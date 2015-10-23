var Sequelize = require('sequelize');
var models = require('./models');
var path = require('path');

module.exports = function (database, username, password, config) {
    var sequelize = new Sequelize(database, username, password, config);
    var User = sequelize.import(path.join(__dirname, 'models/user'));
    var Story = sequelize.import(path.join(__dirname, 'models/story'));
    var Rate = sequelize.import(path.join(__dirname, 'models/rate'));

    //Story.belongsTo(User);
    User.hasMany(Story, {foreignKey: 'userId'});
    User.belongsToMany(Story, { as: 'raters', through: 'rate', foreignKey: 'userId' })
    Story.belongsToMany(User, { as: 'stories', through: 'rate', foreignKey: 'storyId' })
    Story.hasMany(Story, {foreignKey: 'parentId'});

    return sequelize;
};