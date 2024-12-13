"use client";
import TableContext from "@/utils/contexts/tableContext";
import React, { useState } from "react";
import {
  Modal,
  useDisclosure,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Header from "@/layouts/Header";
import Table from "./Table";

const TableContainer = ({ tickets, ticketGen }) => {
  const route = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const colUpdate = (target) => {
    let newArr = [...columnsOpts];
    newArr.map((item) => {
      if (target.id == item.id) item.active = !target.active;
    });

    setColumnsOpts(newArr);
  };

  const [sortBy, setSortBy] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    ID: null,
    Minutes: null,
    "Quest At": null,
    "Answer At": null,
  });

  const [columnsOpts, setColumnsOpts] = useState([
    {
      id: crypto.randomUUID(),
      title: "id",
      active: true,
      fn: colUpdate,
    },
    {
      id: crypto.randomUUID(),
      title: "minutes",
      active: true,
      fn: colUpdate,
    },
    {
      id: crypto.randomUUID(),
      title: "Quest At",
      active: false,
      fn: colUpdate,
    },
    {
      id: crypto.randomUUID(),
      title: "Answer At",
      active: false,
      fn: colUpdate,
    },
  ]);

  const switchSortTab = (newTab) => {
    let newArr = [...sorts];
    newArr.map((sort) => {
      if (sort.id == newTab.id) {
        sort.active = true;
      } else {
        sort.active = false;
      }
    });
    setSorts(newArr);
  };

  const [sorts, setSorts] = useState([
    {
      id: crypto.randomUUID(),
      title: "Default",
      fn: switchSortTab,
      active: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Highest",
      fn: switchSortTab,
      active: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Lowest",
      fn: switchSortTab,
      active: false,
    },
  ]);

  const createTicket = async () => {
    const result = await ticketGen(inputsValue);
    if (result.res == 201) {
      onClose();
      toast.success("Ticket generated successfully !");
      route.refresh();
    }
  };

  return (
    <TableContext.Provider
      value={{
        columnsOpts,
        setColumnsOpts,
        sorts,
        setSorts,
        modal: {
          isOpen,
          onClose,
          onOpen,
        },
      }}
    >
      <Header />
      <Table tickets={tickets} />
      <Modal
        classNames={{
          closeButton: "top-3 right-3",
          base: "bg-black",
          body: "border-y border-white/10 py-6",
          footer: "gap-1",
        }}
        onClose={onClose}
        size="2xl"
        isOpen={isOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create an ticket
              </ModalHeader>
              <ModalBody>
                {columnsOpts.map(
                  (item) =>
                    item.active && (
                      <div>
                        <input
                          onChange={(e) => {
                            let value = e.target.value;
                            setInputsValue((prev) => ({
                              ...prev,
                              [item.title]: value,
                            }));
                          }}
                          type="text"
                          className="w-full px-4 rounded-md bg-zinc-500/5 outline-none h-14 border border-white/5"
                          placeholder={`Enter the Ticket ${item.title}`}
                        />
                      </div>
                    )
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="shadow" onClick={onClose} color="danger">
                  Close
                </Button>
                <Button onClick={createTicket}>Create</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </TableContext.Provider>
  );
};

export default TableContainer;
