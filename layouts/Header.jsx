"use client";
import { Button } from "@nextui-org/button";
import React, { useContext } from "react";
import { RiAddLine } from "react-icons/ri";
import Dropdown from "@/components/Buttons/Dropdown";
import TableContext from "@/utils/contexts/tableContext";

const Header = () => {
  const { columnsOpts, sorts, setSorts, modal } = useContext(TableContext);

  
  return (
    <section className="w-[1000px] child:flex child:items-center child:gap-2 max-w-[1000px] mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Dropdown title={"Columns"} items={columnsOpts} />
        <Dropdown title={"Sort by"} items={sorts} />
      </div>
      <div>
        <Button onClick={() => modal.onOpen()} color="default">
          <RiAddLine className="text-lg" />
          <span>Create an ticket</span>
        </Button>
      </div>
    </section>
  );
};

export default Header;
