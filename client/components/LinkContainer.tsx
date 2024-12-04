import Image from "next/image";
import React from "react";

const LinkContainer: React.FC<LinkContainerProps> = ({
  sharableLink,
  onDelete,
}) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/brain/${sharableLink}`)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.log("Failed to copy link", error);
      });
  };

  return (
    <div className="flex items-center gap-2 bg-violet-200 text-violet-800 border p-3 rounded-xl">
      <span
        className="text-sm truncate max-w-[150px] cursor-pointer"
        onClick={copyLink}
      >
        {`http://localhost:3000/brain/${sharableLink}`}
      </span>

      <button
        className="text-sm text-red-600 hover:text-red-800"
        onClick={onDelete}
      >
        <Image
          src="/delete.svg"
          alt="share"
          width={20}
          height={20}
          className="hover:cursor-pointer"
        />
      </button>
    </div>
  );
};

export default LinkContainer;
