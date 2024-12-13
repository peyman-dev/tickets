import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default async function () {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect("mongodb://localhost:27017/tickets").then(() => {
      console.log("Mongoose started working successfully !");
    });

    return NextResponse.json({
      message: "Database connected successfully :)",
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    }).status(404);
  }
}
