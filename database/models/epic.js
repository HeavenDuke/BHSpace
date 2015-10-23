/**
 * Created by heavenduke on 10/23/15.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('epic', {
        epicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        underscored: true
    });
};