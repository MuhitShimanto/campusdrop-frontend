const SellerDashboardItemTitle = ({title, description}: {title: string; description: string}) => {
  return (
    <div>
      <h1 className="text-display-l font-heading tracking-tight">{title}</h1>
      <p className="mt-1 text-sm font-sans text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default SellerDashboardItemTitle;
