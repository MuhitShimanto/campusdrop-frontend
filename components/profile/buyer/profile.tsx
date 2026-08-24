import { User } from "@/types/user";
import { ProfileForm } from "./profile-form";

type ProfileData = {
  name: string;
  username: string;
  avatar: string;
  university_email: string;
  account_status: "active" | "inactive" | "suspended";
  is_verified: boolean;
};

const profile: ProfileData = {
  name: "Muhitul Islam",
  username: "muhitshimanto",
  avatar: "https://avatars.githubusercontent.com/u/12345634?v=4",
  university_email: "muhitul.islam@university.edu",
  account_status: "active",
  is_verified: true,
};

export function Profile({ user }: { user: User }) {
  return (
    <main className="min-h-screen bg-paper-0 text-ink-900">
      <div className="mx-auto  px-6 py-12 sm:px-10">
        <header className="border-b border-ink-150 pb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="font-heading text-display-l text-ink-900">
                Profile settings
              </h1>

              <p className="mt-2 text-body-s text-ink-500">
                Manage your student ID and public details.
              </p>
            </div>

            <button
              type="submit"
              form="profile-settings"
              className="
                shrink-0
                rounded-md
                bg-marigold-600
                px-5
                py-2
                font-sans
                text-caption
                font-semibold
                uppercase
                tracking-caption
                text-ink-900
                transition-colors
                hover:bg-marigold-200
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-ring
              "
            >
              Save changes
            </button>
          </div>
        </header>

        <ProfileForm initialProfile={profile} />
      </div>
    </main>
  );
}
