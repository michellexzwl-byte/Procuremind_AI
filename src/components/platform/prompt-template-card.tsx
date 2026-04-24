"use client";

import { Star } from "lucide-react";
import { PromptTemplate } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PromptTemplateCard({
  template,
  favorite,
  onToggleFavorite
}: {
  template: PromptTemplate;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">{template.name}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">{template.scenario}</p>
          </div>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onToggleFavorite(template.id)}>
            <Star className={`h-4 w-4 ${favorite ? "fill-amber-400 text-amber-500" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">{template.version}</Badge>
          <Badge variant="info">{template.style}风格</Badge>
          <span>更新于 {template.updatedAt}</span>
        </div>
        <p className="line-clamp-3 text-muted-foreground">{template.content}</p>
      </CardContent>
    </Card>
  );
}
