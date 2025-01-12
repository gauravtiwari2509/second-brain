"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useLoading } from "./loadingContext";
import axios from "axios";
import { useAuth } from "./AuthContext";

const contentContext = createContext<ContentContextValue | undefined>(
  undefined
);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [originalContent, setOriginalContent] = useState<ContentItem[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] =
    useState<ContentType2>("All Content");
  const { setLoading } = useLoading();
  const { accessToken } = useAuth();
  const getContent = async () => {
    try {
      setLoading(true);
      if (!accessToken) {
        return;
      }
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!baseURL) {
        setErrorMessage("API base URL is not defined.");
        return;
      }
      const response = await axios.get(`${baseURL}/content`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOriginalContent(response.data.data);
      if (selectedContent === "All Content") {
        setContent(originalContent);
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const deleteContent = async (id: string) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseURL) {
      setErrorMessage("API base URL is not defined.");
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/content/${id}`, {
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
  }, [accessToken]);

  const filterContentFun = () => {
    if (selectedContent === "All Content") {
      setContent(originalContent);
    } else {
      const data = originalContent.filter((item) => {
        return item.type === selectedContent;
      });
      setContent(data);
    }
  };
  useEffect(() => {
    filterContentFun();
  }, [selectedContent, originalContent]);

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
