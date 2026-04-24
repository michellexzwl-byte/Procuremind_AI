"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FeedbackType } from "@/types";
import { useFeedbackStore } from "@/store/use-feedback-store";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const feedbackTypes: FeedbackType[] = ["内容不准确", "不够完整", "不符合业务", "格式不好", "其他"];

export function FeedbackModal() {
  const { modal, closeModal, submitDetailed } = useFeedbackStore();
  const [selectedType, setSelectedType] = useState<FeedbackType>("内容不准确");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (modal.open) {
      setSelectedType(modal.suggestedType);
    }
  }, [modal.open, modal.suggestedType]);

  const handleSubmit = () => {
    submitDetailed(selectedType, comment);
    setComment("");
    toast.success("反馈已记录，用于优化AI表现");
  };

  return (
    <Sheet
      open={modal.open}
      onClose={() => {
        closeModal();
        setComment("");
      }}
      side="right"
    >
      <h3 className="text-lg font-semibold">补充反馈</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        模块：{modal.module} · 内容：{modal.contentType}
      </p>
      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium">反馈类型</p>
        <div className="space-y-2">
          {feedbackTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm">
              <input
                type="radio"
                name="feedback-type"
                checked={selectedType === type}
                onChange={() => setSelectedType(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium">请描述问题或期望结果</p>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="例如：希望按采购制度第4章输出更完整的审批材料清单..."
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={closeModal}>
          取消
        </Button>
        <Button onClick={handleSubmit}>提交反馈</Button>
      </div>
    </Sheet>
  );
}
