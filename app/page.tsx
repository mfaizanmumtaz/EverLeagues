"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import DashboardOverview from "@/components/sections/dashboard-overview"
import URLManagement from "@/components/sections/url-management"
import ELCloudFiles from "@/components/sections/el-cloud-files"
import TaxChatbot from "@/components/sections/tax-chatbot"

type Section = "dashboard" | "urls" | "files" | "chatbot"

export default function Page() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "urls":
        return <URLManagement />
      case "files":
        return <ELCloudFiles />
      case "chatbot":
        return <TaxChatbot />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  )
}
