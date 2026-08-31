import { useFormContext } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { type FormValues } from "@/lib/validations/listing";
import { Section } from "@/components/ui/section";
import { FieldTooltip } from "@/components/ui/field-tooltip";

const FulfillmentStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="space-y-7 px-6 py-7">
      <Section
        title="Fulfillment"
        description="Configure where customers collect their order and when fulfillment is available."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="fulfillment-mode" className="text-sm font-medium">
              <FieldTooltip content="Choose whether orders can be fulfilled immediately or need to be fulfilled at a scheduled time.">
                <span>Fulfillment mode</span>
              </FieldTooltip>
            </label>
            <select
              id="fulfillment-mode"
              {...register("fulfillment_mode")}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="immediate">Immediate</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pickup-location" className="text-sm font-medium">
              <FieldTooltip content="Tell customers where they should go to collect their order.">
                <span>Pickup location</span>
              </FieldTooltip>
            </label>
            <input
              id="pickup-location"
              type="text"
              placeholder="e.g. Main Campus Store"
              {...register("pickup_location")}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.pickup_location && (
              <p className="text-xs text-destructive">
                {errors.pickup_location.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="pickup-starts-at" className="text-sm font-medium">
              <FieldTooltip content="Set the earliest date and time when customers can collect their orders.">
                <span>Pickup starts at</span>
              </FieldTooltip>
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="pickup-starts-at"
                type="datetime-local"
                {...register("pickup_starts_at")}
                className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.pickup_starts_at && (
                <p className="text-xs text-destructive">
                  {errors.pickup_starts_at.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pickup-ends-at" className="text-sm font-medium">
              <FieldTooltip content="Set the final date and time when customers can collect their orders.">
                <span>Pickup ends at</span>
              </FieldTooltip>
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="pickup-ends-at"
                type="datetime-local"
                {...register("pickup_ends_at")}
                className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.pickup_ends_at && (
                <p className="text-xs text-destructive">
                  {errors.pickup_ends_at.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FulfillmentStep;