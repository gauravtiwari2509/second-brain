import Image from "next/image";
import React from "react";

const LinkContainer: React.FC<LinkContainerProps> = ({
  sharableLink,
  onDelete,
}) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(`https://second-brain-chi.vercel.app/brain/${sharableLink}`)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.log("Failed to copy link", error);
      });
  };

  return (
    <div className="flex items-center gap-2 bg-violet-200 text-violet-800 border p-3 rounded-xl w-[150px] md:w-[200px] lg:w-[250px]">
    <span className="text-sm truncate cursor-pointer max-w-[60%] md:max-w-[70%] lg:max-w-[80%]">
      {`https://second-brain-chi.vercel.app/brain/${sharableLink}`}
    </span>
 
    <Image
      src="/copy.svg"
      alt="copy"
      width={20}
      height={20}
      className="hover:cursor-pointer"
      onClick={copyLink}
    />
  
    <button
      className="text-sm text-red-600 hover:text-red-800 flex-shrink-0"
      onClick={onDelete}
    >
      <Image
        src="/delete.svg"
        alt="delete"
        width={20}
        height={20}
        className="hover:cursor-pointer"
      />
    </button>
  </div>
  
  
  );
};

export default LinkContainer;
