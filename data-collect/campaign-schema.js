import mongoose from "mongoose";

const CampaignSchma = new mongoose.Schema(
  {
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
    nickName: {
      type: String,
    },
    coreMessage: {
      type: String,
    },
    whenOpen: {
      type: Date,
    },
    achievementRate: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", CampaignSchma);

export default Campaign;
