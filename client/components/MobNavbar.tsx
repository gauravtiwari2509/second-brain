"use client";
import React, { useEffect, useState } from "react";
import { useAddContentModal } from "@/context/AddContentModalContext";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import Image from "next/image";
import Button from "./Button";
import { documentType } from "@/constants";

const MobNavbar = () => {
  const { setAddingContent } = useAddContentModal();
  const { accessToken, logout } = useAuth();
  const [sharableLink, setSharableLink] = useState<string | null>(null);
  const { selectedContent, setSelectedContent } = useContent();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const copyLink = () => {
    if (sharableLink) {
      navigator.clipboard
        .writeText(`http://localhost:3000/brain/${sharableLink}`)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.log("Failed to copy link", error);
        });
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handleItemClick = (label: ContentType2) => {
    setSelectedContent(label);
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex w-full gap-2 items-center max-w-[150px] sm:max-w-[150px]">
        <Image src="/brain.svg" alt="logo" width={25} height={25} />
        <span className="font-bold text-sm sm:text-base lg:text-2xl md:text-xl">
          Second Brain
        </span>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        {!sharableLink ? (
          <button
            onClick={handleBrainShare}
            className="flex items-center gap-2"
          >
            <Image
              src="/share.svg"
              width={18}
              height={18}
              alt="share"
              className="cursor-pointer"
            />
          </button>
        ) : (
          <div className="flex items-center gap-2 p-1 rounded-md bg-gray-200">
            <button onClick={copyLink} className="flex items-center gap-1">
              <Image
                src="/copy.svg"
                alt="copy"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </button>

            <button
              onClick={handleBrainShareDelete}
              className="flex items-center gap-1"
            >
              <Image
                src="/delete.svg"
                alt="delete"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </button>
          </div>
        )}
        <div>
          <Button
            text=""
            variant="primary"
            iconUrl="/add.svg"
            onclick={() => setAddingContent(true)}
          />
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Image
              src="/burger.svg"
              alt="burger"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"
            onClick={closeSidebar}
          ></div>
        )}
        {/* fix later:-  use same sidebar after little modification in it */}
        <div
          className={`fixed top-0 left-0 w-[60%] sm:w-1/2 md:w-1/3 bg-white h-full shadow-xl transition-transform ${
            isSidebarOpen ? "transform-none" : "transform -translate-x-full"
          }`}
        >
          <div className="w-full flex flex-col gap-8 p-4">
            <div className="w-full flex flex-col gap-1 p-3">
              {documentType.map((doc) => {
                const isSelected = selectedContent === doc.label;
                return (
                  <div
                    key={doc.label}
                    className={`flex w-full justify-start items-center gap-3 py-3 pl-2 rounded select-none ${
                      isSelected ? "bg-slate-300" : "hover:bg-gray-200"
                    } hover:cursor-pointer`}
                    onClick={() => {
                      if (doc.label === "All Content") {
                        const label: ContentType2 | any = doc.label;
                        handleItemClick(label);
                      } else {
                        const label: ContentType2 | any = doc.label.slice(
                          0,
                          -1
                        );
                        handleItemClick(label);
                      }
                    }}
                  >
                    <Image
                      src={doc.icon}
                      alt={doc.label}
                      width={25}
                      height={25}
                      className="pointer-events-none"
                    />
                    <span className="font-semibold sm:text-sm md:text-sm lg:text-xl">
                      {doc.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              {accessToken && (
                <button
                  onClick={logout}
                  className="bg-violet-800 text-white py-2 px-3 rounded-md"
                >
                  logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobNavbar;
