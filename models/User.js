const { Schema, model, Types } = require("mongoose");
const { thoughtSchema } = require("./Thoughts");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Please provide username",
            trim: true,
        },
        email: {
            type: String,
            required: "Please provide an email",
            unique: true,
            match: [
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 
                ],
        },
        thoughts: [thoughtSchema],
        friends: [this],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("FriendCount").get(function () {
    return this.friends.length;
});

const User = model("User". userSchema);

module.exports = User;