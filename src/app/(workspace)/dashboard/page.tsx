import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock3, LibraryBig, Rocket, ShieldAlert } from "lucide-react";
import {
  agents,
  knowledgeBases,
  recentTasks,
  riskAlerts,
  scenarioEntries,
  todayTodos,
  usageMetrics
} from "@/mock/data";
import { MetricsChart } from "@/components/shared/metrics-chart";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <PageSectionHeader
        title="采购AI助手总览"
        subtitle="覆盖知识检索、任务生成、决策分析与平台管理的企业级 AI 工作台"
        badge="企业演示版"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {usageMetrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} trend={metric.trend} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock3 className="h-4 w-4 text-primary" /> 今日待办
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {todayTodos.map((todo) => (
              <div key={todo.id} className="rounded-lg border bg-background p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{todo.title}</p>
                  <Badge variant={todo.priority === "P1" ? "danger" : "warning"}>{todo.priority}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  负责人：{todo.owner} · 截止：{todo.dueDate}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Rocket className="h-4 w-4 text-primary" /> 采购场景快捷入口
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {scenarioEntries.map((entry) => (
              <Link key={entry.route} href={entry.route} className="block rounded-lg border bg-background p-3 transition hover:border-primary/40 hover:bg-primary/5">
                <p className="font-medium">{entry.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{entry.desc}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldAlert className="h-4 w-4 text-amber-500" /> 风险预警
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskAlerts.map((alert) => (
              <div key={alert} className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-sm">
                <p>{alert}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MetricsChart />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">知识库更新提醒</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {knowledgeBases.map((kb) => (
              <div key={kb.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{kb.name}</p>
                  <Badge variant={kb.active ? "success" : "warning"}>{kb.active ? "生效中" : "待生效"}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  文档 {kb.docs} 份 · 命中率 {kb.hitRate}% · 更新 {kb.updatedAt}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">最近任务</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {recentTasks.map((task) => (
              <div key={task} className="flex items-start gap-2 rounded-lg border p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <p>{task}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">推荐 Agent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {agents.slice(0, 3).map((agent) => (
              <div key={agent.id} className="rounded-lg border p-3">
                <p className="font-medium">{agent.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{agent.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">最近调用 {agent.calls} 次</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">推荐知识专题</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["单一来源合规判断专题", "IT设备采购条款模板专题", "供应商绩效评估案例专题"].map((topic) => (
              <div key={topic} className="rounded-lg border p-3 text-sm">
                <p className="font-medium">{topic}</p>
                <p className="mt-1 text-xs text-muted-foreground">已聚合制度、模板与历史案例，可直接用于问答与文档生成。</p>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2">
              <Link href="/knowledge">
                <AlertTriangle className="h-4 w-4" /> 查看知识助手
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 flex items-center gap-2 font-semibold">
          <LibraryBig className="h-4 w-4 text-primary" /> 最近问答摘要
        </h3>
        <blockquote className="rounded-lg border-l-4 border-primary bg-primary/5 p-3 text-sm leading-6">
          “单一来源采购必须提交技术不可替代说明、市场调研证明、历史价格对比与专家论证意见；金额超阈值时需升级审批层级。”
        </blockquote>
      </section>
    </div>
  );
}
