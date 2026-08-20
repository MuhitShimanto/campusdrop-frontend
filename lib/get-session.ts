import { headers } from "next/headers";

async function getSession() {
  try {
    const requestHeaders = await headers();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/get-session`,
      {
        headers: {
          Cookie: requestHeaders.get("cookie") ?? "",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    return null;
  }
}

export default getSession;