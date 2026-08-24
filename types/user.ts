export type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  emailVerified: boolean;
  role: "user" | "admin" | "super_admin";
  account_status: "active" | "inactive" | "suspended";
  isVerified: boolean;
  slug?: string;
  sid?: string;
  createdAt: string;
  updatedAt: string;
};