"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useAddContentModal } from "@/context/AddContentModalContext";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import LinkContainer from "./LinkContainer";
import { useContent } from "@/context/ContentContext";

const Navbar = () => {
  const { setAddingContent } = useAddContentModal();
  const { accessToken } = useAuth();
  const [sharableLink, setSharableLink] = useState(null);
  const { selectedContent } = useContent();
  useEffect(() => {
    const fetchSharableLink = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/brain/share",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSharableLink(response?.data.data);
      } catch (error) {
        setSharableLink(null);
      }
    };

    fetchSharableLink();
  }, [accessToken]);

  const handleBrainShare = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/brain/share",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSharableLink(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrainShareDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/brain/share",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSharableLink(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //issue in layout for sized 765-815px
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 p-4">
      <span className="font-bold text-xl lg:text-3xl text-left">
        {selectedContent} Memory
      </span>
      <div className="flex flex-wrap gap-3 justify-center md:justify-end ">
        {!sharableLink ? (
          <Button
            text="Share Brain"
            variant="secondary"
            iconUrl="/share.svg"
            onclick={() => {
              handleBrainShare();
            }}
          />
        ) : (
          <LinkContainer
            sharableLink={sharableLink}
            onDelete={handleBrainShareDelete}
          />
        )}
        <Button
          text="Add Content"
          variant="primary"
          iconUrl="/add.svg"
          onclick={() => setAddingContent(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
