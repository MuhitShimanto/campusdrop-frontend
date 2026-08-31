"use client";

import { useState } from "react";
import { CheckIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import your extracted constants and types
import { listingSchema, type FormValues } from "@/lib/validations/listing";
import { steps, stepFields } from "@/lib/constants/listing";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";

import AvailabilityStep from "@/components/drop/steps/availability-step";
import ListingDetailsStep from "@/components/drop/steps/listing-details-step";
import PricingStatusStep from "@/components/drop/steps/pricing-step";
import FulfillmentStep from "@/components/drop/steps/fulfillment-step";
import OrderingStep from "@/components/drop/steps/ordering-step";
import { createPreOrder } from "@/api/drops/createPreOrder";
import { createAlwaysOn } from "@/api/drops/createAlwaysOn";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { createListingImage } from "@/api/drops/createListingImages";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CreateDropModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateDropModal = ({ open, onOpenChange }: CreateDropModalProps) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      listing_type: "always_on",
      images: [],
      name: "",
      category: "",
      description: "",
      status: "draft",
      fulfillment_mode: "immediate",
      pickup_location: "",
      pickup_starts_at: "",
      pickup_ends_at: "",
      order_start_time: "",
      order_end_time: "",
    },
  });

  const { handleSubmit, trigger, setValue, watch } = methods;
  const selectedImages = watch("images");

  const [activeStep, setActiveStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  // Image Handlers
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const newFiles = files.slice(0, 3 - selectedImages.length);

    if (newFiles.length === 0) {
      event.target.value = "";
      return;
    }

    setValue("images", [...selectedImages, ...newFiles], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setImagePreviews((current) => [
      ...current,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter(
      (_, imageIndex) => imageIndex !== index,
    );

    setValue("images", newImages, {
      shouldValidate: true,
      shouldDirty: true,
    });

    URL.revokeObjectURL(imagePreviews[index]);

    setImagePreviews((current) =>
      current.filter((_, imageIndex) => imageIndex !== index),
    );

    setActiveImage((current) => {
      if (newImages.length === 0) return 0;
      if (index < current) return current - 1;
      if (index === current && current >= newImages.length) {
        return newImages.length - 1;
      }
      return current;
    });
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? selectedImages.length - 1 : current - 1,
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === selectedImages.length - 1 ? 0 : current + 1,
    );
  };
  // ----------------------

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);
    if (value) {
      setActiveStep(1);
    }
  };

  const handleStepChange = async (newStep: number) => {
    if (newStep > activeStep) {
      const fields = stepFields[activeStep as keyof typeof stepFields];
      const isValid = await trigger(fields);
      if (!isValid) return;
    }
    setActiveStep(newStep);
  };

  const handleNext = async () => {
    const fields = stepFields[activeStep as keyof typeof stepFields];
    const isValid = await trigger(fields);
    if (!isValid) return;
    setActiveStep((current) => current + 1);
  };

  const onSubmit = async (data: FormValues) => {
    setFormLoading(true);
    try {
      const listing =
        data.listing_type === "preorder"
          ? await createPreOrder(data)
          : await createAlwaysOn(data);

      const listingId = listing.listing_id;

      const uploadedImages = await Promise.all(
        data.images.map((file, index) =>
          uploadToCloudinary(file, (progress) => {
            // image upload progress
          }),
        ),
      );

      await Promise.all(
        uploadedImages.map((image, index) =>
          createListingImage({
            listing_id: listingId,
            url: image.secure_url,
            sort_order: index + 1,
          }),
        ),
      );
      toast.success("New drop created successfully!");
      onOpenChange(false);
      // Reset form and state after successful submission
      methods.reset();
      setImagePreviews([]);
      setActiveImage(0);
      setActiveStep(1);

      router.replace("/dashboard/drops");
      router.refresh();
    } catch (error) {
      console.error("Failed to create new drop:", error);
      toast.error("Failed to create new drop.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col gap-0 overflow-hidden p-2 py-4">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex min-h-0 flex-1 flex-col"
            >
              <Stepper
                value={activeStep}
                onValueChange={handleStepChange}
                indicators={{ completed: <CheckIcon className="size-3.5" /> }}
                className="flex min-h-0 w-full flex-1 flex-col"
              >
                {/* Header */}
                <DialogHeader className="shrink-0 border-b px-6 py-5">
                  <DialogTitle className="text-3xl font-heading">
                    Create new listing
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Set up your listing and configure how customers can order
                    it.
                  </DialogDescription>

                  <div className="pt-5">
                    <StepperNav className="w-full">
                      {steps.map((step, index) => (
                        <StepperItem
                          key={step.id}
                          step={step.id}
                          className="relative"
                        >
                          <StepperTrigger
                            className="flex items-center gap-2"
                            disabled={step.id > activeStep + 1}
                          >
                            <StepperIndicator>{step.id}</StepperIndicator>
                            <StepperTitle className="hidden text-xs sm:block">
                              {step.title}
                            </StepperTitle>
                          </StepperTrigger>

                          {index < steps.length - 1 && (
                            <StepperSeparator className="group-data-[state=completed]/step:bg-primary md:mx-2.5" />
                          )}
                        </StepperItem>
                      ))}
                    </StepperNav>
                  </div>
                </DialogHeader>

                {/* Scrollable content */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <StepperPanel>
                    {/* 3. Render clean sub-components */}
                    <StepperContent value={1}>
                      <AvailabilityStep />
                    </StepperContent>

                    <StepperContent value={2}>
                      <ListingDetailsStep
                        imagePreviews={imagePreviews}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        handleImageChange={handleImageChange}
                        removeImage={removeImage}
                        previousImage={previousImage}
                        nextImage={nextImage}
                      />
                    </StepperContent>

                    <StepperContent value={3}>
                      <PricingStatusStep />
                    </StepperContent>

                    <StepperContent value={4}>
                      <FulfillmentStep />
                    </StepperContent>

                    <StepperContent value={5}>
                      <OrderingStep />
                    </StepperContent>
                  </StepperPanel>
                </div>

                {/* Footer */}
                <DialogFooter className="shrink-0 flex-col gap-2 border-t bg-muted/20 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
                  <div className="order-1 flex w-full items-center gap-2 sm:order-2 sm:ml-auto sm:w-auto">
                    {activeStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveStep((current) => current - 1)}
                        className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted sm:flex-none"
                      >
                        <ChevronLeft className="size-4" />
                        Previous
                      </button>
                    )}

                    {activeStep < steps.length ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:flex-none"
                      >
                        Next
                        <ChevronRight className="size-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex h-9 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto sm:flex-none"
                      >
                        Create listing
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="order-2 h-9 w-full rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted sm:order-1 sm:w-auto"
                  >
                    Cancel
                  </button>
                </DialogFooter>
              </Stepper>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default CreateDropModal;
