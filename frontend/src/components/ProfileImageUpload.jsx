import React, { useState, useRef } from 'react';
import defaultProfileImage from '../assets/default-profile.png';

const ProfileImageUpload = ({ onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(defaultProfileImage);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer border-2 border-purple-500 hover:border-purple-700 transition-all duration-300 mb-6"
        onClick={handleClick}
      >
        <img
          src={previewUrl}
          alt="Profile preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
          <svg
            className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-300"
      >
        Upload Image
      </button>
    </div>
  );
};

export default ProfileImageUpload;