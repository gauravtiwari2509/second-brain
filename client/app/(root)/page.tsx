"use client";
import React from "react";
import AddContentBox from "@/components/AddContentBox";
import ContentBox from "@/components/ContentBox";
import Sidebar from "@/components/Sidebar";
import { useAddContentModal } from "@/context/AddContentModalContext";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/context/ProtectedRoute";
import LandingPage from "@/components/LandingPage";

function Page() {
  const { addingContent } = useAddContentModal();
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <LandingPage />;
  }

  return (
    <ProtectedRoute>
      <div>
        {addingContent && (
          <div className="w-screen h-screen backdrop-blur-md backdrop-brightness-90 bg-black/40 z-50 fixed flex justify-center items-center">
            <AddContentBox />
          </div>
        )}
        <div className="flex">
          <div className="w-[20vw] h-screen p-4 fixed top-0 left-0 border-gray-300 shadow-lg shadow-gray-300 z-10">
            <Sidebar />
          </div>
          <div className="w-[80vw] ml-[20vw] bg-[#F9FBFC] min-h-screen">
            <ContentBox />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;
