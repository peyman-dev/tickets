import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TicketsModel =
  mongoose.models.Tickets || mongoose.model("Tickets", Schema);

export default TicketsModel;
