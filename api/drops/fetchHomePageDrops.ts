export const fetchHomePageDrops = async ({preorderCount, alwaysOnCount}: {preorderCount: number, alwaysOnCount: number}) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/drops?preorder=${preorderCount}&always_on=${alwaysOnCount}`,
        {
            method: "GET",
        }
    );
    const json = await response.json();
    return json.data;
}