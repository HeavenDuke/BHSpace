/**
 * Created by heavenduke on 9/27/15.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('story', {
        storyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true
    });
};