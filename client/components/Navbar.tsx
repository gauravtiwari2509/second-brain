"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useAddContentModal } from "@/context/AddContentModalContext";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import LinkContainer from "./LinkContainer";
const Navbar = () => {
  const { setAddingContent } = useAddContentModal();
  const { accessToken } = useAuth();
  const [sharableLink, setSharableLink] = useState(null);

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
        console.log("Error fetching sharable link", error);
      }
    };

    fetchSharableLink();
  }, [accessToken]);
  const handleBrainShare = async () => {
    console.log("brain sharing come");
    console.log(accessToken);
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
      console.log(response);
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
    <>
      <div className="flex justify-between items-center">
        <span className="font-bold text-2xl">All Memory</span>
        <div className="flex gap-3">
          {/* <button className="border p-2 bg-violet-200 text-violet-800 rounded-2xl">refresh</button> */}
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
    </>
  );
};

export default Navbar;
