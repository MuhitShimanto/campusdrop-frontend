import { Profile } from "@/components/profile/buyer/profile";
import { getSession } from "better-auth/api";

export default async function ProfilePage() {
  const session = await getSession();
  return <Profile user={session?.user} />;
}
