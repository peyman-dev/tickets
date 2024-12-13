import Table from "@/components/Table/Table";
import TableContainer from "@/components/Table/TableContainer";
import Header from "@/layouts/Header";
import React from "react";
import { createTicket, getTickets } from "@/utils/api/actions";

const page = async () => {
  const res = await getTickets();

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-screen">
      <TableContainer tickets={res?.data} ticketGen={createTicket} />
    </div>
  );
};

export default page;
