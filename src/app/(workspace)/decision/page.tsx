"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  automationOpportunities,
  costAnomalies,
  costCategoryShare,
  costOpportunities,
  costTrendData,
  lowEfficiencyCases,
  processBottlenecks,
  processDurationData,
  suppliers
} from "@/mock/data";
import { AnalysisInsightPanel } from "@/components/decision/analysis-insight-panel";
import { AutomationOpportunityCard } from "@/components/decision/automation-opportunity-card";
import { BottleneckCard } from "@/components/decision/bottleneck-card";
import { BudgetVsActualChart } from "@/components/decision/budget-vs-actual-chart";
import { ContractRiskList } from "@/components/decision/contract-risk-list";
import { CostAnomalyCard } from "@/components/decision/cost-anomaly-card";
import { CostTrendChart } from "@/components/decision/cost-trend-chart";
import { ProcessDurationChart } from "@/components/decision/process-duration-chart";
import { QuoteCompareTable } from "@/components/decision/quote-compare-table";
import { SavingsOpportunityList } from "@/components/decision/savings-opportunity-list";
import { SupplierScoreCard } from "@/components/decision/supplier-score-card";
import { FeedbackButton } from "@/components/shared/feedback-button";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const themes = ["供应商分析", "报价对比", "合同风险", "采购策略建议", "风险预警", "成本分析", "效率分析"];

export default function DecisionPage() {
  const [active, setActive] = useState(themes[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && themes.includes(tab)) {
      setActive(tab);
    }
  }, [searchParams]);

  const goToTasks = (task: string, source: string) => {
    const query = new URLSearchParams({
      task,
      source,
      from: "decision",
      decisionTab: active
    });
    router.push("/tasks?" + query.toString());
  };

  const goToChat = (q: string) => {
    router.push("/chat?q=" + encodeURIComponent(q));
  };

  return (
    <div className="space-y-5">
      <PageSectionHeader title="决策助手" subtitle="让 AI 对采购决策给出可解释、可执行的建议" badge="AI判断能力" />
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="h-auto flex-wrap">
          {themes.map((item) => (
            <TabsTrigger key={item} value={item} className="mb-1">
              {item}
            </TabsTrigger>
          ))}
        </TabsList>

        {themes.map((item) => (
          <TabsContent key={item} value={item}>
            <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_340px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">筛选区</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {active === "成本分析" ? (
                    <>
                      <Input placeholder="项目名称" defaultValue="华东区网络设备更新" />
                      <Input placeholder="品类" defaultValue="IT网络设备" />
                      <Input placeholder="时间范围" defaultValue="近6个月" />
                      <Input placeholder="供应商" defaultValue="全部供应商" />
                      <Input placeholder="成本波动阈值" defaultValue="10%" />
                      <Input placeholder="是否仅看异常项" defaultValue="是" />
                    </>
                  ) : null}
                  {active === "效率分析" ? (
                    <>
                      <Input placeholder="流程类型" defaultValue="招标 / 比价 / 框架采购" />
                      <Input placeholder="部门" defaultValue="采购中心" />
                      <Input placeholder="时间范围" defaultValue="近30天" />
                      <Input placeholder="审批层级" defaultValue="2级及以上" />
                      <Input placeholder="是否仅看超时流程" defaultValue="是" />
                      <Input placeholder="风险等级" defaultValue="中高风险" />
                    </>
                  ) : null}
                  {!["成本分析", "效率分析"].includes(active) ? (
                    <>
                      <Input placeholder="项目名称" defaultValue="华东区网络设备更新" />
                      <Input placeholder="采购品类" defaultValue="IT设备" />
                      <Input placeholder="金额区间" defaultValue="500000 - 1200000" />
                      <Input placeholder="风险等级" defaultValue="中高风险" />
                    </>
                  ) : null}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">分析结果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {active === "供应商分析" ? (
                    <div className="grid gap-3 md:grid-cols-3">
                      {suppliers.map((supplier) => (
                        <SupplierScoreCard key={supplier.id} supplier={supplier} />
                      ))}
                    </div>
                  ) : null}

                  {active === "报价对比" ? <QuoteCompareTable /> : null}

                  {active === "合同风险" ? <ContractRiskList /> : null}

                  {active === "采购策略建议" ? (
                    <div className="space-y-3 text-sm">
                      <div className="rounded-lg border bg-primary/5 p-4">
                        <p className="font-semibold">建议采购方式：邀请招标</p>
                        <p className="mt-2 text-muted-foreground">
                          原因：金额接近公开招标阈值、需求规格明确、供应商市场成熟，采用邀请招标可平衡合规与执行效率。
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="font-medium">历史类似案例参考</p>
                        <ul className="mt-2 space-y-1 text-muted-foreground">
                          <li>2025Q4 服务器扩容项目：邀请招标，节约成本 9.8%</li>
                          <li>2025Q3 办公网升级项目：比价方式，审批回退率 21%</li>
                          <li>2024Q4 网络安全改造：公开招标，交付延期 14 天</li>
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  {active === "风险预警" ? (
                    <div className="space-y-3 text-sm">
                      {["原材料价格波动", "供应商延迟交付", "单一供应商依赖过高", "合同签署超时", "库存风险提醒"].map((risk) => (
                        <div key={risk} className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                          <p>{risk}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {active === "成本分析" ? (
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">成本趋势图</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CostTrendChart data={costTrendData} />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">预算 vs 实际</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BudgetVsActualChart data={costTrendData} />
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">品类成本分布（Top 成本品类）</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={costCategoryShare} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="category" width={90} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            {costCategoryShare
                              .filter((item) => item.volatility === "high")
                              .map((item) => (
                                <Badge key={item.category} variant="warning">
                                  高波动：{item.category}
                                </Badge>
                              ))}
                          </div>
                        </CardContent>
                      </Card>

                      <div>
                        <p className="mb-2 text-sm font-medium">异常成本卡片</p>
                        <div className="grid gap-3 md:grid-cols-3">
                          {costAnomalies.map((item) => (
                            <CostAnomalyCard key={item.id} item={item} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium">降本机会列表</p>
                        <SavingsOpportunityList
                          opportunities={costOpportunities}
                          onAction={(action) => {
                            if (action.includes("报价对比")) {
                              setActive("报价对比");
                              return;
                            }
                            if (action.includes("降本分析报告")) {
                              goToTasks("降本分析报告", "成本分析");
                              return;
                            }
                            goToTasks("采购申请生成", "成本分析");
                          }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {active === "效率分析" ? (
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        <Card>
                          <CardContent className="p-3 text-sm">
                            <p className="text-muted-foreground">流程超时率</p>
                            <p className="mt-1 text-xl font-semibold text-rose-600">28.4%</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-3 text-sm">
                            <p className="text-muted-foreground">打回率</p>
                            <p className="mt-1 text-xl font-semibold text-amber-600">19.2%</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-3 text-sm">
                            <p className="text-muted-foreground">自动化机会数</p>
                            <p className="mt-1 text-xl font-semibold text-cyan-700">4</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">流程耗时拆解图</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ProcessDurationChart data={processDurationData} />
                          <div className="mt-2 space-y-1 text-xs">
                            {processDurationData.map((item) => (
                              <div key={item.node} className="flex items-center justify-between rounded border p-2">
                                <span>{item.node}</span>
                                <span>{item.avgDays} 天</span>
                                <span className={item.changePct > 0 ? "text-rose-600" : "text-emerald-600"}>环比 {item.changePct}%</span>
                                <Badge variant={item.avgDays > item.threshold ? "danger" : "success"}>
                                  {item.avgDays > item.threshold ? "超阈值" : "正常"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">流程周期趋势</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={lowEfficiencyCases}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                <XAxis dataKey="projectName" hide />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalDays" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      <div>
                        <p className="mb-2 text-sm font-medium">流程瓶颈 Top 列表</p>
                        <div className="grid gap-3 md:grid-cols-3">
                          {processBottlenecks.map((item) => (
                            <BottleneckCard key={item.id} item={item} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium">低效流程案例卡片</p>
                        <div className="space-y-2">
                          {lowEfficiencyCases.map((item) => (
                            <div key={item.id} className="rounded-lg border p-3 text-sm">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{item.projectName}</p>
                                <Badge variant="warning">{item.totalDays}天</Badge>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {item.flowType} · 最慢节点：{item.slowestNode}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">{item.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium">自动化机会识别</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {automationOpportunities.map((item) => (
                            <AutomationOpportunityCard key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {active === "成本分析" ? (
                <AnalysisInsightPanel
                  title="AI洞察 / 建议动作（成本）"
                  module="decision"
                  contentType="成本分析"
                  summary={[
                    "IT网络设备近3个月采购成本上涨18%，高于历史均值",
                    "交换机与安全网关是高波动品类，预算偏差持续扩大",
                    "供应商集中度过高且紧急采购占比提升，折扣未触发"
                  ]}
                  reasons={["供应商涨价", "项目分散采购", "市场价格波动", "预算偏差", "紧急采购占比过高"]}
                  actions={[
                    { label: "建议动作：发起供应商复核", onClick: () => goToTasks("采购申请生成", "成本分析") },
                    { label: "建议动作：生成降本分析报告", onClick: () => goToTasks("降本分析报告", "成本分析") },
                    { label: "建议动作：进入报价对比", onClick: () => setActive("报价对比") },
                    { label: "建议动作：生成采购申请优化建议", onClick: () => goToTasks("采购申请生成", "成本分析") },
                    {
                      label: "建议动作：进入对话深度分析",
                      onClick: () => goToChat("请分析该品类最近成本上涨的原因并给出采购建议")
                    }
                  ]}
                />
              ) : null}

              {active === "效率分析" ? (
                <AnalysisInsightPanel
                  title="AI洞察 / 建议动作（效率）"
                  module="decision"
                  contentType="效率分析"
                  summary={[
                    "近30天 IT类采购平均周期为19.6天，高于部门目标 5.2 天",
                    "瓶颈主要集中在技术需求补充与采购经理审批环节",
                    "非标准模板使用率高，导致合同条款反复修改"
                  ]}
                  reasons={["审批层级过长", "材料不完整导致打回", "非标准模板使用率高", "合同条款反复修改", "紧急采购流程绕行"]}
                  actions={[
                    { label: "建议动作：发起流程优化建议", onClick: () => goToTasks("效率分析报告", "效率分析") },
                    { label: "建议动作：生成效率分析报告", onClick: () => goToTasks("效率分析报告", "效率分析") },
                    { label: "建议动作：进入任务助手生成审批材料", onClick: () => goToTasks("采购申请生成", "效率分析") },
                    { label: "建议动作：标记为自动化候选场景", onClick: () => goToTasks("效率分析报告", "效率分析") },
                    { label: "建议动作：进入流程助手", onClick: () => router.push("/workflow") },
                    { label: "建议动作：进入对话深度分析", onClick: () => goToChat("请根据当前流程瓶颈给出优化建议") }
                  ]}
                />
              ) : null}

              {!["成本分析", "效率分析"].includes(active) ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AI建议 / 风险说明 / 建议动作</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="rounded-lg border p-3">
                      <p className="flex items-center gap-2 font-medium">
                        <Lightbulb className="h-4 w-4 text-primary" /> 推荐方案
                      </p>
                      <p className="mt-2 text-muted-foreground">
                        优先选择“华辰科技”，在成本略高于最低价情况下，交付稳定性与条款可控性更优。
                      </p>
                    </div>
                    <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
                      <p className="flex items-center gap-2 font-medium">
                        <AlertTriangle className="h-4 w-4 text-rose-500" /> 风险说明
                      </p>
                      <p className="mt-2 text-muted-foreground">
                        供应商“启岳信息”预付款比例过高，且知识产权条款历史整改率偏低，不建议作为首选。
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="info">建议动作：发起供应商复核</Badge>
                      <Badge variant="warning">建议动作：补充合同修订条款</Badge>
                      <Badge variant="success">建议动作：提交审批</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" onClick={() => goToTasks("采购申请生成", "供应商分析结果")}>
                        生成采购申请
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => goToTasks("供应商比价摘要", "价格对比分析")}>
                        生成比价报告
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => goToTasks("合同要点提炼", "合同风险分析")}>
                        生成合同审查报告
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => goToTasks("采购申请生成", "流程发起建议")}>
                        发起采购流程
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">该回答基于历史反馈优化生成</p>
                    <FeedbackButton module="decision" contentType={active} />
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
