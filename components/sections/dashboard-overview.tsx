"use client"

import { FileText, Zap, CheckCircle2, TrendingUp } from "lucide-react"
import MetricCard from "@/components/metric-card"

export default function DashboardOverview() {
  const metrics = [
    {
      label: "Documents Processed",
      value: "1,247",
      change: "+12.5%",
      icon: <FileText size={24} />,
      trend: "up",
    },
    {
      label: "Active URLs",
      value: "142",
      change: "+8.2%",
      icon: <Zap size={24} />,
      trend: "up",
    },
    {
      label: "System Uptime",
      value: "99.94%",
      change: "+0.02%",
      icon: <CheckCircle2 size={24} />,
      trend: "up",
    },
    {
      label: "Processing Speed",
      value: "2.4s",
      change: "-15.3%",
      icon: <TrendingUp size={24} />,
      trend: "down",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Real time overview of your tax document system</p>
      </div>

      {/* Integration Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
        <span className="text-sm font-semibold text-accent">✓ Integrated with EL RAG</span>
      </div>

      {/* Metrics Grid - Added System Uptime and Processing Speed cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Main Content Grid - Added System Scalability section with progress bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Scalability */}
        <div className="lg:col-span-2 p-6 rounded-lg bg-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">System Scalability</h2>
          <div className="space-y-6">
            {/* Document Processing Capacity */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground font-medium">Document Processing Capacity</span>
                <span className="text-accent font-semibold">87%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "87%" }} />
              </div>
            </div>

            {/* Storage Utilization */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground font-medium">Storage Utilization</span>
                <span className="text-accent font-semibold">64%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "64%" }} />
              </div>
            </div>

            {/* API Request Quota */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground font-medium">API Request Quota</span>
                <span className="text-accent font-semibold">42%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "42%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Expanded with more statistics */}
        <div className="p-6 rounded-lg bg-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total URLs</span>
              <span className="text-lg font-bold text-foreground">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Last 24h Updates</span>
              <span className="text-lg font-bold text-foreground">287</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Users</span>
              <span className="text-lg font-bold text-foreground">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">API Health</span>
              <span className="text-sm font-bold text-accent">✓ Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
