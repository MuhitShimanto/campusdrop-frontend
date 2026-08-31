import React from "react";

const BorderedBox = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex gap-3 rounded-xl border bg-card p-4 hover:border-primary/65 hover:shadow-sm transition duration-200 cursor-default">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
        {children}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

export default BorderedBox;
