var router = require('express').Router();
var sequelize = require('../db.js');
var userPedals = sequelize.import('../models/userpedal');


router.post('/', function(req, res){

	// values of user input are assigned to variables
    var email = req.body.email;
    var boardId = req.body.boardId
    var pedalId = req.body.pedalId;

    console.log(req.body);

	// User model communicates with Postgres to create a new userpedal
	userPedals.create({
		email: email,
        pedalId: pedalId,
        boardId: boardId
	}).then(
		function createSuccess(userpedal) {
			// after user is created, assign a token to userpedal
			// var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );
			// respond with a json string including user's token
			res.json({
				userpedal: userpedal,
				message: 'created',
				// sessionToken: token
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	);
});

router.get('/:userpedal', function(req, res){
    var email = req.params.userpedal;
    console.log(email);
	userPedals.findAll({
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