export const fetchPublicStoreDetails = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/stores/${slug}`,
      {
        next: {
          revalidate: 3600,
          tags: [`store:${slug}`],
        },
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
};