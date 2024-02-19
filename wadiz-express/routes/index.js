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

  }
  catch(err) {
    res.send('err: ' + err);
  }
});

router.post('/:campaignId/comment', async function(req, res, next) {
  try {
    const campaignId = req.params.campaignId;
    const { body, nickName, depth } = req.body;

    const savedComment = await Comment.create({
      body: body,
      Campaign: campaignId,
      commentType: null,
      nickName: nickName,
      whenCreated : new Date(),
      depth: depth,
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

    const campaign = await Campaign.find({_id: campaignId})
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