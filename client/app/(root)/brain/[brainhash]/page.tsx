"use client";

import PublicContentCard from "@/components/PublicContentCard";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TagPage = () => {
  const { brainhash } = useParams();
  const [content, setContent] = useState<any>([]);
  const [contentOwner, setContentOwner] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fetchShareContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/brain/${brainhash}`
      );
      setContent(response.data.data);
      setContentOwner(response.data?.data[0]?.userId?.username);
      console.log(response.data.data);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data.message || "not able to fetch content"
      );
    }
  };
  useEffect(() => {
    fetchShareContent();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-[20vw] h-screen p-4 fixed top-0 left-0 border-gray-300 shadow-lg shadow-gray-300 z-10">
          <Sidebar />
        </div>
        <div className="w-[80vw] ml-[20vw] bg-[#F9FBFC] min-h-screen">
          <div className="w-full pt-8 px-6 gap-8">
            {contentOwner && (
              <span>you are looking at the brain of {contentOwner}</span>
            )}
            <div className="grid gap-4 auto-cols-fr grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] mt-4">
              {content
                ? content.map((item: any) => (
                    <div key={item._id}>
                      <PublicContentCard
                        link={item.link}
                        type={item.type}
                        title={item.title}
                        timestamp={item.createdAt}
                      />
                    </div>
                  ))
                : null}
              {content.length === 0 && "!! no content available"}
              {errorMessage && (
                <div className="text-red-600 text-center">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagPage;
