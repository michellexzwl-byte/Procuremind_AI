"use client";

import { MessageSquareMore, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { FeedbackModule } from "@/types";
import { useFeedbackStore } from "@/store/use-feedback-store";
import { Button } from "@/components/ui/button";

export function FeedbackButton({
  module,
  contentType
}: {
  module: FeedbackModule;
  contentType: string;
}) {
  const { submitPositive, openModal } = useFeedbackStore();

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        className="h-7 gap-1 text-xs text-muted-foreground"
        onClick={() => {
          submitPositive(module, contentType);
          toast.success("反馈已记录，用于优化AI表现");
        }}
      >
        <ThumbsUp className="h-3.5 w-3.5" />
        有帮助
      </Button>
      <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground" onClick={() => openModal(module, contentType, "内容不准确")}>
        <ThumbsDown className="h-3.5 w-3.5" />
        没帮助
      </Button>
      <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground" onClick={() => openModal(module, contentType, "其他")}>
        <MessageSquareMore className="h-3.5 w-3.5" />
        补充反馈
      </Button>
    </div>
  );
}
