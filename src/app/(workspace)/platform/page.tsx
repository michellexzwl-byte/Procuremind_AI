"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { agents, knowledgeBases, modelList, monitoringData, operationLogs, promptTemplates } from "@/mock/data";
import { PromptTemplateCard } from "@/components/platform/prompt-template-card";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { useProcureStore } from "@/store/use-procure-store";
import { useFeedbackStore } from "@/store/use-feedback-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = ["模型管理", "知识库管理", "Agent 管理", "Prompt 模板管理", "权限与审计", "评估监控", "反馈与优化"];

export default function PlatformPage() {
  const [active, setActive] = useState(tabs[0]);
  const { favoriteTemplates, toggleFavoriteTemplate } = useProcureStore();
  const { feedbacks } = useFeedbackStore();

  const totalFeedback = feedbacks.length;
  const positiveCount = feedbacks.filter((f) => f.sentiment === "positive").length;
  const negativeCount = feedbacks.filter((f) => f.sentiment === "negative").length;
  const positiveRate = totalFeedback ? ((positiveCount / totalFeedback) * 100).toFixed(1) : "0.0";
  const negativeRate = totalFeedback ? ((negativeCount / totalFeedback) * 100).toFixed(1) : "0.0";

  const trendMap = new Map<string, { date: string; count: number }>();
  feedbacks.forEach((item) => {
    const date = item.timestamp.slice(5, 10);
    const current = trendMap.get(date);
    if (current) {
      current.count += 1;
    } else {
      trendMap.set(date, { date, count: 1 });
    }
  });
  const trendData = Array.from(trendMap.values()).slice(-7);

  const moduleData = [
    { module: "对话工作台", value: feedbacks.filter((f) => f.module === "chat").length },
    { module: "知识助手", value: feedbacks.filter((f) => f.module === "knowledge").length },
    { module: "任务助手", value: feedbacks.filter((f) => f.module === "task").length },
    { module: "决策助手", value: feedbacks.filter((f) => f.module === "decision").length }
  ];

  const costFeedbacks = feedbacks.filter((item) => item.contentType.includes("成本分析"));
  const efficiencyFeedbacks = feedbacks.filter((item) => item.contentType.includes("效率分析"));
  const costPositiveRate = costFeedbacks.length
    ? ((costFeedbacks.filter((item) => item.sentiment === "positive").length / costFeedbacks.length) * 100).toFixed(1)
    : "0.0";
  const efficiencyPositiveRate = efficiencyFeedbacks.length
    ? ((efficiencyFeedbacks.filter((item) => item.sentiment === "positive").length / efficiencyFeedbacks.length) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-5">
      <PageSectionHeader title="平台底座" subtitle="企业级 AI 中台配置、治理与监控" badge="AI中台后台管理" />
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="h-auto flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="mb-1">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="模型管理">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">模型列表</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {modelList.map((model) => (
                <div key={model.name} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{model.name}</p>
                    <Button size="sm" variant="outline" onClick={() => toast.success("已切换默认模型", { description: model.name })}>
                      设为默认
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    延迟 {model.latency} · 成本 {model.cost} · 场景 {model.scene}
                  </p>
                  <div className="mt-2 flex gap-1">
                    {model.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="知识库管理">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">知识库状态</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" onClick={() => toast.success("文档上传队列已创建（Mock）")}>
                上传文档
              </Button>
              {knowledgeBases.map((kb) => (
                <div key={kb.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{kb.name}</p>
                    <Badge variant={kb.active ? "success" : "warning"}>{kb.active ? "生效中" : "待生效"}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    文档 {kb.docs} 份 · 命中率 {kb.hitRate}% · 更新 {kb.updatedAt}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    分片状态：{kb.chunkStatus} · 向量化状态：{kb.vectorStatus}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Agent 管理">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agent 列表</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents
                .filter((agent) => !agent.name.includes("流程判定"))
                .map((agent) => (
                <div key={agent.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{agent.name}</p>
                    <Badge variant={agent.status === "online" ? "success" : "warning"}>{agent.status}</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">{agent.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">工具：{agent.tools.join(" / ")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">绑定知识库：{agent.knowledgeBases.join(" / ")} · 最近调用 {agent.calls}</p>
                </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Prompt 模板管理">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {promptTemplates.map((template) => (
              <PromptTemplateCard
                key={template.id}
                template={template}
                favorite={favoriteTemplates.includes(template.id)}
                onToggleFavorite={toggleFavoriteTemplate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="权限与审计">
          <div className="grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">角色权限矩阵</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>采购专员：可访问知识助手、任务助手，禁止导出敏感合同条款。</p>
                <p>采购经理：可发起采购决策建议、审批建议、查看供应商评分。</p>
                <p>法务：可访问合同风险模块与审查日志。</p>
                <p>管理员：全模块可配置，支持审计追踪。</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">操作日志 / 脱敏状态</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Badge variant="success">敏感字段脱敏：已开启</Badge>
                {operationLogs.map((log) => (
                  <p key={log} className="rounded border p-2 text-xs text-muted-foreground">
                    {log}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="评估监控">
          <div className="grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">核心指标</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded border p-3">问答命中率：91.4%</div>
                <div className="rounded border p-3">用户满意度：4.6 / 5</div>
                <div className="rounded border p-3">平均响应时延：2.2s</div>
                <div className="rounded border p-3">风险回答占比：7.5%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">近一周趋势（简版）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {monitoringData.map((item) => (
                  <div key={item.date} className="flex items-center justify-between rounded border p-2">
                    <span>{item.date}</span>
                    <span>命中率 {item.hitRate}%</span>
                    <span>满意度 {item.satisfaction}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="反馈与优化">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">总反馈数</p>
                  <p className="mt-1 text-2xl font-semibold">{totalFeedback}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">正向反馈率</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-600">{positiveRate}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">负向反馈率</p>
                  <p className="mt-1 text-2xl font-semibold text-rose-600">{negativeRate}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">最近7天趋势</p>
                  <p className="mt-1 text-2xl font-semibold">{trendData.length} 天有反馈</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">成本分析反馈量</p>
                  <p className="mt-1 text-2xl font-semibold">{costFeedbacks.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">效率分析反馈量</p>
                  <p className="mt-1 text-2xl font-semibold">{efficiencyFeedbacks.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">成本分析正向率</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-600">{costPositiveRate}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground">效率分析正向率</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-600">{efficiencyPositiveRate}%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">反馈趋势</CardTitle>
                </CardHeader>
                <CardContent className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">模块维度分析</CardTitle>
                </CardHeader>
                <CardContent className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moduleData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="module" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">常见问题分析</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="rounded border p-2">成本异常解释不够具体</div>
                  <div className="rounded border p-2">效率瓶颈建议不够可执行</div>
                  <div className="rounded border p-2">自动化建议与业务实际不匹配</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">反馈列表</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="grid grid-cols-[90px_80px_90px_1fr_70px] gap-2 font-medium text-muted-foreground">
                    <span>时间</span>
                    <span>模块</span>
                    <span>类型</span>
                    <span>内容摘要</span>
                    <span>状态</span>
                  </div>
                  {feedbacks.map((item) => (
                    <div key={item.id} className="grid grid-cols-[90px_80px_90px_1fr_70px] gap-2 rounded border p-2">
                      <span>{item.timestamp.slice(5, 16).replace("T", " ")}</span>
                      <span>{item.module}</span>
                      <span>{item.feedbackType}</span>
                      <span className="truncate">{item.comment}</span>
                      <span>{item.status}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
