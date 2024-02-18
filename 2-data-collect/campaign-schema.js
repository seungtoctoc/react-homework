import mongoose from 'mongoose';

const CampaignSchma = new mongoose.Schema({
    campaignId: {
        type: String,
    },
    categoryName: {
        type: String,
    },
    title: {
        type: String,
    },
}, {timestamps: true});

const Campaign = mongoose.model('campaign', CampaignSchma);

export default Campaign;