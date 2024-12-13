"use client";
import React from "react";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const usePagination = ({ initItems, itemsPerView }) => {
  const [current, setCurrent] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextValid, setNextValid] = useState(true);
  const [prevValid, setPrevValid] = useState(true);
  let totalPages = Math.ceil(initItems?.length / itemsPerView);

  const init = () => {
    let lastIndex = current * itemsPerView;
    let startIndex = lastIndex - itemsPerView;
    setPaginatedItems(initItems.slice(startIndex, lastIndex));

    // به‌روزرسانی وضعیت دکمه Next
    if (current >= totalPages) {
      setNextValid(false);
    } else {
      setNextValid(true);
    }

    // به‌روزرسانی وضعیت دکمه Prev
    if (current > 1) {
      setPrevValid(true); // Enable prev button if we're on a page after the first one
    } else {
      setPrevValid(false); // Disable prev button if we're on the first page
    }
  };

  const goToLastPage = () => setCurrent(totalPages);

  useEffect(() => {
    goToLastPage()
    init();
  }, []);

  useEffect(() => init(), [current]);

  const changePage = (newPage) => () => setCurrent(newPage);

  const Buttons = () => {
    let btns = [];
    const Button = ({ index, ...args }) => <div {...args}>{index}</div>;

    for (let i = 1; i <= totalPages; i++) {
      btns.push(
        <Button
          className={`${
            i == current &&
            "bg-[#006FEE] hover:bg-[#0651d4!important] shadow-md shadow-[#006FEE]/50 rounded-xl"
          } cursor-pointer duration-150`}
          onClick={changePage(i)}
          index={i}
        />
      );
    }

    return btns;
  };

  const NextButton = () => {
    const action = () => {
      if (current >= totalPages) {
        setNextValid(false);
        return;
      } else {
        setNextValid(true);
        setCurrent((prev) => prev + 1);
      }
    };
    return (
      <button
        disable={nextValid}
        onClick={() => action()}
        className={`px-[8px!important] ${
          !nextValid ? "cursor-not-allowed" : ""
        }`}
      >
        <MdKeyboardArrowRight />
      </button>
    );
  };

  const PrevButton = () => {
    const action = () => {
      if (current > 1) {
        setCurrent((prev) => prev - 1);
      } else {
        setPrevValid(false);
      }
    };

    return (
      <button
        disabled={!prevValid}
        onClick={action}
        className={`px-[8px!important] ${
          !prevValid ? "cursor-not-allowed" : ""
        }`}
      >
        <MdKeyboardArrowLeft />
      </button>
    );
  };

  const ButtonsGroup = ({ children }) => (
    <div className="flex items-center max-w-max child:min-h-full rounded-lg child:flex child-hover:bg-zinc-700 child:items-center child:justify-center child:px-4 p-0 h-8 overflow-hidden mt-10 justify-center mx-auto bg-[#27272A]">
      <PrevButton />
      {children}
      <NextButton />
    </div>
  );

  return { Buttons, paginatedItems, ButtonsGroup, goToLastPage };
};

export default usePagination;
