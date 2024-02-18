import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Campaign from './campaign-schema.js';

dotenv.config();

mongoose
  .connect(
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



