require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');


sequelize.sync();
app.use(express.json());

app.use(bodyParser.json());

// MIDDLEWARE ///////////////////////////////////////////////////////////

// allows api to be accessed by browsers or other elements outside of port 5000
app.use(require('./middleware/headers'));

// create user route
app.use('/api/user', require('./controllers/user'));

// checks to see if token that was given matches the header of every request
app.use(require('./middleware/validate-session'));


// CONTROLLERS ///////////////////////////////////////////////////////////////


// userpedalroute
app.use('/api/userpedal', require('./controllers/userpedal'));


app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`);
}
);