import mongoose from "mongoose";

const commentSchma = new mongoose.Schema({
    body: {
        type: String,
    },
    Campaign : {
        type: String,
    },
    commentType: {
        type: String,
    },
    userNickname: {
        type: Number,
    },
    whenCreated: {
        type: String,
    },
    commentReplys: {
        type: String
    },
}, {timestamps: true});

const comment = mongoose.model('comment', commentSchma);