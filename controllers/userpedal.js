var router = require('express').Router();
var sequelize = require('../db.js');
var userPedals = sequelize.import('../models/userpedal');

// Create userpedal
router.post('/', function(req, res){
	console.log("o")
	// console.log('req.user', req.user)
	// values of user input are assigned to variables
	var email = req.body.email;
    var pedalId = req.body.pedals;

    console.log(req.body);

	// User model communicates with Postgres to create a new userpedal
	// userPedals.create({
	// 	email: email,
    //     pedalId: pedalId,
	// }).then(
	// 	function createSuccess(userpedal) {
	// 		// after user is created, assign a token to userpedal
	// 		// var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );
	// 		// respond with a json string including user's token
	// 		res.json({
	// 			userpedal: userpedal,
	// 			message: 'created',
	// 			// sessionToken: token
	// 		});
	// 	},
	// 	function createError(err) {
	// 		res.send(500, err.message);
	// 	}
	// );
	userPedals.findOrCreate({
		defaults: {
			email: email,
			pedalId: pedalId,
		},
		where: {email: email}
	}).then(
		function createSuccess(userpedal) {
			// after user is created, assign a token to userpedal
			// var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );
			// respond with a json string including user's token
			if (userpedal[1]) {
				res.json({
					userpedal: userpedal,
					message: 'created new board',
					// sessionToken: token
				});
			} else {
				userPedals.update({pedalId: pedalId},
					{where: {email: email}})
				  .then(updateresponse => res.status(200).json(updateresponse))
				  .catch(err => res.json({error:err}))
			}
		},
		function createError(err) {
			res.send(500, err.message);
		}
	);
});

// Get one userpedal
router.get('/:email', function(req, res){
	var email = req.params.email;
	userPedals.findOne({
			where: {email: email}
		}).then(
			function findOneSuccess(data){
				res.json(data);
				console.log(data);
			},
			function findOneError(err){
				res.send(500, err.message);
			}
		);
});

// Update userpedal
// router.put('/:id', (req, res) => {
// 	var pedalid = req.params.id;
// 	var pedalId = req.body.pedalId;

// 	userPedals.update({pedalId: pedalId},
// 		{where: {email: req.user.email}})

// 	  .then(userpedal => res.status(200).json(userpedal))
// 	  .catch(err => res.json({error:err}))
// });

// Delete userpedal
router.delete('/', (req, res) => {
	var email = req.body.email;
  userPedals.destroy({where : {email:email}})
  .then(userpedal => res.status(200).json(userpedal))
  .catch(err => res.json({error:err}))
});

router.get('/health', function(req, res){
		res.send(200, 'healthy');
});

module.exports = router;