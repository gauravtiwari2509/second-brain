"use client";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="font-bold text-2xl">All Memory</span>
        <div className="flex gap-3">
          <Button text="Share Brain" variant="secondary" iconUrl="/share.svg" />
          <Button text="Add Content" variant="primary" iconUrl="/add.svg" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
