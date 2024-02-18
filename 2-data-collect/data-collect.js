import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
  .connect(
    process.env.MONGO,
    {
      'w': 'wadiz',
      retryWrites: true,
      dbName: 'todo'
    }
  )
  .then(() => {
    console.log('connected');
  })
  .catch(err =>
    console.log(err)
  );


  