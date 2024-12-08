"use client";

import PublicContentCard from "@/components/PublicContentCard";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define ContentType type
type ContentType =
  | "image"
  | "video"
  | "article"
  | "audio"
  | "document"
  | "tweet"
  | "other"
  | "all";

const TagPage = () => {
  const { brainhash } = useParams();
  const [content, setContent] = useState<ContentType[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentType[]>([]);
  const [contentOwner, setContentOwner] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ContentType>("all");

  // Fetch content based on brainhash
  const fetchShareContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/brain/${brainhash}`
      );
      const fetchedContent = response.data.data;
      setContent(fetchedContent);
      setFilteredContent(fetchedContent);
      setContentOwner(response.data?.data[0]?.userId?.username);
      console.log(fetchedContent);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data.message || "Not able to fetch content"
      );
    }
  };

  const handleFilterChange = (type: ContentType) => {
    setSelectedType(type);
    if (type === "all") {
      setFilteredContent(content);
    } else {
      const filtered = content.filter((item: any) => item.type === type);
      setFilteredContent(filtered);
    }
  };

  useEffect(() => {
    fetchShareContent();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-[20vw] h-screen p-4 fixed top-0 left-0 border-gray-300 shadow-lg shadow-gray-300 z-10">
          <select
            value={selectedType}
            onChange={(e) => handleFilterChange(e.target.value as ContentType)}
            className="w-full p-2 bg-blue-100 text-gray-800 rounded"
          >
            <option value="all">All Content</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
            <option value="tweet">Tweet</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-[80vw] ml-[20vw] bg-[#F9FBFC] min-h-screen">
          <div className="w-full pt-8 px-6 gap-8">
            {contentOwner && (
              <span>you are looking at the brain of {contentOwner}</span>
            )}
            <div className="grid gap-4 auto-cols-fr grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] mt-4">
              {filteredContent.length > 0 ? (
                filteredContent.map((item: any) => (
                  <div key={item._id}>
                    <PublicContentCard
                      link={item.link}
                      type={item.type}
                      title={item.title}
                      timestamp={item.createdAt}
                    />
                  </div>
                ))
              ) : (
                <div>No content available</div>
              )}
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
