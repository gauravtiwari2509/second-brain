"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ContentCard from "./ContentCard";
import { useLoading } from "@/context/loadingContext";
import Loader from "./Loader";

const ContentBox = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const { accessToken } = useAuth();
  const { isLoading, setLoading } = useLoading();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // get content

  async function getContent() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/content", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data.data;
      setContent(data);
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  // delete content
  async function handleDelete(id: string) {
    console.log("request comes");
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setContent((prev) => prev.filter((item) => item._id !== id));
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <div className="w-full pt-8 px-6 flex flex-col gap-8">
        {isLoading && <Loader />}
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
                      onDelete={() => handleDelete(item._id)}
                    />
                  </div>
                ))
              : null}
          </div>
          {content.length === 0 && "!! no content available"}
          {errorMessage && (
            <div className="text-red-600 text-center">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentBox;
