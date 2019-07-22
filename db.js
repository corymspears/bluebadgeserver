const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() { 
        console.log('Connected to pedalboard postgres database');
    },
    function(err){ 
        console.log(err);
    }
);

var user = sequelize.import('./models/user');
var userpedal = sequelize.import('./models/userpedal');

module.exports = sequelize;