var Sequelize = require('sequelize');
var models = require('./models');
var path = require('path');

module.exports = function (database, username, password, config) {
    var sequelize = new Sequelize(database, username, password, config);
    var User = sequelize.import(path.join(__dirname, 'models/user'));
    var Story = sequelize.import(path.join(__dirname, 'models/story'));
    var Epic = sequelize.import(path.join(__dirname, 'models/epic'));
    var Rate = sequelize.import(path.join(__dirname, 'models/rate'));
    var Plot = sequelize.import(path.join(__dirname, 'models/plot'));

    Story.belongsTo(User, {foreignKey: 'userId'});
    User.hasMany(Story, {foreignKey: 'userId'});
    User.hasMany(Epic, {foreignKey: 'userId'});
    Epic.belongsTo(User, {foreignKey: 'userId'});
    Epic.belongsToMany(Story, { as: 'references', through: 'plot', foreignKey: 'epicId' });
    Story.belongsToMany(Epic, { as: 'chapters', through: 'plot', foreignKey: 'storyId' });
    User.belongsToMany(Story, { as: 'raters', through: 'rate', foreignKey: 'userId' });
    Story.belongsToMany(User, { as: 'stories', through: 'rate', foreignKey: 'storyId' });
    Story.hasMany(Story, {foreignKey: 'parentId'});

    return sequelize;
};