"use client";

import ProtectedRoute from "@/context/ProtectedRoute";
import { useParams } from "next/navigation";
import axios from "axios";
const TagPage = () => {
  const { tagname } = useParams();
 
  return (
    <ProtectedRoute>
    <div>
      <h1>{tagname}</h1>
      <span>feature coming soon</span>
    </div>
    </ProtectedRoute>
  );
};

export default TagPage;