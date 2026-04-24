import { FeedbackButton } from "@/components/shared/feedback-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackModule } from "@/types";

interface InsightAction {
  label: string;
  onClick: () => void;
}

export function AnalysisInsightPanel({
  title,
  summary,
  reasons,
  actions,
  module,
  contentType
}: {
  title: string;
  summary: string[];
  reasons: string[];
  actions: InsightAction[];
  module: FeedbackModule;
  contentType: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="rounded-lg border bg-primary/5 p-3">
          <p className="font-medium">AI洞察摘要</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {summary.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-medium">原因解释</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {reasons.map((reason) => (
              <Badge key={reason} variant="outline">
                {reason}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          {actions.map((action) => (
            <Button key={action.label} variant="outline" size="sm" className="justify-start" onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">该回答基于历史反馈优化生成</p>
        <FeedbackButton module={module} contentType={contentType} />
      </CardContent>
    </Card>
  );
}
