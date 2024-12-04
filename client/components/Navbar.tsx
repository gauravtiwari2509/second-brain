"use client";
import React from "react";
import Button from "./Button";
import { useAddContentModal } from "@/context/AddContentModalContext";

const Navbar = () => {
  const { setAddingContent } = useAddContentModal();
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="font-bold text-2xl">All Memory</span>
        <div className="flex gap-3">
          {/* <button className="border p-2 bg-violet-200 text-violet-800 rounded-2xl">refresh</button> */}
          <Button
            text="Share Brain"
            variant="secondary"
            iconUrl="/share.svg"
            onclick={() => {}}
          />
          <Button
            text="Add Content"
            variant="primary"
            iconUrl="/add.svg"
            onclick={() => setAddingContent(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
