"use client";
import React from "react";
import { documentType } from "@/constants";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";

const Sidebar = () => {
  const { selectedContent, setSelectedContent } = useContent();
  const { logout, accessToken } = useAuth();
  const handleItemClick = (label: ContentType2) => {
    setSelectedContent(label);
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="w-full flex flex-col gap-8">
        <div className="flex w-full gap-4 items-center">
          <Image src="/brain.svg" alt="logo" width={40} height={40} />
          <span className="font-bold lg:text-2xl md:text-xl ">Second Brain</span>
        </div>
        <div className="w-full flex flex-col bg-red gap-1 p-3">
          {documentType.map((doc) => {
            const isSelected = selectedContent === doc.label;
            return (
              <div
                key={doc.label}
                className={`flex w-full justify-start items-center gap-3 py-3 pl-2 rounded select-none ${
                  isSelected ? "bg-slate-300" : "hover:bg-gray-200"
                } hover:cursor-pointer`}
                onClick={() => {
                  if (doc.label === "All Content") {
                    const label: ContentType2 | any = doc.label;
                    handleItemClick(label);
                  } else {
                    const label: ContentType2 | any = doc.label.slice(0, -1);
                    handleItemClick(label);
                  }
                }}
              >
                <Image
                  src={doc.icon}
                  alt={doc.label}
                  width={25}
                  height={25}
                  className="pointer-events-none"
                />
                <span className=" font-semibold sm:text-sm md:text-sm lg:text-xl">
                  {doc.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {accessToken && (
          <button
            onClick={logout}
            className="bg-violet-800 text-white py-2 px-3 rounded-md"
          >
            logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
