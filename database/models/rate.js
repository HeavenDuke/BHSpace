/**
 * Created by heavenduke on 9/27/15.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('rate', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 1,
                min: 5
            }
        }
    }, {
        underscored: true
    });
};