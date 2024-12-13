"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const Dropdown = ({ title, items }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div className="dropdown-container relative">
      <Button
        className="text-white"
        startContent={<MdKeyboardArrowDown className="text-white" />}
        variant="flat"
        onClick={toggleVisibility}
      >
        {title}
      </Button>
      <div
        className={`duration-150 ${
          visible ? "scale-y-100" : "scale-y-0"
        } absolute w-[180px] text-sm child:flex select-none child:items-center child:gap-1.5 p-2 bg-zinc-900 top-[110%] rounded-md border border-white/5 shadow-md`}
      >
        {items?.map((item) => (
          <div
            onClick={() => item.fn(item)}
            className="duration-150 h-10  rounded-md hover:bg-zinc-800 cursor-pointer px-2"
          >
            {item.active && <FaCheck />}
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
