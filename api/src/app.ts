import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { UserModel } from "./models/user.model";
import mongoose from "mongoose";
import { ContentModel } from "./models/content.model";
import { verifyJwt } from "./middlewares/middleware";
import { TagModel } from "./models/tag.model";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// required functions
const generateAccessAndRefreshToken = async (
  userId: mongoose.Types.ObjectId
) => {
  try {
    const user: IUser | null = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.error(err);
    throw new Error("Problem generating access and refresh tokens");
  }
};
//routes declaration

app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }
      const existingUser: IUser | null = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }

      const user = new UserModel({
        username,
        password,
      });

      await user.save();

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
      );

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(200)
        .json({
          message: "User successfully signed in",
          accessToken,
          refreshToken,
        });
    } catch (error: any) {
      console.error("Signup error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message || "Something went wrong.",
      });
    }
  }
);

app.post(
  "/api/v1/signin",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }
      const existingUser: IUser | null = await UserModel.findOne({ username });
      if (!existingUser) {
        return res.status(400).json({
          message: "no user found",
        });
      }

      const isPasswordValid = await existingUser.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        existingUser._id
      );

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(200) // Send the response with status 200 (OK), since the user signed in successfully
        .json({
          message: "User successfully signed in",
          accessToken,
          refreshToken,
        });
    } catch (error: any) {
      console.error("Signin error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message || "Something went wrong.",
      });
    }
  }
);
app.post(
  "/api/v1/logout",
  verifyJwt,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { user } = req;

      if (user) {
        await UserModel.findByIdAndUpdate(user._id, {
          $unset: { refreshToken: "" },
        });
      }

      res
        .clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "strict",
        })
        .clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: "strict",
        });

      return res.status(200).json({
        message: "User successfully logged out",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message || "Something went wrong.",
      });
    }
  }
);

app.post(
  "/api/v1/content",
  verifyJwt,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { link, type, title, tags } = req.body;
      const userId = req.user?._id;
      if (!link || !type || !title || !tags) {
        return res.status(400).json({
          message: "all field required",
        });
      }

      const validContentTypes: ContentType[] = [
        "image",
        "video",
        "article",
        "audio",
        "document",
        "tweet",
        "other",
      ];
      if (!validContentTypes.includes(type)) {
        return res.status(400).json({
          message: "Invalid content type",
        });
      }

      const tagDocuments = await Promise.all(
        tags.map(async (tagName: string) => {
          let tag = await TagModel.findOne({ title: tagName });

          if (!tag) {
            tag = new TagModel({ title: tagName });
            await tag.save();
          }

          return tag._id;
        })
      );

      ContentModel.create({
        link,
        type,
        title,
        tags: tagDocuments,
        userId,
      });
      res.status(200).json({
        message: "content created successfully",
      });
    } catch (error: any) {
      console.error("content creation error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message || "Something went wrong.",
      });
    }
  }
);

app.get("/api/v1/content", verifyJwt, async (req, res): Promise<any> => {
  try {
    const userId = req?.user?._id;
    const content = await ContentModel.find({ userId })
      .select("-tags")
      .populate({
        path: "userId",
        model: "User",
        select: "-password -refreshToken",
      });

    if (content.length === 0) {
      return res.status(200).json({
        data: [],
        message: "no content found",
      });
    }
    res.status(200).json({
      data: content,
      message: `${content.length} content found`,
    });
  } catch (error: any) {
    console.log("error occured while fetching content", error);
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }
});

app.delete(
  "/api/v1/content/:contentId",
  verifyJwt,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { contentId } = req.params;

      if (!contentId) {
        return res.status(400).json({ message: "Content ID is required" });
      }

      const content = await ContentModel.findById(contentId);

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      // Ensuring the content belongs to the authenticated user
      if (content.userId.toString() !== req.user?._id.toString()) {
        return res.status(403).json({
          message: "You do not have permission to delete this content",
        });
      }

      await content.deleteOne();
      res.status(200).json({ message: "Content deleted successfully" });
    } catch (error: any) {
      console.log("Error occurred while deleting content:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.post(
  "/api/v1/refresh",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { refreshToken } = req.cookies;
      const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
      if (!REFRESH_TOKEN_SECRET) {
        console.log("no refresh token scret found");
        return;
      }
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is missing" });
      }

      const decoded: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const user = await UserModel.findById(decoded._id);

      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshToken(user._id);

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ message: "Tokens refreshed successfully" });
    } catch (err: any) {
      return res.status(401).json({
        message: "Invalid or expired refresh token",
        error: err.message,
      });
    }
  }
);

export { app };
