"use client";
import React from "react";
import Navbar from "./Navbar";
import ContentCard from "./ContentCard";
import { useLoading } from "@/context/loadingContext";
import Loader from "./Loader";
import { useContent } from "@/context/ContentContext";
import ModNavbar from "./MobNavbar";

const ContentBox = () => {
  const { content, deleteContent, errorMessage } = useContent();
  const { isLoading } = useLoading();

  return (
    <div className="w-full pt-8 px-4 md:px-6 lg:px-8 flex flex-col gap-8">
      {isLoading && <Loader />}
      <div className="max-md:hidden">
        <Navbar />
      </div>
      <div className="md:hidden">
        <ModNavbar />
      </div>
      <div>
        <div className="grid gap-4 max-md:justify-items-center grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {content.length > 0 ? (
            content.map((item) => (
              <div key={item._id}>
                <ContentCard
                  link={item.link}
                  type={item.type}
                  title={item.title}
                  tags={item.tags}
                  timestamp={item.createdAt}
                  onDelete={() => deleteContent(item._id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-sm md:text-base text-gray-600">
              !! No content available
            </div>
          )}
        </div>
        {errorMessage && (
          <div className="text-red-600 text-center text-sm md:text-base">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentBox;
