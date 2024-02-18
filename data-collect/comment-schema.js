import mongoose from 'mongoose';

const CommentSchma = new mongoose.Schema({
    body: {
        type: String,
    },
    Campaign : {
        type: mongoose.Types.ObjectId,
        ref: "Campaign",
    },
    commentType: {
        type: String,
    },
    userNickname : {
        type: String,
    },
    whenCreated: {
        type: Date,
    },
    commentReplys : [{
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    }],
    depth: {
        type: Number,
    },
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchma);

export default Comment;