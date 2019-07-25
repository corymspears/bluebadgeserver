var router = require('express').Router();
var sequelize = require('../db.js');
var userPedals = sequelize.import('../models/userpedal');


router.post('/', function(req, res){
	// console.log('req.user', req.user)
	// values of user input are assigned to variables
	var email = req.user.email;
    var pedalId = req.body.pedalId;

    console.log(req.body);

	// User model communicates with Postgres to create a new userpedal
	userPedals.create({
		email: email,
        pedalId: pedalId,
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

// Get one userpedal
router.get('/:id', function(req, res){
	var pedalid = req.params.id;
	console.log(pedalid);
	userPedals.findOne({
			where: {id: pedalid}
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
router.put('/:id', (req, res) => {
	var pedalid = req.params.id;
	var pedalId = req.body.pedalId;

	userPedals.update({pedalId: pedalId},
		{where: {id: pedalid, email: req.user.email}})

	  .then(userpedal => res.status(200).json(userpedal))
	  .catch(err => res.json({error:err}))
});

// Delete userpedal
router.delete('/:id', (req, res) => {
	var pedalid = req.params.id;
  userPedals.destroy({where : {id:pedalid}})
  .then(userpedal => res.status(200).json(userpedal))
  .catch(err => res.json({error:err}))
});

router.get('/health', function(req, res){
		res.send(200, 'healthy');
});

module.exports = router;