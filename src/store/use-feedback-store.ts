"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FeedbackItem, FeedbackModule, FeedbackType } from "@/types";

interface FeedbackModalState {
  open: boolean;
  module: FeedbackModule;
  contentType: string;
  suggestedType: FeedbackType;
}

interface FeedbackState {
  feedbacks: FeedbackItem[];
  modal: FeedbackModalState;
  submitPositive: (module: FeedbackModule, contentType: string) => void;
  openModal: (module: FeedbackModule, contentType: string, suggestedType?: FeedbackType) => void;
  closeModal: () => void;
  submitDetailed: (feedbackType: FeedbackType, comment: string) => void;
}

const now = "2026-04-13T09:30:00.000Z";

const initialFeedbacks: FeedbackItem[] = [
  {
    id: "fb-seed-1",
    module: "task",
    contentType: "采购申请",
    feedbackType: "不够完整",
    comment: "缺少预算测算依据",
    timestamp: now,
    status: "未处理",
    sentiment: "negative"
  },
  {
    id: "fb-seed-2",
    module: "decision",
    contentType: "供应商分析",
    feedbackType: "格式不好",
    comment: "建议和风险没有分层展示",
    timestamp: "2026-04-12T10:15:00.000Z",
    status: "已优化",
    sentiment: "negative"
  },
  {
    id: "fb-seed-3",
    module: "chat",
    contentType: "快速问答",
    feedbackType: "其他",
    comment: "回答速度快，引用清晰",
    timestamp: "2026-04-11T08:20:00.000Z",
    status: "已优化",
    sentiment: "positive"
  },
  {
    id: "fb-seed-4",
    module: "decision",
    contentType: "成本分析",
    feedbackType: "不够完整",
    comment: "成本异常解释不够具体，缺少分品类影响",
    timestamp: "2026-04-13T07:10:00.000Z",
    status: "未处理",
    sentiment: "negative"
  },
  {
    id: "fb-seed-5",
    module: "decision",
    contentType: "效率分析",
    feedbackType: "不符合业务",
    comment: "自动化建议与业务实际不匹配",
    timestamp: "2026-04-13T08:30:00.000Z",
    status: "未处理",
    sentiment: "negative"
  }
];

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      feedbacks: initialFeedbacks,
      modal: {
        open: false,
        module: "chat",
        contentType: "快速问答",
        suggestedType: "内容不准确"
      },
      submitPositive: (module, contentType) => {
        const item: FeedbackItem = {
          id: "fb-" + Date.now(),
          module,
          contentType,
          feedbackType: "其他",
          comment: "有帮助",
          timestamp: new Date().toISOString(),
          status: "已优化",
          sentiment: "positive"
        };
        set((state) => ({ feedbacks: [item, ...state.feedbacks] }));
      },
      openModal: (module, contentType, suggestedType = "内容不准确") =>
        set({
          modal: {
            open: true,
            module,
            contentType,
            suggestedType
          }
        }),
      closeModal: () =>
        set((state) => ({
          modal: { ...state.modal, open: false }
        })),
      submitDetailed: (feedbackType, comment) => {
        const current = get().modal;
        const item: FeedbackItem = {
          id: "fb-" + Date.now(),
          module: current.module,
          contentType: current.contentType,
          feedbackType,
          comment: comment || "未填写补充内容",
          timestamp: new Date().toISOString(),
          status: "未处理",
          sentiment: "negative"
        };
        set((state) => ({
          feedbacks: [item, ...state.feedbacks],
          modal: { ...state.modal, open: false }
        }));
      }
    }),
    { name: "procuremind-feedbacks" }
  )
);
