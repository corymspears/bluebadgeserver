var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){

	// values of user input are assigned to variables
	var email = req.body.email;
    var pass = req.body.password;
    var fName = req.body.fName;
    var lName = req.body.lName;

    console.log(req.body);

	// User model communicates with Postgres to create a new user
	User.create({
		eMail: email,
        password: bcrypt.hashSync(pass, 10),
        fName: fName,
        lName: lName
	}).then(
		function createSuccess(user) {
			// after user is created, assign a token to user
			// var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );
			// respond with a json string including user's token
			res.json({
				user: user,
				message: 'created',
				// sessionToken: token
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	);
});

router.get('/:userid', function(req, res){
    var email = req.params.userid;
    console.log(email);
	User.findAll({
			where: { eMail: email}
		}).then(
			function findAllSuccess(data){
				res.json(data);
				console.log(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);
});

router.get('/health', function(req, res){
		res.send(200, 'healthy');
});

module.exports = router;