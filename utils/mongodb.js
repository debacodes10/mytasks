import mongoose from 'mongoose';

let connection; // track the connection

export const connectToDB = async () => {
  if (connection) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "MyTasks",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection = mongoose.connection;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // You can throw the error or implement custom error handling logic here
  }
};
