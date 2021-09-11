const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'You must type at least 1 character.'],
        maxlength: [280, 'You cannot exceed more than 280 characters.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;