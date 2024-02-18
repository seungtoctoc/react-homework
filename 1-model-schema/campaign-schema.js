import mongoose from "mongoose";

const campaignSchma = new mongoose.Schema({
    campaignId: {
        type: String,
    },
    categoryName: {
        type: String,
    },
    title: {
        type: String,
    },
    totalBackedAmount: {
        type: Number,
    },
    photoUrl: {
        type: String,
    },
    nickname: {
        type: String
    },
    coreMessage: {
        type: String
    },
    whenOpen: {
        type: Date
    },
    achivementRate: {
        type: Number
    },
}, {timestamps: true});

const campaign = mongoose.model('campaign', campaignSchma);