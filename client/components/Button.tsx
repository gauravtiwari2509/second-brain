"use client";
// import { buttonDefaultStyles, buttonVariantClass } from "@/constants";
import Image from "next/image";
import React from "react";

const buttonVariantClass: { primary: string; secondary: string } = {
  primary: "bg-violet-800 text-white",
  secondary: "bg-violet-200 text-violet-800",
};
const buttonDefaultStyles: string =
  "min-w-40  p-3 flex flex-row gap-2 justify-center items-center rounded-xl font-medium ";

const Button = ({ variant, text, iconUrl, onclick }: buttonProps) => {
  return (
    <button
      className={`${buttonVariantClass[variant]} ${buttonDefaultStyles}`}
      onClick={() => onclick()}
    >
      <Image
        src={iconUrl}
        width={18}
        height={18}
        alt="btn"
        className="pointer-events-none select-none"
      />
      <span>{text}</span>
    </button>
  );
};

export default Button;
