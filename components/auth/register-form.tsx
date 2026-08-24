"use client";

import { authClient } from "@/lib/auth-client";
import { CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type RegisterFormValues = {
  university_email: string;
  name: string;
  slug: string;
  password: string;
  terms: boolean;
};

type UsernameAvailabilityResponse = {
  status: string;
  message: string;
  data: {
    available: boolean;
  };
};

type UsernameAvailability =
  | "idle"
  | "checking"
  | "available"
  | "unavailable"
  | "error";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameAvailability, setUsernameAvailability] =
    useState<UsernameAvailability>("idle");
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] =
    useState("");
  const [error, setError] = useState("");

  // Ignore stale username availability responses
  const usernameCheckId = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormValues>({
    mode: "onBlur",
    defaultValues: {
      university_email: "",
      name: "",
      slug: "",
      password: "",
      terms: false,
    },
  });

  const slug = useWatch({
    control,
    name: "slug",
  });

  const checkUsernameAvailability = async (username: string) => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
      return;
    }

    const checkId = ++usernameCheckId.current;

    setUsernameAvailability("checking");
    setUsernameAvailabilityMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/check-username?username=${encodeURIComponent(
          normalizedUsername,
        )}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to check username availability.");
      }

      const result: UsernameAvailabilityResponse = await response.json();

      // Ignore stale responses.
      if (checkId !== usernameCheckId.current) {
        return;
      }

      if (result.data?.available) {
        setUsernameAvailability("available");
        setUsernameAvailabilityMessage("Username is available.");
      } else {
        setUsernameAvailability("unavailable");
        setUsernameAvailabilityMessage(
          result.message ||
            "This username is already taken. Please choose another one.",
        );
      }
    } catch (error) {
      console.error("Username availability check failed:", error);

      if (checkId === usernameCheckId.current) {
        setUsernameAvailability("error");
        setUsernameAvailabilityMessage(
          "Unable to check username availability.",
        );
      }
    }
  };

  /**
   * Debounced username availability check.
   *
   * The API request is made 600ms after the user
   * stops typing.
   */
  useEffect(() => {
    const username = slug?.trim() ?? "";

    // Invalidate any request that belongs to an older username.
    usernameCheckId.current++;

    // Empty username.
    if (!username) {
      setUsernameAvailability("idle");
      setUsernameAvailabilityMessage("");
      return;
    }

    // Invalid username format.
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameAvailability("idle");
      setUsernameAvailabilityMessage("");
      return;
    }

    // The username changed, so the previous result is no longer valid.
    setUsernameAvailability("checking");
    setUsernameAvailabilityMessage("");

    const timeout = setTimeout(() => {
      void checkUsernameAvailability(username);
    }, 600);

    // Cancel the timer if the user types again.
    return () => {
      clearTimeout(timeout);
    };
  }, [slug]);

  const handleRegister = async (form: RegisterFormValues) => {
    setError("");
    if (usernameAvailability === "checking") {
      setError("Please wait until we finish checking your username.");
      return;
    }

    if (usernameAvailability === "unavailable") {
      setError(
        usernameAvailabilityMessage ||
          "This username is already taken. Please choose another one.",
      );
      return;
    }

    if (usernameAvailability === "error") {
      setError(
        "We could not verify your username. Please try again before continuing.",
      );
      return;
    }

    if (usernameAvailability !== "available") {
      setError("Please enter a valid username.");
      return;
    }

    setLoading(true);

    try {
      // First request: Register with Better Auth.
      const { error } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.university_email.trim().toLowerCase(),
        password: form.password,
        callbackURL: process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL,
      });

      if (error) {
        setError(error.message || "Unable to create your account.");
        return;
      }

      // Second request: Update profile.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: form.slug.trim(),
          }),
        },
      );

      if (!response.ok) {
        setError("Account was created, but we could not update your profile.");
        return;
      }

      toast.success("Account created successfully! You can login now.");

      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL,
      });

      if (result.error) {
        setError(result.error.message || "Google sign-in failed.");
      }
    } catch (error) {
      console.error("Google auth failed:", error);
      setError("Unable to connect to Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const slugRegistration = register("slug", {
    required: "Please enter a username.",
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores.",
    },
  });

  const usernameHasError =
    !!errors.slug ||
    usernameAvailability === "unavailable" ||
    usernameAvailability === "error";

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* University Email */}
      <div>
        <label
          htmlFor="university_email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          University Email
        </label>

        <input
          id="university_email"
          type="email"
          placeholder="student@g.bracu.ac.bd"
          autoComplete="email"
          disabled={loading}
          {...register("university_email", {
            required: "Please enter your university email.",
          })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
        />

        {errors.university_email && (
          <p className="mt-1 text-xs text-red-500">
            {errors.university_email.message}
          </p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          disabled={loading}
          {...register("name", {
            required: "Please enter your full name.",
          })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Username
        </label>

        <div className="relative">
          <input
            id="slug"
            type="text"
            placeholder="john_doe"
            autoComplete="username"
            disabled={loading}
            {...slugRegistration}
            className={`w-full rounded-lg border px-4 py-2.5 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 ${
              usernameHasError
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {/* Username status icon */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            {usernameAvailability === "checking" && (
              <svg
                className="h-5 w-5 animate-spin text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}

            {usernameAvailability === "available" && (
              <CircleCheck
                className="h-5 w-5 text-green-500"
                aria-label="Username is available"
              />
            )}

            {usernameAvailability === "unavailable" && (
              <CircleX
                className="h-5 w-5 text-red-500"
                aria-label="Username is unavailable"
              />
            )}

            {usernameAvailability === "error" && (
              <CircleX
                className="h-5 w-5 text-red-500"
                aria-label="Unable to check username"
              />
            )}
          </div>
        </div>

        {/* React Hook Form validation error */}
        {errors.slug && (
          <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>
        )}

        {/* Username availability message */}
        {!errors.slug && usernameAvailability === "unavailable" && (
          <p className="mt-1 text-xs text-red-500">
            {usernameAvailabilityMessage}
          </p>
        )}

        {!errors.slug && usernameAvailability === "error" && (
          <p className="mt-1 text-xs text-red-500">
            {usernameAvailabilityMessage}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={loading}
            {...register("password", {
              required: "Please enter a password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-20 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password ? (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        ) : (
          <p className="mt-1.5 text-xs text-gray-400">
            Password must be at least 8 characters.
          </p>
        )}
      </div>

      {/* Terms */}
      <div>
        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            disabled={loading}
            {...register("terms", {
              required: "You must agree to the Terms & Conditions.",
            })}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />

          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms & Conditions
            </Link>
          </label>
        </div>

        {errors.terms && (
          <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || usernameAvailability === "checking"}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {usernameAvailability === "checking"
          ? "Checking username..."
          : loading
            ? "Creating account..."
            : "Create account"}
      </button>

      {/* Google */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignin}
        disabled={loading || usernameAvailability === "checking"}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          "Connecting to Google..."
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.19Z"
              />
              <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.33l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.75 9.75 0 0 0 12 21.75Z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.88a5.86 5.86 0 0 1 0-3.76V7.61H3.3a9.75 9.75 0 0 0 0 8.78l3.24-2.51Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.09c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.21 14.62 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.36l3.24 2.51C6.31 7.81 8.46 6.09 12 6.09Z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>
    </form>
  );
}
