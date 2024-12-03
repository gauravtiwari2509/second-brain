"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(
    Cookies.get("refreshToken") || null
  );

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setAccessTokenState(token);
    }
  }, []);

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessTokenState(null);
    setRefreshTokenState(null);
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/refresh",
        { refreshToken }
      );
      Cookies.set("accessToken", data.accessToken, { expires: 1 / 24 });
      setAccessTokenState(data.accessToken);
    } catch (error) {
      console.error("Refresh token failed", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        logout,
        refreshAccessToken,
        setAccessToken: setAccessTokenState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
