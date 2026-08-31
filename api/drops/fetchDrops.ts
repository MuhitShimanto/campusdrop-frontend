export const fetchDrops = async (listing_id: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/drops`,
        {
            method: "GET",
        }
    );
    const json = await response.json();
    return json.data;
}