"use client";

import ContentBox from "@/components/ContentBox";
import Sidebar from "@/components/Sidebar";

function page() {
  return (
    <>
      <div className="flex">
        <div className="w-[20vw] h-screen p-4 fixed top-0 left-0 border-gray-300 shadow-lg shadow-gray-300 z-10">
          <Sidebar />
        </div>
        <div className="w-[80vw] ml-[20vw] bg-[#F9FBFC] min-h-screen">
          <ContentBox />
        </div>
      </div>
    </>
  );
}
export default page;
