import {
  AgentItem,
  ChatMessage,
  CostAnalysisRecord,
  CostAnomalyCardData,
  CostCategoryShare,
  CostOpportunity,
  ContractRiskItem,
  EfficiencyAnalysisRecord,
  EfficiencyCaseRecord,
  KnowledgeBaseStatus,
  KnowledgeDoc,
  MonitoringPoint,
  ProcessBottleneck,
  ProcessDurationRecord,
  PromptTemplate,
  Quote,
  Supplier,
  TodoItem,
  UsageMetric,
  WorkflowNode,
  AutomationOpportunity
} from "@/types";

export const todayTodos: TodoItem[] = [
  { id: "todo-1", title: "完成服务器采购项目立项审核", owner: "王晓晨", dueDate: "2026-04-12 16:00", priority: "P1" },
  { id: "todo-2", title: "补齐单一来源说明与市场调研报告", owner: "陈立", dueDate: "2026-04-12 18:00", priority: "P1" },
  { id: "todo-3", title: "发起Q2办公耗材框架协议续签", owner: "李悦", dueDate: "2026-04-13 10:00", priority: "P2" },
  { id: "todo-4", title: "跟进法务合同审查反馈", owner: "赵佳宁", dueDate: "2026-04-13 14:00", priority: "P2" }
];

export const usageMetrics: UsageMetric[] = [
  { label: "今日AI调用", value: 286, trend: 12.4 },
  { label: "合规校验次数", value: 74, trend: 8.1 },
  { label: "文档生成次数", value: 53, trend: 16.7 },
  { label: "风险预警命中", value: 19, trend: -4.2 }
];

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: "doc-01",
    name: "采购管理制度（2026修订版）",
    category: "制度库",
    version: "v3.2",
    updatedAt: "2026-03-28",
    permission: "采购中心全员",
    snippet: "单笔预算人民币50万元及以上的采购，原则上应采用公开招标或邀请招标方式。"
  },
  {
    id: "doc-02",
    name: "IT设备采购实施细则",
    category: "流程库",
    version: "v2.4",
    updatedAt: "2026-04-01",
    permission: "采购 + 信息化",
    snippet: "IT设备采购在满足标准化配置条件下可走框架协议，但需保留三家供应商比价记录。"
  },
  {
    id: "doc-03",
    name: "单一来源采购指引",
    category: "流程库",
    version: "v1.9",
    updatedAt: "2026-02-19",
    permission: "采购经理及以上",
    snippet: "单一来源必须提供技术不可替代说明、市场调研证明、历史价格对比及专家论证意见。"
  },
  {
    id: "doc-04",
    name: "标准采购申请模板",
    category: "模板库",
    version: "v5.0",
    updatedAt: "2026-03-06",
    permission: "全员可读",
    snippet: "采购申请需明确业务背景、预算科目、需求规格、交付时间及验收标准。"
  },
  {
    id: "doc-05",
    name: "合同条款风险库",
    category: "合同条款库",
    version: "v2.7",
    updatedAt: "2026-03-18",
    permission: "采购 + 法务",
    snippet: "违约责任、知识产权归属、保密条款、验收条款缺失会触发高风险提示。"
  },
  {
    id: "doc-06",
    name: "供应商准入与淘汰规则",
    category: "供应商规则库",
    version: "v4.1",
    updatedAt: "2026-04-02",
    permission: "采购中心",
    snippet: "连续两季度交付准时率低于90%的供应商应进入观察名单并限制新增订单。"
  }
];

export const knowledgeChats: ChatMessage[] = [
  {
    id: "k-1",
    role: "user",
    content: "50万以上采购需要走什么流程？",
    time: "09:12"
  },
  {
    id: "k-2",
    role: "assistant",
    mode: "knowledge",
    content:
      "根据当前制度，单笔预算达到50万元及以上时，默认进入公开招标或邀请招标路径。若业务紧急且存在不可替代供应商，可申请单一来源，但需补齐技术不可替代说明、市场调研证明与专家论证材料，并升级至采购总监审批。",
    time: "09:12",
    citations: [
      {
        docName: "采购管理制度（2026修订版）",
        docId: "doc-01",
        quote: "50万元及以上应采用招标方式",
        clause: "第4.2条",
        version: "v3.2",
        updatedAt: "2026-03-28",
        permission: "采购中心全员",
        confidence: 0.93
      },
      {
        docName: "单一来源采购指引",
        docId: "doc-03",
        quote: "单一来源需完整证明材料",
        clause: "第2.1条",
        version: "v1.9",
        updatedAt: "2026-02-19",
        permission: "采购经理及以上",
        confidence: 0.9
      }
    ]
  },
  {
    id: "k-3",
    role: "user",
    content: "IT设备采购是否必须招标？",
    time: "09:13"
  },
  {
    id: "k-4",
    role: "assistant",
    mode: "knowledge",
    content:
      "不一定。若IT设备属于已签框架协议范围，且配置标准化、金额未触发强制招标阈值，可走比价或框架下单流程；若金额超阈值、需求定制化明显，仍需走招标程序。",
    time: "09:13",
    citations: [
      {
        docName: "IT设备采购实施细则",
        docId: "doc-02",
        quote: "框架协议场景可保留三家比价记录",
        clause: "第3.5条",
        version: "v2.4",
        updatedAt: "2026-04-01",
        permission: "采购 + 信息化",
        confidence: 0.88
      }
    ]
  }
];

export const suppliers: Supplier[] = [
  { id: "sup-a", name: "华辰科技", quality: 90, cost: 78, delivery: 86, collaboration: 88, risk: "low", recentOrders: 21 },
  { id: "sup-b", name: "凌峰系统", quality: 83, cost: 92, delivery: 79, collaboration: 81, risk: "medium", recentOrders: 16 },
  { id: "sup-c", name: "启岳信息", quality: 75, cost: 85, delivery: 72, collaboration: 70, risk: "high", recentOrders: 9 }
];

export const quotes: Quote[] = [
  {
    supplierId: "sup-a",
    totalPrice: 468000,
    deliveryDays: 25,
    paymentTerms: "30%预付款，70%验收后30天",
    warrantyMonths: 36
  },
  {
    supplierId: "sup-b",
    totalPrice: 452000,
    deliveryDays: 38,
    paymentTerms: "20%预付款，80%验收后60天",
    warrantyMonths: 24,
    abnormal: "交付周期明显偏长"
  },
  {
    supplierId: "sup-c",
    totalPrice: 491000,
    deliveryDays: 21,
    paymentTerms: "50%预付款，50%发货前",
    warrantyMonths: 18,
    abnormal: "预付款比例高于常规策略"
  }
];

export const contractRisks: ContractRiskItem[] = [
  {
    id: "risk-1",
    clause: "违约责任",
    risk: "high",
    issue: "对方违约赔偿上限缺失，无法覆盖停工损失",
    suggestion: "补充违约金计算公式，并设置最低赔偿门槛"
  },
  {
    id: "risk-2",
    clause: "验收条款",
    risk: "medium",
    issue: "验收标准描述模糊，缺少量化指标",
    suggestion: "增加性能指标、验收周期及复验流程"
  },
  {
    id: "risk-3",
    clause: "知识产权归属",
    risk: "critical",
    issue: "定制开发成果归属未明确，存在后续使用争议",
    suggestion: "新增成果归属与授权范围条款"
  },
  {
    id: "risk-4",
    clause: "保密条款",
    risk: "low",
    issue: "基本完整，但未覆盖第三方分包场景",
    suggestion: "补充分包人员保密义务传递机制"
  }
];

export const workflowNodes: WorkflowNode[] = [
  { id: "wf-1", name: "需求发起", status: "done", owner: "需求部门", deadline: "2026-04-10" },
  { id: "wf-2", name: "采购评审", status: "done", owner: "采购经理", deadline: "2026-04-11" },
  { id: "wf-3", name: "比价/招标", status: "risk", owner: "采购专员", deadline: "2026-04-13" },
  { id: "wf-4", name: "合同审查", status: "missing", owner: "法务", deadline: "2026-04-14" },
  { id: "wf-5", name: "审批", status: "todo", owner: "采购总监", deadline: "2026-04-15" },
  { id: "wf-6", name: "下单", status: "todo", owner: "采购执行", deadline: "2026-04-16" }
];

export const agents: AgentItem[] = [
  {
    id: "agent-knowledge",
    name: "制度问答助手",
    description: "基于制度库与流程库的采购合规问答智能体",
    tags: ["RAG", "制度检索", "条款定位"],
    knowledgeBases: ["采购制度库", "流程库"],
    calls: 1289,
    rating: 4.8,
    tools: ["向量检索", "条款引用", "版本比对"],
    status: "online"
  },
  {
    id: "agent-tender",
    name: "招标文档助手",
    description: "自动生成招标大纲、技术条款与评分标准",
    tags: ["文档生成", "模板填充"],
    knowledgeBases: ["模板库", "历史案例库"],
    calls: 963,
    rating: 4.6,
    tools: ["模板引擎", "术语标准化"],
    status: "online"
  },
  {
    id: "agent-contract",
    name: "合同风险助手",
    description: "识别高风险条款并生成修订建议",
    tags: ["合同审查", "风险识别"],
    knowledgeBases: ["合同条款库"],
    calls: 744,
    rating: 4.7,
    tools: ["规则引擎", "风险评分"],
    status: "online"
  },
  {
    id: "agent-quote",
    name: "比价分析助手",
    description: "对供应商报价差异进行结构化分析",
    tags: ["比价摘要", "成本分析"],
    knowledgeBases: ["供应商规则库", "历史案例库"],
    calls: 851,
    rating: 4.5,
    tools: ["报价归一化", "异常检测"],
    status: "online"
  },
  {
    id: "agent-flow",
    name: "流程判定助手",
    description: "根据采购规则推荐流程路径与审批层级",
    tags: ["流程判定", "合规校验"],
    knowledgeBases: ["流程库", "制度库"],
    calls: 617,
    rating: 4.6,
    tools: ["规则路由", "材料完整性检查"],
    status: "offline"
  },
  {
    id: "agent-report",
    name: "采购汇报助手",
    description: "生成周报、月报和高管汇报材料",
    tags: ["报告生成", "高管视图"],
    knowledgeBases: ["历史案例库"],
    calls: 432,
    rating: 4.4,
    tools: ["图表摘要", "结构化写作"],
    status: "online"
  }
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "pt-1",
    name: "采购申请标准模板",
    version: "v1.8",
    scenario: "采购申请生成",
    updatedAt: "2026-04-08",
    style: "正式",
    content: "请基于输入背景输出采购申请，包含业务必要性、预算测算、交付时间和验收标准。"
  },
  {
    id: "pt-2",
    name: "合同风险审查模板",
    version: "v2.3",
    scenario: "合同要点提炼",
    updatedAt: "2026-04-01",
    style: "严谨",
    content: "请逐条识别合同风险，标注风险等级、触发条件、建议修订文本。"
  },
  {
    id: "pt-3",
    name: "采购汇报模板",
    version: "v1.2",
    scenario: "邮件 / 汇报文案",
    updatedAt: "2026-03-30",
    style: "高管",
    content: "请生成高管视角采购汇报，突出成本节省、风险控制与执行效率。"
  }
];

export const knowledgeBases: KnowledgeBaseStatus[] = [
  {
    id: "kb-1",
    name: "采购制度库",
    docs: 126,
    updatedAt: "2026-04-10 09:20",
    hitRate: 91.4,
    chunkStatus: "完成",
    vectorStatus: "已向量化",
    active: true
  },
  {
    id: "kb-2",
    name: "流程规范库",
    docs: 84,
    updatedAt: "2026-04-09 18:05",
    hitRate: 88.2,
    chunkStatus: "完成",
    vectorStatus: "已向量化",
    active: true
  },
  {
    id: "kb-3",
    name: "合同条款库",
    docs: 47,
    updatedAt: "2026-04-11 11:40",
    hitRate: 79.3,
    chunkStatus: "处理中",
    vectorStatus: "排队中",
    active: false
  }
];

export const monitoringData: MonitoringPoint[] = [
  { date: "04-06", hitRate: 88.1, latency: 2.4, satisfaction: 4.3, riskAnswerRatio: 7.2 },
  { date: "04-07", hitRate: 89.6, latency: 2.2, satisfaction: 4.4, riskAnswerRatio: 6.8 },
  { date: "04-08", hitRate: 90.2, latency: 2.3, satisfaction: 4.5, riskAnswerRatio: 7.6 },
  { date: "04-09", hitRate: 91.5, latency: 2.1, satisfaction: 4.6, riskAnswerRatio: 8.1 },
  { date: "04-10", hitRate: 90.8, latency: 2.5, satisfaction: 4.4, riskAnswerRatio: 8.4 },
  { date: "04-11", hitRate: 92.0, latency: 2.0, satisfaction: 4.7, riskAnswerRatio: 7.9 },
  { date: "04-12", hitRate: 91.4, latency: 2.2, satisfaction: 4.6, riskAnswerRatio: 7.5 }
];

export const recentChats: ChatMessage[] = [
  {
    id: "c1",
    role: "user",
    content: "帮我生成‘华东区网络设备更新’采购申请，预算80万。",
    time: "10:06"
  },
  {
    id: "c2",
    role: "assistant",
    mode: "document",
    content: "已为你生成采购申请初稿，包含业务背景、预算拆解、交付计划与审批建议。",
    time: "10:06",
    reasoning: ["识别任务类型为采购申请", "调用采购申请模板v1.8", "补全审批层级与材料清单"],
    tools: ["模板引擎", "流程规则校验"],
    citations: [
      {
        docName: "标准采购申请模板",
        docId: "doc-04",
        quote: "申请需包含预算科目与验收标准",
        clause: "模板字段说明",
        version: "v5.0",
        updatedAt: "2026-03-06",
        permission: "全员可读",
        confidence: 0.89
      }
    ],
    outputCard: {
      title: "采购申请已生成",
      bullets: ["预算总额：¥800,000", "审批建议：采购经理 -> 采购总监", "缺失材料：技术需求附件"]
    }
  }
];

export const procurementShortcuts = [
  "50万以上采购需要走什么流程？",
  "IT设备采购是否必须招标？",
  "单一来源采购需要哪些材料？",
  "如何快速生成采购申请？",
  "合同中哪些条款属于高风险？"
];

export const riskAlerts = [
  "服务器采购项目金额超阈值，需升级至采购总监审批",
  "供应商‘启岳信息’连续2次交付延期，建议限制新增订单",
  "合同草案缺少知识产权归属条款，风险等级：高",
  "本周原材料指数上涨4.8%，建议锁价或分批下单"
];

export const recentTasks = [
  "已生成《华南办公网络扩容》招标大纲",
  "已完成Q2办公耗材比价摘要",
  "已推送‘华辰科技’合同审查单到法务",
  "已同步两条采购流程到OA待审批"
];

export const scenarioEntries = [
  { title: "制度快速问答", route: "/knowledge", desc: "查询制度条款、流程依据与历史案例" },
  { title: "招标文件生成", route: "/tasks", desc: "基于项目参数生成招标文件大纲与正文" },
  { title: "供应商决策分析", route: "/decision", desc: "对报价、绩效与风险进行智能判断" }
];

export const modelList = [
  { name: "PM-GPT-4.1", latency: "2.1s", cost: "¥0.12/千tokens", scene: "通用问答", tags: ["文本", "稳定"] },
  { name: "PM-Reasoner", latency: "3.0s", cost: "¥0.18/千tokens", scene: "合规推理", tags: ["推理", "规则"] },
  { name: "PM-DocWriter", latency: "2.6s", cost: "¥0.15/千tokens", scene: "文档生成", tags: ["长文", "结构化"] }
];

export const workflowCards = [
  { name: "合同审查流", status: "运行中", lastRun: "2026-04-12 09:44", nodes: ["条款抽取", "风险评分", "法务推送"] },
  { name: "采购申请生成流", status: "健康", lastRun: "2026-04-12 10:02", nodes: ["字段识别", "模板填充", "流程判定"] },
  { name: "供应商评估流", status: "告警", lastRun: "2026-04-12 08:15", nodes: ["绩效汇总", "风险检测", "推荐输出"] }
];

export const operationLogs = [
  "10:18 王晓晨 导出《服务器采购比价报告》",
  "10:12 李悦 修改提示词模板: 采购申请标准模板v1.8",
  "09:58 陈立 推送合同审查任务至法务",
  "09:46 赵佳宁 切换默认模型为 PM-Reasoner"
];

export const costTrendData: CostAnalysisRecord[] = [
  { month: "11月", actual: 360, budget: 340, yoy: 12.4, mom: 3.2 },
  { month: "12月", actual: 382, budget: 355, yoy: 14.8, mom: 6.1 },
  { month: "1月", actual: 398, budget: 360, yoy: 16.3, mom: 4.2 },
  { month: "2月", actual: 412, budget: 370, yoy: 17.1, mom: 3.5 },
  { month: "3月", actual: 436, budget: 378, yoy: 18.0, mom: 5.8 },
  { month: "4月", actual: 428, budget: 382, yoy: 15.2, mom: -1.8 }
];

export const costCategoryShare: CostCategoryShare[] = [
  { category: "IT网络设备", value: 38, volatility: "high" },
  { category: "办公终端", value: 22, volatility: "normal" },
  { category: "安全服务", value: 16, volatility: "high" },
  { category: "耗材", value: 14, volatility: "normal" },
  { category: "维保服务", value: 10, volatility: "normal" }
];

export const costAnomalies: CostAnomalyCardData[] = [
  {
    id: "ca-1",
    category: "交换机",
    currentUnitPrice: 12600,
    historicalAvgPrice: 10400,
    deviation: 21.2,
    level: "高",
    reason: "供应商A报价上浮且紧急采购占比提升"
  },
  {
    id: "ca-2",
    category: "安全网关",
    currentUnitPrice: 18400,
    historicalAvgPrice: 16600,
    deviation: 10.8,
    level: "中",
    reason: "项目分散采购导致批量折扣未触发"
  },
  {
    id: "ca-3",
    category: "服务器维保",
    currentUnitPrice: 7800,
    historicalAvgPrice: 7420,
    deviation: 5.1,
    level: "低",
    reason: "服务范围扩大，合同条款增加延保服务"
  }
];

export const costOpportunities: CostOpportunity[] = [
  {
    id: "co-1",
    title: "切换替代供应商进行二轮议价",
    description: "对交换机品类引入供应商B/C对比，压低高于均价部分",
    estimatedSavings: 180000,
    action: "发起供应商复核"
  },
  {
    id: "co-2",
    title: "将分散需求合并为集中采购批次",
    description: "统一采购窗口，触发阶梯折扣与物流成本摊薄",
    estimatedSavings: 95000,
    action: "生成降本分析报告"
  },
  {
    id: "co-3",
    title: "优化付款条件降低隐性成本",
    description: "将高预付款合约改为验收后分期，降低资金占用",
    estimatedSavings: 62000,
    action: "进入报价对比"
  }
];

export const efficiencyTrendData: EfficiencyAnalysisRecord[] = [
  { week: "W1", cycleDays: 17.8, targetDays: 14 },
  { week: "W2", cycleDays: 18.6, targetDays: 14 },
  { week: "W3", cycleDays: 19.1, targetDays: 14 },
  { week: "W4", cycleDays: 19.6, targetDays: 14 },
  { week: "W5", cycleDays: 18.9, targetDays: 14 },
  { week: "W6", cycleDays: 18.4, targetDays: 14 }
];

export const processDurationData: ProcessDurationRecord[] = [
  { node: "需求发起", avgDays: 2.1, changePct: 4.2, threshold: 2.5 },
  { node: "采购评审", avgDays: 3.2, changePct: 8.4, threshold: 3 },
  { node: "比价/招标", avgDays: 4.8, changePct: 12.8, threshold: 4 },
  { node: "合同审查", avgDays: 3.9, changePct: 15.6, threshold: 3.5 },
  { node: "审批", avgDays: 4.1, changePct: 10.2, threshold: 3 },
  { node: "下单", avgDays: 1.5, changePct: -2.5, threshold: 2 }
];

export const processBottlenecks: ProcessBottleneck[] = [
  {
    id: "pb-1",
    node: "技术需求补充",
    avgDays: 3.7,
    affectedFlows: 18,
    issue: "材料缺失导致反复补件，打回率高"
  },
  {
    id: "pb-2",
    node: "采购经理审批",
    avgDays: 4.2,
    affectedFlows: 15,
    issue: "多级串行审批，节假日前后积压明显"
  },
  {
    id: "pb-3",
    node: "合同条款确认",
    avgDays: 3.4,
    affectedFlows: 11,
    issue: "非标准模板使用率高，法务往返次数增加"
  }
];

export const lowEfficiencyCases: EfficiencyCaseRecord[] = [
  {
    id: "ef-1",
    projectName: "华东办公终端更新",
    flowType: "比价",
    totalDays: 23,
    slowestNode: "采购经理审批",
    reason: "审批层级串行 + 材料补件2次"
  },
  {
    id: "ef-2",
    projectName: "网络安全改造",
    flowType: "招标",
    totalDays: 28,
    slowestNode: "合同审查",
    reason: "条款反复修订，法务反馈4轮"
  },
  {
    id: "ef-3",
    projectName: "服务器维保续签",
    flowType: "框架采购",
    totalDays: 19,
    slowestNode: "技术需求补充",
    reason: "需求模板未标准化，附件缺失"
  }
];

export const automationOpportunities: AutomationOpportunity[] = [
  {
    id: "ao-1",
    title: "采购申请表单自动生成",
    description: "自动填充预算、需求背景与验收字段，减少人工录入",
    impact: "预计缩短 1.8 天"
  },
  {
    id: "ao-2",
    title: "审批材料自动补全",
    description: "根据流程规则补齐必备附件并预校验完整性",
    impact: "预计降低打回率 22%"
  },
  {
    id: "ao-3",
    title: "合同条款预审",
    description: "在送法务前识别高风险条款并给出修订建议",
    impact: "预计减少往返轮次 2 次"
  },
  {
    id: "ao-4",
    title: "重复流程智能推荐",
    description: "复用历史高通过率模板与审批路径",
    impact: "预计缩短审批链 1.2 天"
  }
];
