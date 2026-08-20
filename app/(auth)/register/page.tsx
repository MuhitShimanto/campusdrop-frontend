import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Register with your university account
          </p>
        </div>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
