import { headers } from "next/headers";

async function getStore() {
  try {
    const requestHeaders = await headers();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/stores/get-store`,
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
    return json.data;
  } catch {
    return null;
  }
}

export default getStore;
