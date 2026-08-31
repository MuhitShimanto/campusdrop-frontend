import { useFormContext } from "react-hook-form";
import { type FormValues } from "@/lib/validations/listing";
import { Section } from "@/components/ui/section";
import { FieldTooltip } from "@/components/ui/field-tooltip";

const PricingStatusStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="px-6 py-7">
      <Section
        title="Pricing & status"
        description="Set the price and control whether customers can currently order this listing."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="price" className="text-sm font-medium">
              <FieldTooltip content="Set the amount customers will pay for one unit of this listing.">
                <span>Price</span>
              </FieldTooltip>
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="status" className="text-sm font-medium">
              <FieldTooltip content="Control whether this listing is being prepared, available for customers, temporarily unavailable, sold out, or no longer offered.">
                <span>Status</span>
              </FieldTooltip>
            </label>
            <select
              id="status"
              {...register("status")}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="sold_out">Sold out</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PricingStatusStep;