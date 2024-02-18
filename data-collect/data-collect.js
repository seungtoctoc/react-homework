import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Campaign from './campaign-schema.js';
import Comment from './comment-schema.js';

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO, { dbName: 'wadiz'})
    console.log('connected');
  }
  catch (err) {
    console.log("error in connectDB");
  }
}

async function getCampaingns() {
  try {
    const wadizUrl = 'https://service.wadiz.kr/api/search/funding';
    const wadizResp = await axios.post(wadizUrl, {
      startNum: 0, 
      order: "support", 
      limit: 2, 
      categoryCode: "", 
      endYn: ""
    });
    const campaigns = wadizResp.data.data.list;

    const filteredCampaingns = campaigns.map((ele, idx) => {
      return {
        campaignId: ele.campaignId,
        categoryName: ele.categoryName,
        title: ele.title,
        totalBackedAmount: ele.totalBackedAmount,
        photoUrl: ele.photoUrl,
        nickName: ele.nickName,
        coreMessage: ele.coreMessage,
        whenOpen: ele.whenOpen,
        achievementRate: ele.achievementRate
      }
    });

    return filteredCampaingns;
  } 
  catch (err) {
    console.log("error in getCampaigns");
  }
}

async function saveCampaignAndComment(filteredCampaingns) {
  const commentCommonUrl = 'https://www.wadiz.kr/web/reward/api/comments/campaigns/';
  const commentCommonParams = '?page=0&size=2&commentGroupType=CAMPAIGN&rewardCommentType=';

  try {
    for (const campaign of filteredCampaingns) {
      const savedCampaignId = await saveCampaignAndGetId(campaign);

      const commentUrl = commentCommonUrl + campaign.campaignId + commentCommonParams;
      const commentResp = await axios.get(commentUrl);
      const comments = commentResp.data.data.content.slice(0, 5);
      
      console.log("campai id: ", savedCampaignId);
      await saveCommentAndReply(comments, savedCampaignId);
    }
  }
  catch (err) {
    console.log("error in saveCampaignAndComment");
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
      achievementRate: campaign.achievementRate
    })

    console.log("savedCam's id: ", savedCampaign._id);
    return savedCampaign._id;
  }
  catch (err) {
    console.log("error in saveCampaignAndGetId");
  }
}

async function saveCommentAndReply(comments, savedCampaignId) {
  try {
    for (const comment of comments) {
      const savedComment = await Comment.create({
        body: comment.body,
        Campaign: savedCampaignId,
        commentType: comment.commentType,
        userNickname: comment.userNickname,
        whenCreated : comment.whenCreated,
        depth: comment.depth
      })

      const replyIds = await saveReplyAndGetIds(comment.commentReplys, savedCampaignId);
      await Comment.updateOne({_id: savedComment._id}, {commentReplys: replyIds});
    }
  }
  catch (err) {
    console.log("error in saveCommentAndReply");
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
        whenCreated : reply.whenCreated,
        depth: reply.depth
      })

      replyIds.push(savedReply._id);
      await Comment.updateOne({_id: savedReply._id}, {commentReplys: savedReply._id});
    }

    console.log("ids: ", replyIds);
    return replyIds;
  }
  catch (err) {
    console.log("error in getReplys");
  }
}

// main
try {
  await connectDB();
  const campaigns = await getCampaingns();
  await saveCampaignAndComment(campaigns);
  mongoose.disconnect();
}
catch (err) {
  console.log("error in main");
}