/**
 * Created by heavenduke on 10/23/15.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('plot', {
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });
};