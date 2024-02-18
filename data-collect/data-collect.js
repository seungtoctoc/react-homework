import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Campaign from './campaign-schema.js';
import Comment from './comment-schema.js';

dotenv.config();

async function connectDB() {
  mongoose.connect(process.env.MONGO, { dbName: 'wadiz'})
  .then(async() => {
    console.log('connected');
  })
  .catch(err => {
    console.log(err);
  });
}

async function getCampaingns() {
  // fetch
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
    console.error(err);
    console.log("err")
  }
}

async function saveCampaignAndComment(filteredCampaingns) {
  const commentCommonUrl = 'https://www.wadiz.kr/web/reward/api/comments/campaigns/';
  const commentCommonParams = '?page=0&size=2&commentGroupType=CAMPAIGN&rewardCommentType=';

  filteredCampaingns.forEach(async (campaign, idx) => {
    const savedCampaignId = saveCampaignAndGetId(campaign);

    const commentUrl = commentCommonUrl + campaign.campaignId + commentCommonParams;
    const commentResp = await axios.get(commentUrl);
    const comments = commentResp.data.data.content.slice(0, 5);
    
    console.log("\n\n\n-------------------------------------------");
    console.log(comments);

    // comments.forEach((ele, idx) => {
    //   Comment.create({
    //     body: ele.body,
    //     Campaign: savedCampaignId,
    //     commentType: ele.commentType,
    //     userNickname: ele.userNickname,
    //     whenCreated : ele.whenCreated,
    //     commentReplys: ele.commentReplys,
    //     depth 
    //   })
    // })
    
  })
}

function saveCampaignAndGetId(campaign) {
  Campaign.create({
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
    .then(savedCampaign => {
      console.log("savedCam's id: ", savedCampaign._id);
      return savedCampaign._id;
    })
}


connectDB()
  .then(() => {
    return getCampaingns()
  })
  .then(Campaingns => {
    saveCampaignAndComment(Campaingns);
  })
  .catch(err => {
    console.log(err);
  })