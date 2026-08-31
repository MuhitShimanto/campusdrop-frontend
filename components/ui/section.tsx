type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const Section = ({ title, description, children }: SectionProps) => {
  return (
    <section className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        {description && (
          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
};