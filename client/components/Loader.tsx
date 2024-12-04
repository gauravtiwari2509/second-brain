import React from "react";

const Loader = () => (
  <div className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
    <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 w-16 h-16 rounded-full"></div>
  </div>
);

export default Loader;
