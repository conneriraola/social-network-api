const { Schema, Types } = require('mongoose');
const dateformat = require('../utils/dateFormat');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: "Please provide reaction text",
            maxlength: 280,
        },
        username: {
            type: String,
            Required: "Please provide a username",
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema; 