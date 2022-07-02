const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

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
            get: (value) => moment().format("MMM do YY, h:mm a")
        },
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Please provide thought text",
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value) => moment().format("MMM Do YY, h:mm a")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

const Thought = model("Thought", thoughtSchema)

module.exports = { thoughtSchema, Thought }