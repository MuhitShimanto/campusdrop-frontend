import { z } from "zod";
import { createDropImageSchema } from "@/lib/validations/drop_image";

export type CreateListingImageInput = z.infer<
  typeof createDropImageSchema
>;

export type CreateListingImageResponse = {
  success: boolean;
  message?: string;
};

export async function createListingImage(
  data: CreateListingImageInput,
): Promise<CreateListingImageResponse> {
  const validatedData = createDropImageSchema.parse(data);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/drop-images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedData),
  });

  if (!response.ok) {
    let errorMessage = "Failed to create listing image.";

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Keep the default error message if response is not JSON.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}