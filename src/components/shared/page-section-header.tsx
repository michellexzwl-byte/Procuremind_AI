import { Badge } from "@/components/ui/badge";

export function PageSectionHeader({
  title,
  subtitle,
  badge
}: {
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {badge ? <Badge variant="info">{badge}</Badge> : null}
    </div>
  );
}
