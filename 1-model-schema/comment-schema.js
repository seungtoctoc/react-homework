import mongoose from "mongoose";

const CommentSchma = new mongoose.Schema({
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

const Comment = mongoose.model('Comment', CommentSchma);