module.exports = function(sequelize, DataTypes) {

	// UserPedals model created using sequelize
	var userPedals = sequelize.define('userpedals', {
        email: { type: DataTypes.STRING },
        boardId: DataTypes.INTEGER,
        pedalId: DataTypes.ARRAY(DataTypes.INTEGER)
    });
		return userPedals;
};