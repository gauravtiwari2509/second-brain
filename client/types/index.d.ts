declare type docType = { label: string; icon: string };
declare type buttonProps = {
  variant: "primary" | "secondary";
  iconUrl: string;
  text: string;
  onclick: () => void;
};
declare type ContentCardProps = {
  type: string;
  link: string;
  title: string;
  tags: tag[];
  timestamp: string;
  // onDelete: () => Promise<void>;
  onDelete: () => any;
};

declare type ContentType =
  | "image"
  | "video"
  | "article"
  | "audio"
  | "document"
  | "tweet"
  | "other";

declare type ContentType2 =
  | "All Content"
  | "image"
  | "video"
  | "article"
  | "audio"
  | "document"
  | "tweet"
  | "other";
declare type Icontent = {
  link: string;
  type: ContentType;
  title: string;
  tags: Types.ObjectId[];
};

declare type AddContentModalContextType = {
  addingContent: boolean;
  setAddingContent: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type userSignupDataType = {
  username: string;
  password: string;
  confirmPassword: string;
};

declare type User = {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type tag = { _id: string; title: string; _v: number };
declare type ContentItem = {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: tag[];
  createdAt: string;
  updatedAt: string;
  userId: User;
  __v: number;
};

declare type LinkContainerProps = {
  sharableLink: string;
  onDelete: () => void;
};

declare interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

declare interface ContentContextValue {
  content: ContentItem[];
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
  deleteContent: (id: string) => Promise<void>;
  selectedContent: ContentType2;
  setSelectedContent: React.Dispatch<React.SetStateAction<ContentType2>>;
  errorMessage: string | null;
}
