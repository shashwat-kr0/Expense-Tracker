import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // ✅ Fixed: Changed `filea[0]` to `files[0]`
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // ✅ Fixed: Correct `URL.createObjectURL()`
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className=" w-24 h-24 flex items-center justify-center bg-purple-100 rounded-full relative">
          {/* Profile Icon */}
          <LuUser className="text-4xl text-primary" />

          {/* Upload Button  */}
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-violet-500 text-white rounded-full absolute bottom-1 right-1 "
            onClick={onChooseFile}
          >
            <LuUpload size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile photo"
            className="w-25 h-25 rounded-full  object-cover"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500  text-white rounded-full absolute bottom-1 right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
