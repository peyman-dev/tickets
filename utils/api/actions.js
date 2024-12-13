"use server";

import connection from "./connection";
import TicketsModel from "./models/TicketsModel";

export const getTickets = async () => {
  try {
    await connection();
    const data = await TicketsModel.find({});

    return {
      data: data,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
};

export const createTicket = async (data) => {
  try {
    await connection();

    if (data) {
      const newTicket = await TicketsModel.create(data);

      if (newTicket) {
        return {
          message: "Successfully :)",
          res: 201,
        };

      } else {
        return {
          message: "Something went wrong",
          res: 403,
        };
      }
    }
  } catch (error) {
    return {
      message: error.message || "An error occurred",
    };
  }
};

export const removeTicket = async (id) => {
  try {
    await connection();

    const result = await TicketsModel.findByIdAndDelete(id);

    if (!result) return false;

    return {
      message: "Ticket removed successfully :)",
      res: 200,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
