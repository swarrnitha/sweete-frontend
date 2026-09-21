import { AlertCircle } from "lucide-react";

export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-foreground/60">
    <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="mt-2">{description}</p>
  </div>
);
