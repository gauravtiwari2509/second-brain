"use client";
import { documentType } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ContentCard = ({
  link,
  type,
  title,
  tags,
  timestamp,
  onDelete,
}: ContentCardProps) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const getIconUrl = (type: string) => {
    const matchedType = documentType.find((doc) => doc.label === `${type}s`);
    return matchedType ? matchedType.icon : "/link.svg";
  };

  const renderEmbed = (link: string, type: string) => {
    if (
      type === "video" &&
      (link.includes("youtube.com") || link.includes("youtu.be"))
    ) {
      let videoId;

      if (link.includes("youtu.be")) {
        videoId = link.split("/").pop()?.split("?")[0];
      } else if (link.includes("youtube.com")) {
        videoId = link.split("v=")[1]?.split("&")[0];
      }

      if (videoId) {
        return (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
    }
    //handling tweet embeed
    if (type === "tweet") {
      const updatedLink = link.replace("x.com", "twitter.com");
      return (
        <blockquote className="twitter-tweet">
          <a href={updatedLink} target="_blank"></a>
        </blockquote>
      );
    }

    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Open Link
      </a>
    );
  };

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  }
  return (
    <>
      <div className="max-w-72 lg:max-w-full flex flex-col gap-2 items-start max-h-fit py-3 px-2 border rounded-xl hover:bg-gray-200">
        <div className="w-full flex items-between justify-start gap-2">
          <div className="w-[80%] flex gap-3 items-center justify-start capitalize ">
            <Image src={getIconUrl(type)} alt={type} width={18} height={18} />
            <span>{title}</span>
          </div>
          <div className="flex w-[20%] items-center justify-end gap-2">
            <Image
              src="/share.svg"
              alt="share"
              width={20}
              height={20}
              className="hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard
                  .writeText(link)
                  .then(() => {
                    alert("Link copied to clipboard!");
                  })
                  .catch((error) => {
                    console.log("Failed to copy link", error);
                  });
              }}
            />
            <Image
              src="/delete.svg"
              alt="delete"
              width={20}
              height={20}
              className="hover:cursor-pointer"
              onClick={() => {
                setDeleteModalVisible(true);
              }}
            />
          </div>
        </div>
        <div className="">{renderEmbed(link, type)}</div>
        <div>
          {tags.map((tag) => {
            return (
              <Link
                href={`/tag/${tag.title}`}
                className="text-blue-600"
                key={`${timestamp}-${tag._id}`}
              >
                #{tag.title}{" "}
              </Link>
            );
          })}
        </div>
        <span>Added on {formatTimestamp(timestamp)}</span>
      </div>

      {isDeleteModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-center mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  onDelete();
                  setDeleteModalVisible(false);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setDeleteModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentCard;
