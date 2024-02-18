import mongoose from "mongoose";

const CampaignSchma = new mongoose.Schema({
    campaignId: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    totalBackedAmount: {
        type: Number,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    coreMessage: {
        type: String,
        required: true,
    },
    whenOpen: {
        type: Date,
        required: true,
    },
    achivementRate: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Campaign = mongoose.model('Campaign', CampaignSchma);