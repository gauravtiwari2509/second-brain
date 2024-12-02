"use client";
import React, { useEffect, useState } from "react";
// import ContentCard from "./ContentCard";
import Navbar from "./Navbar";
import axios from "axios";

const ContentBox = () => {
  // const [content, setContent] = useState(null);
  // useEffect(() => {
  //   async function getContent() {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:8000/api/v1/content"
  //       );
  //       console.log(data);
  //     } catch (error: any) {
  //       console.log("Error message:", error.response.data.message);
  //     }
  //   }
  //   getContent();
  // }, []);

  return (
    <>
      <div className="w-full pt-8 px-6 flex flex-col gap-8">
        <div>
          <Navbar />
        </div>
        <div>
          <div className="grid gap-4 auto-cols-fr grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]"></div>
        </div>
      </div>
    </>
  );
};

export default ContentBox;
