import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type FieldTooltipProps = {
  children: React.ReactNode;
  content: string;
};

export const FieldTooltip = ({ children, content }: FieldTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help">{children}</span>
      </TooltipTrigger>

      <TooltipContent side="top" className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};