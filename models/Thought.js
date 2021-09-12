const { Schema, model, Types } = require('mongoose'); //Imports the use of mongodb
const moment = require('moment'); //Imports the use of moment.js which is being used to format the createdAt date information

const ReactionSchema = new Schema({ //creates the Reaction schema
    reactionId: { //Defines the readtionId field
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: { //Defines the reactionBody field
        type: String, //Stores data as a string
        required: true, //A reaction is required
        maxlength: 280 //Sets the max length of character to 280
    },
    username: { //Defines the username field
        type: String,  //Stores data as a string
        required: true //Is Required
    },
    createdAt: { //Defines the createdAt field
        type: Date, //Stores the data as a date
        default: Date.now, //sets the default date to today's date
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a') //Formats the date using moment.js
    }
    },
    {
        toJSON: { //Converts to JSON
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({ //creates the Thought Schema
    thoughtText: { //Defines the thoughtText field
        type: String, //Stores the data as a string
        required: true, //Is Required
        minlength: [1, 'You must type at least 1 character.'], //Must be at least 1 character
        maxlength: [280, 'You cannot exceed more than 280 characters.'] //Cannot exceed ore than 280 characters
    },
    createdAt: { //Defines the createdAt field
        type: Date, //Stores the data as a date
        default: Date.now, //Sets the default date to today's date
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a') //Formats the date using moment.js
    },
    username: { //Defines the username field
        type: String, //Stores the data as a string
        required: true, //Is required
        ref: 'User' //references the user collection defined in the user model
    },
    reactions: [ReactionSchema], //Defines the reactions field which is an array referencing the ReactionSchema
    },
    {
        toJSON: { //converts data to JSON
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() { //function to get the total reaction count for each thought
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema); //Defines the Thought model

module.exports = Thought; //Exports the Thought model