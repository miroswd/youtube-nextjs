import { connect } from "mongoose";

export default async function connectMongo() {
  const {MONGO_URL} = process.env;

  if (!MONGO_URL) {
    throw new Error("Failed to access the data")
  }

  await connect(MONGO_URL).catch((err) =>
    console.log(err, "Mongodb error connection")
  );
};