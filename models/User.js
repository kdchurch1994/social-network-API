const { Schema, model } = require('mongoose'); //Imports the use of mongodb

const userSchema = new Schema( //Create the userSchema
    {
        username: { //Defines the username field
            type: String, //Stores the data as a string
            unique: true, //The username must be unique
            required: true, //Is required
            trim: true, //properly trims the username
        },
        email: { //Defines the email field
            type: String, //Stores the data as a String
            unique: true, //Must be unique
            required: true, //Required
            match: [ //Matches the email to the following regular expression to ensure that the email address is valid
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, "Please enter a valid email address!",
            ],
        },
        thoughts: [ //Defines the thoughts field which stores the thoughts in an array
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought' //References the Thought Model
            }
        ],
        friends: [ //Defines the friends field which stores the friends in an array
            {
                type: Schema.Types.ObjectId,
                ref: 'User' //References the user model
            }
        ]
    },
    {
        toJSON: { //Converts data to JSON
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function() { //Function to get total friend count for each user
    return this.friends.length;
});

const User = model ('User', userSchema); //Creates the User Model based of the userSchema

module.exports = User; //Exports the use of the User model