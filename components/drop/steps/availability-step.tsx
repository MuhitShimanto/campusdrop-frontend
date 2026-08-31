import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/validations/listing";
import { Section } from "@/components/ui/section";

const AvailabilityStep = () => {
  const { register, watch } = useFormContext<FormValues>();
  const listingType = watch("listing_type");

  return (
    <div className="px-6 py-7">
      <Section
        title="Availability"
        description="Choose how customers can access this listing."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              listingType === "always_on"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
          >
            <input type="radio" value="always_on" {...register("listing_type")} />
            <div>
              <p className="text-sm font-medium">Always on</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Customers can order this listing continuously.
              </p>
            </div>
          </label>

          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              listingType === "preorder"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
          >
            <input type="radio" value="preorder" {...register("listing_type")} />
            <div>
              <p className="text-sm font-medium">Preorder</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Customers can order only during a defined window.
              </p>
            </div>
          </label>
        </div>
      </Section>
    </div>
  );
};

export default AvailabilityStep;