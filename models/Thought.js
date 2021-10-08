const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Thoughts are required'],
        minLength: 1,
        maxLength: 180
    },
    createdAt: {
       type: Date,
       default: Date.now,
       timestamps: true
    },
    username: {
        type: String,
        required: true
    },
    reactions : [{ type: Objectid, ref: 'Reaction'}]
});


ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
