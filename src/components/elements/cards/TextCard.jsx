import React from "react";

const TextCard = ({ 
  text, 
  link = "#", 
  icon: Icon, 
  iconStyle = "text-blue-500 text-3xl", 
  className = "" 
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center w-28 h-28 sm:w-24 sm:h-24 
        rounded-lg border border-gray-300 bg-white shadow-md text-gray-800 
        hover:bg-gray-100 hover:shadow-lg active:scale-95 
        transition-all duration-300 ease-in-out text-center p-2 ${className}`}
    >
      {Icon && <Icon className={`${iconStyle} mb-1`} />}
      <span className="text-sm font-semibold leading-tight break-words px-2">
        {text}
      </span>
    </a>
  );
};

export default TextCard;
