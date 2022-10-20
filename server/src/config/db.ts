import mongoose from 'mongoose';

const db: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6xrih.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    console.log('MongoDB is connecting...');
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('MongoDB is connected...');
  } catch (e) {
    console.error('There was an error connecting to the server.')
    console.error(JSON.stringify(e));
    process.exit(1);
  }
}

export default connectDB;
