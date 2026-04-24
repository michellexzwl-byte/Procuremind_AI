import { Bot, User2 } from "lucide-react";
import { ChatMessage as Message } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeedbackButton } from "@/components/shared/feedback-button";

export function ChatMessage({
  message,
  onViewEvidence
}: {
  message: Message;
  onViewEvidence?: (message: Message) => void;
}) {
  const isAssistant = message.role === "assistant";
  return (
    <div className={`flex gap-3 ${isAssistant ? "" : "justify-end"}`}>
      {isAssistant ? <div className="mt-1 rounded-md bg-primary/10 p-2"><Bot className="h-4 w-4 text-primary" /></div> : null}
      <div className={`max-w-[88%] rounded-xl border p-4 ${isAssistant ? "bg-card" : "bg-primary text-primary-foreground"}`}>
        <p className="text-sm leading-6">{message.content}</p>
        {isAssistant && message.reasoning?.length ? (
          <div className="mt-3 rounded-md bg-muted/60 p-2 text-xs">
            <p className="mb-1 font-medium">分析步骤概览</p>
            <ul className="space-y-1 text-muted-foreground">
              {message.reasoning.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {isAssistant && message.citations?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.citations.map((citation) => (
              <Badge key={`${message.id}-${citation.docId}-${citation.clause}`} variant="info">
                {(citation.docName || citation.docId) + " · " + citation.clause + " · " + (citation.version || "-") + " · 置信度 " + (citation.confidence * 100).toFixed(0) + "%"}
              </Badge>
            ))}
          </div>
        ) : null}
        {isAssistant && onViewEvidence && message.citations?.length ? (
          <Button variant="outline" size="sm" className="mt-2 h-7 text-xs" onClick={() => onViewEvidence(message)}>
            在知识助手中查看依据
          </Button>
        ) : null}
        {isAssistant && message.tools?.length ? (
          <p className="mt-2 text-xs text-muted-foreground">工具调用：{message.tools.join("、")}</p>
        ) : null}
        {isAssistant && message.outputCard ? (
          <div className="mt-3 rounded-lg border bg-background p-3">
            <p className="text-xs font-semibold">{message.outputCard.title}</p>
            <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
              {message.outputCard.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {isAssistant ? (
          <>
            <p className="mt-2 text-xs text-muted-foreground">该回答基于历史反馈优化生成</p>
            <FeedbackButton module="chat" contentType={message.mode === "knowledge" ? "快速问答" : message.mode === "decision" ? "决策分析" : "通用回答"} />
          </>
        ) : null}
        <div className={`mt-2 flex items-center gap-1 text-[11px] ${isAssistant ? "text-muted-foreground" : "text-primary-foreground/80"}`}>
          {!isAssistant ? <User2 className="h-3.5 w-3.5" /> : null}
          <span>{message.time}</span>
        </div>
      </div>
    </div>
  );
}
