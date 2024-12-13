"use client";
import { getTickets } from "@/utils/api/actions";
import TableContext from "@/utils/contexts/tableContext";
import React, { useContext, useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import usePagination from "../pagination/usePagination";
import { Modal, useDisclosure, ModalHeader } from "@nextui-org/modal";

const Table = ({ tickets }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [totalMinutes, setTotalMinutes] = useState(0);
  const { columnsOpts } = useContext(TableContext);
  const { Buttons, paginatedItems, ButtonsGroup, goToLastPage } = usePagination(
    {
      initItems: tickets,
      itemsPerView: 8,
    }
  );

  const modalOpts = {
    isOpen,
    onClose,
  };

  useEffect(() => {
    goToLastPage();
    let minutes = tickets?.map((ticket) => {
      return ticket.minutes;
    });

    let total = minutes.reduce((a, b) => a + b, 0);
    setTotalMinutes(total);

    return;
  }, [tickets]);

  const ticketsLengthValidation = tickets?.length ? true : false;

  return (
    <>
      <div className="fixed top-10 mx-auto left-0 right-0 px-4 rounded bg-red-800 font-semibold text-xl max-w-max">
        Total: {" "}
        <span>
          {totalMinutes}{" "}
        </span>
        Minutes
      </div>
      <div className="w-[1000px] bg-[#18181B] min-h-[493px] p-4 border border-white/10 rounded-md">
        <div className="bg-zinc-800 p-4 flex items-center justify-between child:w-full child:flex child:items-center rounded-md child:justify-center child:h-7">
          {columnsOpts.map(
            (item) =>
              item.active && (
                <div key={item.id}>
                  <p className="uppercase">{item.title}</p>
                </div>
              )
          )}
          <div></div>
        </div>
        <div className="h-[450px]">
          {ticketsLengthValidation ? (
            <div className="mt-1">
              {paginatedItems?.map((ticket, key) => (
                <div
                  key={key}
                  className="even:bg-zinc-800 child:w-full child:flex child:items-center child:justify-center w-full flex items-center justify-between first:mt-2 rounded-lg h-16"
                >
                  {columnsOpts.map((item) =>
                    item.active ? (
                      <div>
                        <p>
                          {item.title == "id" ? (
                            <span className="text-sm select-none">
                              {ticket.id}
                            </span>
                          ) : item.title == "minutes" ? (
                            <span className="">{ticket.minutes}</span>
                          ) : (
                            item.title == "Quest At" && "s"
                          )}
                        </p>
                      </div>
                    ) : null
                  )}
                  <div className="gap-2">
                    <button className="text-zinc-400">
                      <LuEye />
                    </button>
                    <button className="text-zinc-400">
                      <MdOutlineModeEdit />
                    </button>
                    <button onClick={onOpen} className="text-red-600">
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex text-zinc-500 my-10 items-center justify-center">
              <p>There is no items to show</p>
            </div>
          )}
        </div>
        <div>
          <ButtonsGroup>
            <Buttons />
          </ButtonsGroup>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Remove a ticket</ModalHeader>
      </Modal>
    </>
  );
};

export default Table;
