"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useLoading } from "./loadingContext";
import Cookies from "js-cookie";
import axios from "axios";

const contentContext = createContext<ContentContextValue | undefined>(
  undefined
);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] =
    useState<ContentType2>("All Content");
  const { setLoading } = useLoading();
  const accessToken = Cookies.get("accessToken");

  // Fetch content from the API
  const getContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/content", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setContent(response.data.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const deleteContent = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setContent((prev) => prev.filter((item) => item._id !== id));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (selectedContent === "All Content") {
      getContent();
    } else {
      setContent((prevContent) =>
        prevContent.filter((item) => item.type === selectedContent)
      );
    }
  }, [selectedContent]);

  return (
    <contentContext.Provider
      value={{
        content,
        setContent,
        deleteContent,
        selectedContent,
        setSelectedContent,
        errorMessage,
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(contentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
