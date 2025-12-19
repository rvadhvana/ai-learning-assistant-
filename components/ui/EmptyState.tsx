import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <div className="text-base font-extrabold text-slate-900">{title}</div>
        <div className="text-sm text-slate-600">{description}</div>
      </div>
      {action ? <div className="mt-4">{action}</div> : null}
    </Card>
  );
}

