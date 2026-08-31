import { useFormContext } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { type FormValues } from "@/lib/validations/listing";
import { Section } from "@/components/ui/section";
import { FieldTooltip } from "@/components/ui/field-tooltip";

const OrderingStep = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const listingType = watch("listing_type");

  return (
    <div className="px-6 py-7">
      <Section
        title={listingType === "preorder" ? "Preorder window" : "Delivery"}
        description={
          listingType === "preorder"
            ? "Define when customers can place their preorder."
            : "Set how many days customers should expect to wait."
        }
      >
        {listingType === "preorder" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="order-start-time" className="text-sm font-medium">
                <FieldTooltip content="Set the date and time when customers can start placing preorders for this listing.">
                  <span>Order start time</span>
                </FieldTooltip>
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="order-start-time"
                  type="datetime-local"
                  {...register("order_start_time")}
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              {errors.order_start_time && (
                <p className="text-xs text-destructive">
                  {errors.order_start_time.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="order-end-time" className="text-sm font-medium">
                <FieldTooltip content="Set the deadline after which customers can no longer place preorders for this listing.">
                  <span>Order end time</span>
                </FieldTooltip>
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="order-end-time"
                  type="datetime-local"
                  {...register("order_end_time")}
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              {errors.order_end_time && (
                <p className="text-xs text-destructive">
                  {errors.order_end_time.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 sm:max-w-[calc(50%-0.5rem)]">
            <label
              htmlFor="estimated-delivery-day"
              className="text-sm font-medium"
            >
              <FieldTooltip content="Enter approximately how many days customers should expect to wait before their order is ready.">
                <span>Estimated delivery</span>
              </FieldTooltip>
            </label>
            <div className="relative">
              <input
                id="estimated-delivery-day"
                type="number"
                min="1"
                step="1"
                {...register("estimated_delivery_days", { valueAsNumber: true })}
                className="h-10 w-full rounded-md border bg-background pl-3 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                days
              </span>
            </div>
            {errors.estimated_delivery_days && (
              <p className="text-xs text-destructive">
                {errors.estimated_delivery_days.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Enter the estimated number of days, such as 2 or 3.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default OrderingStep;