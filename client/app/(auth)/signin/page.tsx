"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/loadingContext";
import Loader from "@/components/Loader";

const AddContentElement = "w-full flex justify-between items-center gap-4";
const AddContentElementLabel = "w-full flex justify-between items-center";
const AddContentElementInput = "bg-gray-300 rounded p-2 text-base";

const SignInPage = () => {
  const router = useRouter();
  const { accessToken, setAccessToken } = useAuth();
  const { isLoading, setLoading } = useLoading();
  const [userSignupData, setUserSignupData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSignupData({ ...userSignupData, [name]: value });
  };

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = userSignupData;

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8000/api/v1/signin", {
        username,
        password,
      });

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      setAccessToken(response.data.accessToken);

      setUserSignupData({ username: "", password: "" });
      router.push("/");
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setUserSignupData({ username: "", password: "" });
    setErrorMessage(null);
    router.push("/");
  };

  return (
    <div className="w-screen h-screen backdrop-blur-md backdrop-brightness-90 bg-black/40 z-50 fixed flex justify-center items-center">
      {isLoading && <Loader />}
      <form
        onSubmit={handleSigninSubmit}
        className="flex flex-col bg-[#FFFFFFE6] px-4 py-6 gap-6 justify-center items-center rounded-xl border text-lg"
      >
        <div className={AddContentElement}>
          <label htmlFor="username" className={AddContentElementLabel}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userSignupData.username}
            required
            onChange={handleChange}
            className={AddContentElementInput}
          />
        </div>
        <div className={AddContentElement}>
          <label htmlFor="password" className={AddContentElementLabel}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userSignupData.password}
            required
            onChange={handleChange}
            className={AddContentElementInput}
          />
        </div>

        {errorMessage && (
          <div className="text-red-600 text-center">{errorMessage}</div>
        )}

        <div className="flex gap-6">
          <button
            type="submit"
            className="bg-violet-800 text-white py-2 px-3 rounded-md"
          >
            Sign In
          </button>

          <button
            type="button"
            className="bg-violet-800 text-white py-2 px-3 rounded-md"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
