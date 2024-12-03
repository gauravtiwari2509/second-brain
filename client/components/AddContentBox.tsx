"use client";
import {  contentTypes } from "@/constants";
import { useAddContentModal } from "@/context/AddContentModalContext";
import React, { useState } from "react";
const AddContentElement = "w-full flex justify-between items-center gap-4";
const AddContentElementLabel = "w-full flex justify-between items-center";
const AddContentElementInput = "rounded p-2 text-base";

const AddContentBox = () => {
  const { setAddingContent } = useAddContentModal();

  const [formData, setFormData] = useState<Icontent>({
    link: "",
    type: "other",
    title: "",
    tags: [],
  });
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // api request left to write
    // console.log("Form Data:", formData);
    setTimeout(() => {
      handleCancelClick();
    }, 200);
  };

  return (
    <>
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
