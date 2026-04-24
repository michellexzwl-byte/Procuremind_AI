export type RiskLevel = "low" | "medium" | "high" | "critical";
export type WorkflowNodeStatus = "todo" | "done" | "risk" | "missing";

export interface TodoItem {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  priority: "P1" | "P2" | "P3";
}

export interface UsageMetric {
  label: string;
  value: number;
  trend: number;
}

export interface KnowledgeDoc {
  id: string;
  name: string;
  category: string;
  version: string;
  updatedAt: string;
  permission: string;
  snippet: string;
}

export interface Citation {
  docName?: string;
  docId: string;
  quote: string;
  clause: string;
  version?: string;
  updatedAt?: string;
  permission?: string;
  confidence: number;
}

export interface KnowledgeReference {
  docName: string;
  docId: string;
  clause: string;
  version: string;
  updatedAt: string;
  permission: string;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  mode?: "knowledge" | "document" | "workflow" | "decision";
  content: string;
  time: string;
  citations?: Citation[];
  reasoning?: string[];
  tools?: string[];
  outputCard?: {
    title: string;
    bullets: string[];
  };
}

export interface Supplier {
  id: string;
  name: string;
  quality: number;
  cost: number;
  delivery: number;
  collaboration: number;
  risk: RiskLevel;
  recentOrders: number;
}

export interface Quote {
  supplierId: string;
  totalPrice: number;
  deliveryDays: number;
  paymentTerms: string;
  warrantyMonths: number;
  abnormal?: string;
}

export interface ContractRiskItem {
  id: string;
  clause: string;
  risk: RiskLevel;
  issue: string;
  suggestion: string;
}

export interface WorkflowNode {
  id: string;
  name: string;
  status: WorkflowNodeStatus;
  owner: string;
  deadline: string;
}

export interface AgentItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  knowledgeBases: string[];
  calls: number;
  rating: number;
  tools: string[];
  status: "online" | "offline";
}

export interface PromptTemplate {
  id: string;
  name: string;
  version: string;
  scenario: string;
  updatedAt: string;
  style: "正式" | "严谨" | "高管";
  content: string;
  favorite?: boolean;
}

export interface KnowledgeBaseStatus {
  id: string;
  name: string;
  docs: number;
  updatedAt: string;
  hitRate: number;
  chunkStatus: "完成" | "处理中";
  vectorStatus: "已向量化" | "排队中";
  active: boolean;
}

export interface MonitoringPoint {
  date: string;
  hitRate: number;
  latency: number;
  satisfaction: number;
  riskAnswerRatio: number;
}

export interface RecentScenario {
  id: string;
  title: string;
  route: string;
  usedAt: string;
}

export type FeedbackModule = "task" | "decision" | "chat" | "knowledge";

export type FeedbackType = "内容不准确" | "不够完整" | "不符合业务" | "格式不好" | "其他";

export interface FeedbackItem {
  id: string;
  module: FeedbackModule;
  contentType: string;
  feedbackType: FeedbackType;
  comment: string;
  timestamp: string;
  status: "未处理" | "已优化";
  sentiment: "positive" | "negative";
}

export interface CostAnalysisRecord {
  month: string;
  actual: number;
  budget: number;
  yoy: number;
  mom: number;
}

export interface CostCategoryShare {
  category: string;
  value: number;
  volatility: "normal" | "high";
}

export interface CostAnomalyCardData {
  id: string;
  category: string;
  currentUnitPrice: number;
  historicalAvgPrice: number;
  deviation: number;
  level: "低" | "中" | "高";
  reason: string;
}

export interface CostOpportunity {
  id: string;
  title: string;
  description: string;
  estimatedSavings: number;
  action: string;
}

export interface EfficiencyAnalysisRecord {
  week: string;
  cycleDays: number;
  targetDays: number;
}

export interface ProcessDurationRecord {
  node: string;
  avgDays: number;
  changePct: number;
  threshold: number;
}

export interface ProcessBottleneck {
  id: string;
  node: string;
  avgDays: number;
  affectedFlows: number;
  issue: string;
}

export interface EfficiencyCaseRecord {
  id: string;
  projectName: string;
  flowType: string;
  totalDays: number;
  slowestNode: string;
  reason: string;
}

export interface AutomationOpportunity {
  id: string;
  title: string;
  description: string;
  impact: string;
}
