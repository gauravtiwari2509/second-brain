"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col justify-between">
      <div className="bg-violet-800 text-white w-full px-8 text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">Second Brain</span>
        </h1>
        <p className="text-lg mb-8">
          Manage, organize, and save your favorite links, videos, articles, and
          more all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className="bg-yellow-300 text-violet-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              router.push("/signin");
            }}
            className="bg-white text-violet-800 px-6 py-3 rounded-lg font-semibold border border-yellow-300 hover:bg-gray-200"
          >
            Log In
          </button>
        </div>
      </div>

      <div className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold text-violet-800 mb-6">
          Why Use Second Brain?
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Save Links</h3>
            <p>Keep track of your favorite links and access them anytime.</p>
          </div>
          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Organize Content</h3>
            <p>Categorize your content by tags and types for easy retrieval.</p>
          </div>
          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Share with Others</h3>
            <p>Easily share your curated content with friends or teammates.</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-3 text-center w-screen">
        <p>&copy; 2024 Second Brain. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
