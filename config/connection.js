const mongoose = require('mongoose'); //imports the use of mongoose

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', { //establishes a connection to mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;