var express = require('express');
var router = express.Router();

const Campaign = require('../models/campaign-schema');
const Comment = require('../models/comment-schema');

router.get('/campaign', async function(req, res, next) {
  try {
    const campaigns = Campaign.find({})
    res.send(campaigns);
  }
  catch(err) {
    res.send('err: ' + err);
  }
});

router.post('/:campaignId/comment/:commentId', async function(req, res, next) {
  try {
    const campaignId = req.params.campaignId;
    const commentId = req.params.commentId;
    const { body, nickName } = req.body;
    
    // 댓글의 commentReplys 배열 크기로 depth 구하기
    const comment = await Comment.findOne({_id: commentId});
    const depth = comment.commentReplys.length + 1;

    // 대댓글 저장
    const savedComment = await Comment.create({
      body: body,
      Campaign: campaignId,
      commentType: null,
      nickName: nickName,
      whenCreated : new Date(),
      depth: depth,
      commentReplys: []
    })

    // 댓글의 commentReplys 업데이트
    await Comment.findByIdAndUpdate(commentId,
      { $push: { commentReplys: savedComment._id }},
      { new: true }
    );

    // 대댓글의 commentReplys 업데이트
    await Comment.findByIdAndUpdate(savedComment._id,
      { $push: { commentReplys: savedComment._id }},
      { new: true }
    );

    res.send(savedComment);
  }
  catch(err) {
    res.send('err: ' + err);
  }
});

router.post('/:campaignId/comment', async function(req, res, next) {
  try {
    const campaignId = req.params.campaignId;
    const { body, nickName } = req.body;

    const savedComment = await Comment.create({
      body: body,
      Campaign: campaignId,
      commentType: null,
      nickName: nickName,
      whenCreated : new Date(),
      depth: 0,
      commentReplys: []
    })

    res.send(savedComment);
  }
  catch(err) {
    res.send('err: ' + err);
  }
});

router.get('/:campaignId', async function(req, res, next) {
  try {
    const campaignId = req.params.campaignId;

    const campaign = await Campaign.findOne({_id: campaignId})
    const comments = await Comment.find({Campaign: campaignId})

    res.send({
      campaign: campaign,
      comments: comments
    })
  }
  catch(err) {
    res.send('err: ' + err);
  }

})

module.exports = router;