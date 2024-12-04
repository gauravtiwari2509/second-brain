"use client";
import { contentTypes } from "@/constants";
import { useAddContentModal } from "@/context/AddContentModalContext";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useLoading } from "@/context/loadingContext";
const AddContentElement = "w-full flex justify-between items-center gap-4";
const AddContentElementLabel = "w-full flex justify-between items-center";
const AddContentElementInput = "rounded p-2 text-base";

const AddContentBox = () => {
  const { setAddingContent } = useAddContentModal();
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState<Icontent>({
    link: "",
    type: "other",
    title: "",
    tags: [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isLoading, setLoading } = useLoading();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e: any) => {
    const tagsArray = e.target.value
      .split(" ")
      .map((tag: string) => tag.trim());
    setFormData({ ...formData, tags: tagsArray });
  };

  const handleCancelClick = () => {
    setFormData({
      link: "",
      type: "other",
      title: "",
      tags: [],
    });
    setAddingContent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/content",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      handleCancelClick();
    } catch (error: any) {
      // console.log("Error message:", error.response.data.message);
      setErrorMessage(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-[#FFFFFFE6]  px-4 py-6 gap-6 justify-center items-center rounded-xl border text-lg"
      >
        <div className={AddContentElement}>
          <label htmlFor="link" className={AddContentElementLabel}>
            Link:
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
            className={AddContentElementInput}
          />
        </div>

        <div className={AddContentElement}>
          <label htmlFor="type" className={AddContentElementLabel}>
            Type:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={AddContentElementInput}
            required
          >
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={AddContentElement}>
          <label htmlFor="title" className={AddContentElementLabel}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={AddContentElementInput}
            required
          />
        </div>

        <div className={AddContentElement}>
          <label htmlFor="tags" className={AddContentElementLabel}>
            Tags(space-separated):
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(" ")}
            className={AddContentElementInput}
            onChange={handleTagsChange}
          />
        </div>
        {errorMessage && (
          <div className="text-red-600 text-center">{errorMessage}</div>
        )}
        <div className="flex gap-6">
          <button
            type="submit"
            className="bg-violet-800 text-white py-2 px-3 rounded-md "
          >
            Submit
          </button>
          <button
            className="bg-violet-800 text-white py-2 px-3 rounded-md"
            onClick={handleCancelClick}
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddContentBox;
