import React from "react";
const CharAvatar = ({ fullName, width, height, style }) => {
    return <div className={`${width || 'w-12'} ${style || ''} flexm item-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
    {getInitials(fullName || "")}
    </div>;

};

export default CharAvatar;