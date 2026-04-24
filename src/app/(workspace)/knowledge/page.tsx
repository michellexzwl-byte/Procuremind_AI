"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FileDown, FileSearch, Highlighter, Loader2, Paperclip, Search } from "lucide-react";
import { knowledgeChats, knowledgeDocs, procurementShortcuts } from "@/mock/data";
import { KnowledgeSourcePanel } from "@/components/knowledge/knowledge-source-panel";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChatMessage as Message } from "@/types";

const categories = ["制度库", "流程库", "模板库", "合同条款库", "供应商规则库", "历史案例库"];

function KnowledgePageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>(knowledgeChats);
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("制度库");
  const [highlightClause, setHighlightClause] = useState(searchParams.get("clause") ?? "");
  const [selectedDocId, setSelectedDocId] = useState(searchParams.get("doc") ?? "");
  const processedQueryRef = useRef("");

  const docs = useMemo(
    () => knowledgeDocs.filter((doc) => doc.category === activeCategory && doc.name.includes(keyword || "")),
    [activeCategory, keyword]
  );

  useEffect(() => {
    const q = searchParams.get("q");
    const doc = searchParams.get("doc");
    const clause = searchParams.get("clause");
    const signature = `${q || ""}|${doc || ""}|${clause || ""}`;
    if (q && processedQueryRef.current !== signature) {
      processedQueryRef.current = signature;
      setInput(q);
      handleAsk(q, {
        docId: doc ?? "doc-01",
        clause: clause ?? "第4.2条"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleAsk = (question: string, preset?: { docId: string; clause: string }) => {
    if (!question.trim()) return;
    const nextUser: Message = { id: String(Date.now()), role: "user", content: question, time: "刚刚" };
    setMessages((prev) => [...prev, nextUser]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          mode: "knowledge",
          content:
            "依据当前制度与流程规则，该场景建议先进行合规判断：若金额达到招标阈值则进入招标路径；若满足单一来源条件，需同步提交技术不可替代说明、市场调研证明与审批升级材料。",
          time: "刚刚",
          citations: [
            {
              docName: "采购管理制度（2026修订版）",
              docId: preset?.docId ?? "doc-01",
              quote: "50万元及以上应采用招标方式",
              clause: preset?.clause ?? "第4.2条",
              version: "v3.2",
              updatedAt: "2026-03-28",
              permission: "采购中心全员",
              confidence: 0.92
            },
            {
              docName: "单一来源采购指引",
              docId: "doc-03",
              quote: "单一来源需完整证明材料",
              clause: "第2.1条",
              version: "v1.9",
              updatedAt: "2026-02-19",
              permission: "采购经理及以上",
              confidence: 0.89
            }
          ]
        }
      ]);
      setLoading(false);
      setSelectedDocId(preset?.docId ?? "doc-01");
      setHighlightClause(preset?.clause ?? "第4.2条");
      toast.success("已生成知识回答", { description: "已附带引用来源与条款定位" });
    }, 900);
  };

  const latestCitations = messages.at(-1)?.citations ?? [];
  const selectedDoc = knowledgeDocs.find((doc) => doc.id === (selectedDocId || latestCitations[0]?.docId));
  const activeClause = highlightClause || latestCitations[0]?.clause || "第4.2条";

  return (
    <div className="space-y-5">
      <PageSectionHeader title="知识助手" subtitle="用于制度查询、流程校验与条款级溯源分析" badge="专业知识系统" />
      <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)_320px]">
        <Card className="h-[calc(100vh-170px)] overflow-hidden">
          <CardContent className="h-full p-3">
            <div className="mb-3 flex items-center gap-2 rounded-md border px-2 py-1.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="搜索知识库"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${activeCategory === category ? "border-primary/30 bg-primary/10 text-primary" : "border-transparent hover:bg-accent"}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t pt-3">
              {docs.map((doc) => (
                <div key={doc.id} className="rounded-md border p-2">
                  <p className="line-clamp-1 text-xs font-medium">{doc.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{doc.version}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-170px)]">
          <CardContent className="flex h-full flex-col p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {procurementShortcuts.map((item) => (
                <button key={item} onClick={() => handleAsk(item)} className="rounded-full border px-3 py-1 text-xs hover:bg-accent">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                return (
                  <div key={message.id} className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[88%] rounded-xl border p-3 text-sm ${isAssistant ? "bg-background" : "bg-primary text-primary-foreground"}`}>
                      <p className="leading-6">{message.content}</p>
                      {isAssistant && message.citations?.length ? (
                        <div className="mt-3 space-y-2 rounded-lg bg-muted/60 p-2">
                          {message.citations.map((cite) => (
                            <div key={`${message.id}-${cite.docId}-${cite.clause}`} className="text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {cite.docName || cite.docId} · {cite.clause}
                                </span>
                                <Badge variant="info">置信度 {(cite.confidence * 100).toFixed(0)}%</Badge>
                              </div>
                              <p className="mt-1 text-muted-foreground">{cite.quote}</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                <Badge variant="outline">{cite.version || "-"}</Badge>
                                <Badge variant="outline">{cite.updatedAt || "-"}</Badge>
                                <Badge variant="outline">{cite.permission || "权限继承"}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {isAssistant ? (
                        <Button size="sm" variant="outline" className="mt-3 h-7 text-xs" onClick={() => handleAsk("请继续细化审批层级要求")}>继续追问</Button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {loading ? (
                <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  正在检索制度与流程依据...
                </div>
              ) : null}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t pt-3">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="请输入采购问题，支持多轮追问" />
              <Button onClick={() => handleAsk(input)}>发送</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-170px)] overflow-hidden">
          <CardContent className="h-full overflow-y-auto p-4">
            <h3 className="mb-3 text-sm font-semibold">引用依据 / 命中文档 / 条款定位</h3>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="justify-start gap-1" onClick={() => toast.success("已打开原文（Mock）")}>
                <FileSearch className="h-3.5 w-3.5" /> 查看原文
              </Button>
              <Button size="sm" variant="outline" className="justify-start gap-1" onClick={() => toast.success("已定位条款（Mock）")}>
                <Highlighter className="h-3.5 w-3.5" /> 定位条款
              </Button>
              <Button size="sm" variant="outline" className="justify-start gap-1" onClick={() => toast.success("已导出引用（Mock）")}>
                <FileDown className="h-3.5 w-3.5" /> 导出引用
              </Button>
              <Button size="sm" variant="outline" className="justify-start gap-1" onClick={() => toast.success("已加入报告（Mock）")}>
                <Paperclip className="h-3.5 w-3.5" /> 加入报告
              </Button>
            </div>
            <div className="mb-3 rounded-lg border bg-primary/5 p-3 text-xs">
              <p className="font-medium">文档预览</p>
              <p className="mt-1 text-muted-foreground">{selectedDoc?.name || "采购管理制度（2026修订版）"}</p>
              <p className="mt-2 rounded bg-yellow-200/60 px-2 py-1 text-foreground">
                【命中段落高亮】{activeClause}：单笔预算人民币50万元及以上的采购，原则上应采用公开招标或邀请招标方式。
              </p>
              <p className="mt-1 text-muted-foreground">上下文：上一条款定义招标触发条件，下一条款定义单一来源补充材料要求。</p>
            </div>
            <KnowledgeSourcePanel selectedDocId={selectedDocId || messages.at(-1)?.citations?.[0]?.docId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={<div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">正在加载知识助手...</div>}>
      <KnowledgePageContent />
    </Suspense>
  );
}
