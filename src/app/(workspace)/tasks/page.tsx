"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Download, FileUp, RefreshCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { promptTemplates, quotes, suppliers } from "@/mock/data";
import { FeedbackButton } from "@/components/shared/feedback-button";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const taskTypes = ["招标文件生成", "采购申请生成", "供应商比价摘要", "合同要点提炼", "会议纪要生成", "邮件 / 汇报文案生成", "降本分析报告", "效率分析报告"];

function TasksPageContent() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(taskTypes[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [taskSource, setTaskSource] = useState("");
  const [taskFrom, setTaskFrom] = useState("");
  const [decisionTab, setDecisionTab] = useState("");

  const currentTemplate = useMemo(() => promptTemplates[0], []);

  useEffect(() => {
    const queryTask = searchParams.get("task");
    const source = searchParams.get("source");
    const from = searchParams.get("from");
    const tab = searchParams.get("decisionTab");
    if (queryTask && taskTypes.includes(queryTask)) {
      setActive(queryTask);
    }
    setTaskSource(source || "");
    setTaskFrom(from || "");
    setDecisionTab(tab || "");
  }, [searchParams]);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const compareContent =
        "比价摘要\n" +
        suppliers[0].name +
        "：总价468000，交期25天，综合评分最高。\n" +
        suppliers[1].name +
        "：总价452000，价格最低，但交期偏长（38天）。\n" +
        suppliers[2].name +
        "：总价491000，交期最快，但预付款比例偏高。\n\n" +
        "建议结论：优先推荐" +
        suppliers[0].name +
        "，兼顾交付稳定性与风险可控。";

      const contentMap: Record<string, string> = {
        招标文件生成:
          "一、项目概述\n1. 项目名称：华东区网络设备更新\n2. 项目预算：¥800,000\n\n二、采购范围\n- 核心交换机、接入交换机、防火墙与安装调试服务\n\n三、评标要点\n- 商务评分30%\n- 技术评分40%\n- 服务评分30%\n\n示例正文：本项目要求供应商在签约后25日内完成设备到货与基础部署，验收标准按照《IT设备采购实施细则》执行。",
        采购申请生成:
          "采购申请单\n申请部门：信息化部\n用途：办公网络升级\n金额：¥800,000\n期望交付：2026-05-20\n\n必要性说明：现网设备老化导致故障率上升，已影响核心业务系统稳定性。\n审批建议：采购经理 -> 采购总监。",
        供应商比价摘要: compareContent,
        合同要点提炼:
          "关键条款：\n1. 违约责任条款赔偿上限缺失（高风险）\n2. 验收标准未量化（中风险）\n3. 知识产权归属未明确（关键风险）\n\n缺失条款：\n- 定制成果归属条款\n- 第三方分包保密义务\n\n建议：补充修订条款后再提交流程审批。",
        会议纪要生成:
          "会议摘要：确认服务器采购按招标路径执行，预算上限120万。\n待办事项：\n- 张晨：4月14日前补充技术需求附件\n- 李悦：4月15日前完成三家供应商邀标\n- 法务：4月16日前完成合同模板预审",
        "邮件 / 汇报文案生成":
          "高管汇报摘要：Q2采购项目共计12项，AI辅助生成文档覆盖率68%，平均流程耗时下降22%。建议本月优先推进高金额项目的流程自动判定与合同风险预审，以降低审批回退率。",
        降本分析报告:
          "降本分析报告\n一、成本异常概览：IT网络设备近3个月实际成本高于预算18%。\n二、主要原因：供应商集中度过高、紧急采购占比上升、分散采购导致折扣未触发。\n三、可执行建议：\n1) 发起替代供应商二轮议价\n2) 合并采购窗口触发批量折扣\n3) 优化付款条件降低资金占用\n四、预计节省：约33.7万元。",
        效率分析报告:
          "效率分析报告\n一、流程周期现状：近30天平均周期19.6天，高于目标5.2天。\n二、主要瓶颈：技术需求补充、采购经理审批、合同条款确认。\n三、低效根因：材料不完整打回、非标准模板使用率高、审批链串行。\n四、优化动作：\n1) 引入审批材料自动补全\n2) 标准品切换模板化申请\n3) 合同预审前置到报价确认阶段。"
      };
      setResult(contentMap[active]);
      setLoading(false);
      toast.success("任务生成完成", { description: active + " 已输出结构化结果" });
    }, 900);
  };

  const jsonResult = JSON.stringify({ taskType: active, generatedAt: new Date().toISOString(), content: result }, null, 2);

  return (
    <div className="space-y-5">
      <PageSectionHeader title="任务助手" subtitle="让 AI 帮采购人员直接产出可落地内容" badge="任务工作台" />
      {taskSource ? (
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm">
          该任务基于【{taskSource}】自动生成
        </div>
      ) : null}
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="h-auto flex-wrap">
          {taskTypes.map((task) => (
            <TabsTrigger key={task} value={task} className="mb-1">
              {task}
            </TabsTrigger>
          ))}
        </TabsList>

        {taskTypes.map((task) => (
          <TabsContent key={task} value={task}>
            <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">参数输入</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">近期常见问题（基于用户反馈）：采购申请缺少预算依据、合同风险描述不完整</div>
                  <Input placeholder="采购项目名称" defaultValue="华东区网络设备更新" />
                  <Input placeholder="采购品类" defaultValue="IT设备" />
                  <Input placeholder="预算金额" defaultValue="800000" />
                  <Input placeholder="期望交付时间" defaultValue="2026-05-20" />
                  <Textarea placeholder="需求背景 / 交付要求" defaultValue="现有设备故障率上升，需在Q2完成核心网络升级。" />
                  {active === "合同要点提炼" ? (
                    <Button variant="outline" className="w-full gap-2">
                      <FileUp className="h-4 w-4" /> 上传合同文件（Mock）
                    </Button>
                  ) : null}
                  {active === "会议纪要生成" ? <Textarea placeholder="会议原文" defaultValue="会议讨论了采购方式、预算边界和交付要求..." /> : null}
                  <Button className="w-full gap-2" onClick={generate} disabled={loading}>
                    <Sparkles className="h-4 w-4" /> {loading ? "生成中..." : "生成内容"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base">AI 生成区</CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => result && navigator.clipboard.writeText(result)}>
                        复制结果
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success("已导出（Mock）")}>
                        导出 Word/PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success("草稿已保存")}>
                        保存草稿
                      </Button>
                      <Button size="sm" variant="outline" onClick={generate}>
                        <RefreshCcw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <>
                      <div className="mb-3 rounded-lg border bg-muted/30 p-3 text-xs">
                        <p className="font-medium">任务来源</p>
                        <p className="mt-1 text-muted-foreground">来源：{taskSource || "手动创建任务"}</p>
                        {taskFrom === "decision" ? (
                          <Link
                            href={decisionTab ? "/decision?tab=" + encodeURIComponent(decisionTab) : "/decision"}
                            className="mt-2 inline-block text-primary underline"
                          >
                            查看原分析
                          </Link>
                        ) : null}
                      </div>
                      <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/20 p-4 text-sm">{result}</pre>
                      <p className="mt-2 text-xs text-muted-foreground">该回答基于历史反馈优化生成</p>
                      <FeedbackButton module="task" contentType={active} />
                      <button className="mt-3 text-xs text-primary" onClick={() => setShowJson((v) => !v)}>
                        {showJson ? "收起结构化 JSON" : "展开结构化 JSON"}
                      </button>
                      {showJson ? <pre className="mt-2 max-h-[220px] overflow-auto rounded-lg border bg-slate-950 p-3 text-xs text-slate-100">{jsonResult}</pre> : null}
                    </>
                  ) : (
                    <EmptyPlaceholder title="等待生成结果" description="填写参数后点击“生成内容”，这里将展示结构化结果。" />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">模板 / Prompt / 输出格式</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">当前模板</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {currentTemplate.name} · {currentTemplate.version}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{currentTemplate.content}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="info">模板优化</Badge>
                      <span className="text-xs text-muted-foreground">该模板根据用户反馈已优化 3 次</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">输出风格</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        正式版
                      </Button>
                      <Button size="sm" variant="outline">
                        简洁版
                      </Button>
                      <Button size="sm" variant="outline">
                        高管汇报版
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">比价数据预览</p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {quotes.map((q) => {
                        const s = suppliers.find((it) => it.id === q.supplierId);
                        return (
                          <li key={q.supplierId}>
                            {s?.name}：{q.totalPrice} / {q.deliveryDays}天
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <Button className="w-full gap-2" variant="outline">
                    <Download className="h-4 w-4" /> 下载模板包
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">正在加载任务助手...</div>}>
      <TasksPageContent />
    </Suspense>
  );
}
