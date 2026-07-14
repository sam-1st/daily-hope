export type Encouragement = {
  id: string;
  slug: string;
  title: string;
  scripture: string;
  scriptureText?: string;
  excerpt: string;
  body: string;
  date: string; // ISO date
  likes: number;
  featured?: boolean;
};

export type Testimony = {
  id: string;
  name?: string | null;
  content: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
};
