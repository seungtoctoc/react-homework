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

CampaignSchma.statics.createCampaign = async function (campaignId, categoryName, title, totalBackedAmount, photoUrl, nickname, coreMessage, whenOpen, achivementRate) {
    try {
        await this.create({campaignId, categoryName, title, totalBackedAmount, photoUrl, nickname, coreMessage, whenOpen, achivementRate});

        return {
            campaignId: campaignId,
            categoryName: categoryName,
            title: title,
            totalBackedAmount: totalBackedAmount,
            photoUrl: photoUrl,
            nickname: nickname,
            coreMessage: coreMessage,
            whenOpen: whenOpen,
            achivementRate: achivementRate,
        }
    }
    catch (err) {
        throw err;
    }
}

const Campaign = mongoose.model('Campaign', CampaignSchma);