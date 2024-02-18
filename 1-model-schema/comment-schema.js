import mongoose from "mongoose";

const CommentSchma = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    Campaign : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Campaign"
    },
    commentType: {
        type: String,
        required: true,
    },
    userNickname: {
        type: String,
        required: true,
    },
    whenCreated: {
        type: String,
        required: true,
    },
    commentReplys: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Comment"
    },
    depth: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchma);