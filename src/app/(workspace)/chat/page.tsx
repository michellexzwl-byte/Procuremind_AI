"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paperclip, Send, WandSparkles } from "lucide-react";
import { toast } from "sonner";
import { procurementShortcuts, recentChats } from "@/mock/data";
import { ChatMessage } from "@/components/chat/chat-message";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { useProcureStore } from "@/store/use-procure-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage as Message } from "@/types";

const modes = [
  { key: "knowledge", label: "快速问答" },
  { key: "document", label: "文档生成" },
  { key: "workflow", label: "流程判断" },
  { key: "decision", label: "决策分析" }
] as const;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(recentChats);
  const [input, setInput] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const processedQuery = useRef("");
  const { chatMode, setChatMode } = useProcureStore();

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", content: text, time: "刚刚" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          mode: chatMode,
          content: "已理解你的采购意图。我已完成要点解析，并给出下一步推荐动作。",
          time: "刚刚",
          reasoning: ["识别当前模式为" + modes.find((m) => m.key === chatMode)?.label, "自动调用知识库与工具", "输出结构化建议与下一步动作"],
          tools: ["向量检索", "流程规则引擎"],
          citations: [
            {
              docName: "采购管理制度（2026修订版）",
              docId: "doc-01",
              quote: "预算超阈值需升级审批",
              clause: "第4.2条",
              version: "v3.2",
              updatedAt: "2026-03-28",
              permission: "采购中心全员",
              confidence: 0.9
            }
          ],
          outputCard: { title: "推荐下一步", bullets: ["生成采购申请", "执行流程判断", "执行供应商分析"] }
        }
      ]);
    }, 700);
  };

  const latestAssistant = [...messages].reverse().find((item) => item.role === "assistant");
  const latestQuestion = [...messages].reverse().find((item) => item.role === "user")?.content ?? "";

  const jumpToKnowledge = (message: Message) => {
    const target = message.citations?.[0];
    const question = latestQuestion || "请查看该回答的制度依据";
    const query = new URLSearchParams({
      q: question,
      doc: target?.docId ?? "",
      clause: target?.clause ?? ""
    });
    router.push("/knowledge?" + query.toString());
  };

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && processedQuery.current !== q) {
      processedQuery.current = q;
      setInput(q);
      toast.success("已带入分析问题，可直接发送");
    }
  }, [searchParams]);

  return (
    <div className="space-y-5">
      <PageSectionHeader title="对话工作台" subtitle="通用AI入口：更轻、更快、更统一的采购协作对话区" badge="主演示场景" />
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <Card className="h-[calc(100vh-170px)]">
          <CardHeader>
            <CardTitle className="text-base">会话 / 项目 / 收藏提示词</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border p-3">
              <p className="font-medium">华东区网络设备更新</p>
              <p className="text-xs text-muted-foreground">今日 10:06</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">Q2办公耗材比价</p>
              <p className="text-xs text-muted-foreground">昨日 17:22</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-semibold text-muted-foreground">收藏提示词</p>
              {procurementShortcuts.slice(0, 3).map((q) => (
                <button key={q} onClick={() => send(q)} className="mt-2 block w-full rounded-md border bg-background px-2 py-1 text-left text-xs hover:bg-accent">
                  {q}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-170px)]">
          <CardContent className="flex h-full flex-col p-4">
            <Tabs value={chatMode} onValueChange={(v) => setChatMode(v as typeof chatMode)}>
              <TabsList>
                {modes.map((mode) => (
                  <TabsTrigger key={mode.key} value={mode.key}>
                    {mode.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {chatMode === "knowledge" ? (
              <p className="mt-3 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                适用于快速获取结论，AI将自动调用知识库与工具生成回答
              </p>
            ) : null}

            <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} onViewEvidence={jumpToKnowledge} />
              ))}
            </div>

            <div className="mt-3 border-t pt-3">
              <div className="mb-2 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                近期常见问题（基于用户反馈）：采购申请缺少预算依据、合同风险建议不够完整
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <Paperclip className="h-3.5 w-3.5" /> 上传附件
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("已推荐动作：生成采购申请")}>
                  推荐动作：生成采购申请
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("已推荐动作：执行流程判断")}>
                  推荐动作：执行流程判断
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("已推荐动作：做供应商分析")}>
                  推荐动作：做供应商分析
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入采购问题或任务..." />
                <Button onClick={() => send(input)} className="gap-1">
                  <Send className="h-4 w-4" /> 发送
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-170px)]">
          <CardHeader>
            <CardTitle className="text-base">上下文面板</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border p-3">
              <p className="font-medium">当前知识库</p>
              <p className="text-muted-foreground">采购制度库 / 流程规范库</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">当前 Agent</p>
              <p className="text-muted-foreground">制度问答助手</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">已调用工具</p>
              <p className="text-muted-foreground">向量检索、条款定位、策略评估</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">知识命中摘要</p>
              {latestAssistant?.citations?.length ? (
                <div className="mt-2 space-y-2">
                  {latestAssistant.citations.map((cite) => (
                    <div key={cite.docId + cite.clause} className="rounded-md bg-muted/40 p-2 text-xs">
                      <p className="font-medium">{cite.docName || cite.docId}</p>
                      <p className="mt-1 text-muted-foreground">
                        {cite.clause} · 置信度 {(cite.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-muted-foreground">暂无命中摘要</p>
              )}
            </div>
            <div className="rounded-lg border bg-primary/5 p-3">
              <p className="flex items-center gap-2 font-medium">
                <WandSparkles className="h-4 w-4 text-primary" /> 推荐下一步动作
              </p>
              <p className="mt-1 text-muted-foreground">建议直接生成采购申请并同步供应商评估摘要。</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="info">快</Badge>
                <span className="text-xs text-muted-foreground">快速问答优先结论输出，依据详情可跳转知识助手查看。</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
