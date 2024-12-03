"use client";
import React, { useState } from "react";
const AddContentElement = "w-full flex justify-between items-center gap-4";
const AddContentElementLabel = "w-full flex justify-between items-center";
const AddContentElementInput = "bg-gray-300 rounded p-2 text-base";

const page = () => {
  const [userSignupDadta, setUserSignupData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value }: any = e.target;
    setUserSignupData({ ...userSignupDadta, [name]: value });
  };

  const handleSignupSubmit = (e: any) => {
    e.preventDefault();
    const { username, password } = userSignupDadta;

    //api logic here
  };

  const handleCancelClick = () => {};
  return (
    <div className="w-screen h-screen backdrop-blur-md backdrop-brightness-90 bg-black/40 z-50 fixed flex justify-center items-center">
      <form
        onSubmit={handleSignupSubmit}
        className="flex flex-col bg-[#FFFFFFE6]  px-4 py-6 gap-6 justify-center items-center rounded-xl border text-lg"
      >
        <div className={AddContentElement}>
          <label htmlFor="username" className={AddContentElementLabel}>
            username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userSignupDadta.username}
            required
            onChange={handleChange}
            className={AddContentElementInput}
          />
        </div>
        <div className={AddContentElement}>
          <label htmlFor="username" className={AddContentElementLabel}>
            password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userSignupDadta.password}
            required
            onChange={handleChange}
            className={AddContentElementInput}
          />
        </div>

        <div className="flex gap-6">
          <button
            type="submit"
            className="bg-violet-800 text-white py-2 px-3 rounded-md "
          >
            sign-in
          </button>
          <button
            className="bg-violet-800 text-white py-2 px-3 rounded-md"
            onClick={handleCancelClick}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
