import mongoose from "mongoose";


let isConnected = false; // track the connection

const connectToDB = async () => {
  mongoose.set('strictQuery', true); //this is necessaray

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Task_Manager",
    })

    isConnected = true;
    console.log('MongoDB connected')

  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}
export default connectToDB