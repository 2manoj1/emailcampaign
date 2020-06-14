/* eslint-disable comma-dangle */
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const connectDb = async () => {
  try {
    const dbUrl = process.env.DATABASE.replace(
      "<password>",
      process.env.DATABASE_PASSWORD,
    );
    return mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
};

export default connectDb;
