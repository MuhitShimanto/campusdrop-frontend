import { useFormContext } from "react-hook-form";
import { Trash2, ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";

import { type FormValues } from "@/lib/validations/listing";
import { Section } from "@/components/ui/section";
import { FieldTooltip } from "@/components/ui/field-tooltip";
import { useEffect, useState } from "react";
import { Category, getAllCategories } from "@/api/categories/getAllCategories";

type ListingDetailsStepProps = {
  imagePreviews: string[];
  activeImage: number;
  setActiveImage: (index: number) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  previousImage: () => void;
  nextImage: () => void;
};

const ListingDetailsStep = ({
  imagePreviews,
  activeImage,
  setActiveImage,
  handleImageChange,
  removeImage,
  previousImage,
  nextImage,
}: ListingDetailsStepProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [categories, setCategories] = useState<Category[]>([]);
  const selectedImages = watch("images");
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response: Category[] = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);
  return (
    <div className="space-y-7 px-6 py-7">
      <Section
        title="Listing details"
        description="Add the information customers need to understand your listing."
      >
        {/* Images */}
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <FieldTooltip content="Add up to 3 images that clearly show your listing. The first image will be used as the primary image.">
              <span className="text-sm font-medium">Listing images</span>
            </FieldTooltip>
            {errors.images && (
              <p className="text-xs text-destructive">
                {errors.images.message}
              </p>
            )}
          </div>

          <div className="relative w-full overflow-hidden rounded-lg border bg-muted/20">
            {selectedImages.length > 0 ? (
              <>
                <div className="relative aspect-[16/7] w-full">
                  <img
                    src={imagePreviews[activeImage]}
                    alt={`Listing image ${activeImage + 1}`}
                    className="size-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(activeImage)}
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/60 text-red-500/80 transition-colors hover:bg-white/80"
                    aria-label="Remove image"
                  >
                    <Trash2 className="size-4" />
                  </button>

                  {selectedImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        className="absolute left-3 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 md:flex"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="size-4" />
                      </button>

                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 md:flex"
                        aria-label="Next image"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {selectedImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`size-1.5 rounded-full transition-colors ${
                          index === activeImage ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t p-2">
                  {imagePreviews.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`relative size-14 shrink-0 overflow-hidden rounded-md border transition-all ${
                        index === activeImage
                          ? "ring-2 ring-primary"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="size-full object-cover"
                      />
                    </button>
                  ))}

                  {selectedImages.length < 3 && (
                    <label className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-md border border-dashed text-muted-foreground transition-colors hover:bg-muted">
                      <ImagePlus className="size-5" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}

                  <span className="ml-auto pr-2 text-xs text-muted-foreground">
                    {selectedImages.length}/3 images
                  </span>
                </div>
              </>
            ) : (
              <label className="flex aspect-[16/7] w-full cursor-pointer flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:bg-muted/50">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <ImagePlus className="size-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Add listing images
                  </p>
                  <p className="mt-1 text-xs">Add up to 3 images</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Name + Category */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="listing-name" className="text-sm font-medium">
              <FieldTooltip content="Give your listing a short, recognizable name that customers will easily understand.">
                <span>Name</span>
              </FieldTooltip>
            </label>
            <input
              id="listing-name"
              type="text"
              placeholder="e.g. Campus Hoodie"
              {...register("name")}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="category" className="text-sm font-medium">
              <FieldTooltip content="Choose the category that best matches your listing. This helps organize and discover your products.">
                <span>Category</span>
              </FieldTooltip>
            </label>
            <select
              id="category"
              {...register("category")}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            <FieldTooltip content="Describe what customers are buying, including important details such as materials, features, sizing, or what is included.">
              <span>Description</span>
            </FieldTooltip>
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe this listing..."
            {...register("description")}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>
      </Section>
    </div>
  );
};

export default ListingDetailsStep;
