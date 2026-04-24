import { knowledgeDocs } from "@/mock/data";
import { Badge } from "@/components/ui/badge";

export function KnowledgeSourcePanel({ selectedDocId }: { selectedDocId?: string }) {
  return (
    <div className="space-y-3">
      {knowledgeDocs.map((doc) => (
        <div key={doc.id} className={`rounded-lg border p-3 ${selectedDocId === doc.id ? "border-primary/40 bg-primary/5" : "bg-background"}`}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">{doc.name}</p>
            <Badge variant="outline">{doc.version}</Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{doc.snippet}</p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>权限：{doc.permission}</span>
            <span>更新时间：{doc.updatedAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
