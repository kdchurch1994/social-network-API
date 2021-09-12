const express = require('express'); //Imports the use of express
const routes = require('./routes'); //Imports the routes defined in the routes directory
const db = require('./config/connection'); //Imports the database connection from the connection.js file in the config directory

const app = express(); //Sets the const app equal to express(), which means when we use app, we are using the various functionalities of express
const PORT = process.env.PORT || 3001; //Sets the const PORT to use the port defined by the deployment application (i.e. Heroku) or 3001 when establishing a local connection

app.use(express.json()); //Takes incoming POST data in the form of JSON and parses it into the req.body
app.use(express.urlencoded({ extended: true})); //Takes incoming POST data and converts it to the key/value pairings that can be access in the req.body object
app.use(express.static('public')); 
app.use(routes); //Allows the server to use the routes defined in the routes directory

db.once('open', () => { //Establishes the connection to the mongoose database
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`) //Tells the app to listen to PORT and provide a console message saying that the server is listening on the port value equal to PORT.
    });
});

