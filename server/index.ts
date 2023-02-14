import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import GlobalRoutes from "./src/routes/GlobalRoutes";

const App = express();

dotenv.config();

App.use(express.json());
App.use(cors({ origin: true }));
App.use(express.urlencoded({ extended: true }));

const url = process.env.DATABASE_URL;
const port = process.env.SERVER_PORT;
GlobalRoutes(App);

async function start() {
  if (!url || !port) {
    throw new Error("Don't valid data");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url).then((e) => console.log("connected"));
    App.listen(port);
  } catch (error) {
    console.log(error);
    if (typeof error === "string") throw new Error(error);
    else throw new Error("can't start serer");
  }
}

start();
