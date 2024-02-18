import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Campaign from './campaign-schema.js';

dotenv.config();

async function fetchWadiz() {
  const wadizUrl = 'https://service.wadiz.kr/api/search/funding';

  try {
    const wadizResp = await axios.post(wadizUrl, {
      startNum: 48, 
      order: "support", 
      limit: 48, 
      categoryCode: "", 
      endYn: ""
    });
  
    console.log(wadizResp.data.data.list);
  } 
  catch (err) {
    console.error(err);
    console.log("err")
  }
}








function saveDatas() {
  mongoose.connect(
    process.env.MONGO,
    {
      dbName: 'wadiz'
    }
  )
  .then(async() => {
    console.log('connected');

    // Campaign.create({
    //   campaignId: 'testId2233',
    //   categoryName: 'TestCategory2233',
    //   title: 'Test Campaign2233'
    // })


    // console.log("complete");
  })
  .catch(err => {
    console.log(err);
  });
}



fetchWadiz();

