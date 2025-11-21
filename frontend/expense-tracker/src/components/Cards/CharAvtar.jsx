import React from "react";
const CharAvatar = ({ fullName = "", width = "w-10", height = "h-10", style = "" }) => {
  const firstLetter = fullName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className={`flex items-center justify-center bg-purple-600 text-white rounded-full ${width} ${height} ${style}`}
    >
      {firstLetter}
    </div>
  );
};

export default CharAvatar;