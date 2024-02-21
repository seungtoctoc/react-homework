import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Campaign from "./campaign-schema.js";
import Comment from "./comment-schema.js";

dotenv.config();

const CAMPAIGNS_LIMIT = 20;
const COMMENTS_LIMIT = 20;
const REPLYS_LIMIT = 20;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO, { dbName: "wadiz" });
  } catch (err) {
    console.log("error in connectDB, ", err);
  }
}

async function getCampaingns() {
  const wadizUrl = "https://service.wadiz.kr/api/search/funding";

  try {
    const wadizResp = await axios.post(wadizUrl, {
      startNum: 0,
      order: "support",
      limit: CAMPAIGNS_LIMIT,
      categoryCode: "",
      endYn: "",
    });
    const campaigns = wadizResp.data.data.list;

    return campaigns;
  } catch (err) {
    console.log("error in getCampaigns, ", err);
  }
}

async function saveCampaignAndComment(filteredCampaingns) {
  const commentCommonUrl =
    "https://www.wadiz.kr/web/reward/api/comments/campaigns/";
  const commentCommonParams =
    "?page=0&size=2&commentGroupType=CAMPAIGN&rewardCommentType=";

  try {
    for (const campaign of filteredCampaingns) {
      const commentUrl =
        commentCommonUrl + campaign.campaignId + commentCommonParams;
      const commentResp = await axios.get(commentUrl);
      const comments = commentResp.data.data.content.slice(0, COMMENTS_LIMIT);

      const savedCampaignId = await saveCampaignAndGetId(campaign);
      await saveCommentAndReply(comments, savedCampaignId);
    }
  } catch (err) {
    console.log("error in saveCampaignAndComment, ", err);
  }
}

async function saveCampaignAndGetId(campaign) {
  try {
    const savedCampaign = await Campaign.create({
      campaignId: campaign.campaignId,
      categoryName: campaign.categoryName,
      title: campaign.title,
      totalBackedAmount: campaign.totalBackedAmount,
      photoUrl: campaign.photoUrl,
      nickName: campaign.nickName,
      coreMessage: campaign.coreMessage,
      whenOpen: campaign.whenOpen,
      achievementRate: campaign.achievementRate,
    });

    return savedCampaign._id;
  } catch (err) {
    console.log("error in saveCampaignAndGetId, ", err);
  }
}

async function saveCommentAndReply(comments, savedCampaignId) {
  try {
    for (const comment of comments) {
      const savedComment = await Comment.create({
        body: comment.body,
        Campaign: savedCampaignId,
        commentType: comment.commentType,
        nickName: comment.nickName,
        whenCreated: comment.whenCreated,
        depth: comment.depth,
      });

      const slicedReplys = comment.commentReplys.slice(0, REPLYS_LIMIT);
      const replyIds = await saveReplyAndGetIds(slicedReplys, savedCampaignId);
      await Comment.updateOne(
        { _id: savedComment._id },
        { commentReplys: replyIds }
      );
    }
  } catch (err) {
    console.log("error in saveCommentAndReply, ", err);
  }
}

async function saveReplyAndGetIds(commentReplys, savedCampaignId) {
  try {
    let replyIds = [];

    for (const reply of commentReplys) {
      const savedReply = await Comment.create({
        body: reply.body,
        Campaign: savedCampaignId,
        commentType: reply.commentType,
        userNickname: reply.userNickname,
        whenCreated: reply.whenCreated,
        depth: reply.depth,
      });

      replyIds.push(savedReply._id);
      // await Comment.updateOne({_id: savedReply._id}, {commentReplys: savedReply._id});
    }

    return replyIds;
  } catch (err) {
    console.log("error in getReplys, ", err);
  }
}

// main
try {
  await connectDB();
  console.log("connect DB successfully");

  const campaigns = await getCampaingns();
  console.log("get campaingns successfully");

  console.log("start save campaigns and comments");
  await saveCampaignAndComment(campaigns);
  console.log("fetched campaigns and comments successfully");

  mongoose.disconnect();
  console.log("disconnect DB");
} catch (err) {
  console.log("error in main");
}
