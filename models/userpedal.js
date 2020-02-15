module.exports = function(sequelize, DataTypes) {

	// UserPedals model created using sequelize
	var userPedals = sequelize.define('userpedals', {
        email: { type: DataTypes.STRING },
        pedalId: { type: DataTypes.ARRAY(DataTypes.STRING) }
    });
		return userPedals;
};