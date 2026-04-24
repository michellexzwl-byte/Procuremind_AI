"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { AgentItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function AgentCard({ agent, onPreview }: { agent: AgentItem; onPreview: (agent: AgentItem) => void }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full border-border/80">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between">
            <Badge variant={agent.status === "online" ? "success" : "warning"}>{agent.status === "online" ? "在线" : "离线"}</Badge>
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <Star className="h-3.5 w-3.5 fill-current" />
              {agent.rating}
            </div>
          </div>
          <CardTitle>{agent.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-1.5">
            {agent.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-muted-foreground">绑定知识库：{agent.knowledgeBases.join(" / ")}</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">调用次数</span>
            <span className="font-medium">{agent.calls}</span>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => onPreview(agent)}>
            预览能力
          </Button>
          <Button size="sm" onClick={() => (window.location.href = "/chat")} className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />立即使用
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
