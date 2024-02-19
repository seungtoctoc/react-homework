var express = require('express');
var router = express.Router();

const Campaign = require('../models/campaign-schema');
const Comment = require('../models/comment-schema');

router.get('/campaign', function(req, res, next) {
  Campaign.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    })

});



module.exports = router;