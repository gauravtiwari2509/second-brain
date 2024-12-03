"use client";
import React, { useState } from "react";
import { documentType } from "@/constants";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const [selectedDoc, setSelectedDoc] = useState<string>("All Content");
  const { logout } = useAuth();
  const handleItemClick = (label: string) => {
    setSelectedDoc(label);
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="w-full flex flex-col gap-8">
        <div className="flex w-full gap-4 items-center">
          <Image src="/brain.svg" alt="logo" width={40} height={40} />
          <span className="font-bold text-2xl">Second Brain</span>
        </div>
        <div className="w-full flex flex-col bg-red gap-1 p-3">
          {documentType.map((doc) => {
            const isSelected = selectedDoc === doc.label;
            return (
              <div
                key={doc.label}
                className={`flex w-full justify-start items-center gap-3 py-3 pl-2 rounded select-none ${
                  isSelected ? "bg-slate-300" : "hover:bg-gray-200"
                } hover:cursor-pointer`}
                onClick={() => handleItemClick(doc.label)}
              >
                <Image
                  src={doc.icon}
                  alt={doc.label}
                  width={25}
                  height={25}
                  className="pointer-events-none"
                />
                <span className="text-xl font-semibold">{doc.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button
          onClick={logout}
          className="bg-violet-800 text-white py-2 px-3 rounded-md"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
