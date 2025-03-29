import React from "react";

const ImageCard = ({ name, imageUrl, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center gap-2 hover:opacity-80 transition duration-300 cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-full border border-gray-300 shadow-sm object-cover"
      />
      <span className="text-gray-800 text-sm font-medium max-w-[100px] truncate">
        {name}
      </span>
    </a>
  );
};

export default ImageCard;
