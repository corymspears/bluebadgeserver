module.exports = function(sequelize, DataTypes) {

	// User model created using sequelize
	var User = sequelize.define('user', {
        email: { type: DataTypes.STRING, unique: true },
        fName: DataTypes.STRING,
        lName: DataTypes.STRING,
        password: DataTypes.STRING
    });
		return User;
};
