import LoginForm from "@/components/auth/login-form";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}