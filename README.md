# ProcureMind AI / 采购AI助手（前端高保真 Demo）

企业级采购 AI 工作台演示项目，覆盖：
- 知识助手（查）
- 任务助手（写 / 做）
- 决策助手（判）
- 平台底座（管）

## 技术栈

- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- shadcn 风格组件（本地实现）
- Zustand
- lucide-react
- recharts
- framer-motion
- sonner（Toast）
- 本地 mock 数据（无后端依赖）

## 启动方式

```bash
cd "/Users/michelle/Desktop/vibe-projects/ProcureMind AI"
npm install
npm run dev
```

浏览器访问：
- `http://localhost:3000`（默认跳转 `/dashboard`）

## 页面路由

- `/dashboard` 总览首页
- `/knowledge` 知识助手
- `/tasks` 任务助手
- `/decision` 决策助手
- `/platform` 平台底座
- `/agents` 场景广场 / Agent广场
- `/chat` 对话工作台

## 项目结构

```text
src/
  app/
    page.tsx
    layout.tsx
    (workspace)/
      layout.tsx
      dashboard/
      knowledge/
      tasks/
      decision/
      platform/
      agents/
      chat/
  components/
    layout/
    shared/
    ui/
    knowledge/
    tasks/
    workflow/
    decision/
    platform/
    agents/
    chat/
  mock/
    data.ts
  store/
    use-procure-store.ts
  types/
    index.ts
  lib/
    utils.ts
```

## 关键交互（已实现）

- 左侧导航切换与折叠
- 顶部全局栏 + 主题切换
- Cmd/Ctrl+K 命令面板
- 快速创建采购任务弹窗
- 多 Tab 切换
- 卡片 hover 动效
- 页面筛选与抽屉预览
- Mock 聊天发送与多轮记录
- Mock 任务生成 / 保存 / 导出按钮
- 图表展示（recharts）
- Skeleton / Empty State / Loading State

## 说明

- 所有业务数据位于 `src/mock/data.ts`。
- 该项目用于演示与扩展，不包含真实后端与真实大模型调用。
