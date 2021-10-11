const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId, 
        default: '',
       
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    createdAt: {
       type: Date,
       default: Date.now,
       timestamps: true 
    }

});



const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;

