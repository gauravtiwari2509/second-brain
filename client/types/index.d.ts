declare type docType = { label: string; icon: string };
declare type buttonProps = {
  variant: "primary" | "secondary";
  iconUrl: string;
  text: string;
};
declare type ContentCardProps = {
  type: string;
  link: string;
  title: string;
  tags: string[];
  timestamp: string;
};

declare type  AuthContextType = {
  user: { username: string } | null;
  accessToken: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
};