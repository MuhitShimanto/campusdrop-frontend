
export const getAllCategories = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
        {
            method: "GET",
            next: {
                tags: ["categories"],
                revalidate: 3600,
            }
        },
    )
    const result = await response.json();
    return result.data;
}

export type Category = {
    category_id: string;
    name: string;
    slug: string;
}