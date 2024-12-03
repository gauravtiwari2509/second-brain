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
  tags: string[];
  timestamp: string;
};

declare type ContentType =
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
  confirmPassword:string;
};
