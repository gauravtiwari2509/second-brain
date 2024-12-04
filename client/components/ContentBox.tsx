"use client";
import React, { useEffect, useState } from "react";
// import ContentCard from "./ContentCard";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ContentCard from "./ContentCard";

const ContentBox = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const { accessToken } = useAuth();
  async function getContent() {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/content", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data.data;
      console.log(data);
      console.log(data.tags);
      setContent(data);
    } catch (error: any) {
      console.log("Error message:", error.response.data.message);
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <div className="w-full pt-8 px-6 flex flex-col gap-8">
        <div>
          <Navbar />
        </div>
        <div>
          <div className="grid gap-4 auto-cols-fr grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
            {content
              ? content.map((item) => (
                  <div key={item._id}>
                    <ContentCard
                      link={item.link}
                      type={item.type}
                      title={item.title}
                      tags={item.tags}
                      timestamp={item.createdAt}
                    />
                  </div>
                ))
              : null}
          </div>
          {content.length === 0 && "!! no content found"}
        </div>
      </div>
    </>
  );
};

export default ContentBox;
