"use client"

import { useState } from "react"
import { Send, Settings, FileText } from "lucide-react"

interface SourceDocument {
  id: string
  title: string
  category: string
  jurisdiction: string
  url?: string
  excerpt?: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: SourceDocument[]
}

const STATES = ["NY", "CA", "NJ", "CT", "MA", "PA"]
const CATEGORIES = ["forms", "instructions", "faq", "code", "regulations", "bulletins", "sales-tax"]

const RANDOM_SOURCE_NAMES = [
  "Tax Form 1040 Guide",
  "Federal Income Tax Rules",
  "State Sales Tax Code",
  "Business Deduction Manual",
  "Corporate Tax Regulations",
  "Individual Return Instructions",
  "Tax Credit Eligibility",
  "Estimated Tax Payments",
  "Tax Filing Requirements",
  "Deduction Limitations",
]

const MOCK_SOURCE_DOCUMENTS: Record<string, SourceDocument[]> = {
  federal_forms: [
    {
      id: "1",
      title: "Form 1040 - U.S. Individual Income Tax Return",
      category: "forms",
      jurisdiction: "federal",
      excerpt: "The primary form used for reporting individual income tax returns to the IRS.",
    },
    {
      id: "2",
      title: "Form 1099-NEC - Nonemployee Compensation",
      category: "forms",
      jurisdiction: "federal",
      excerpt: "Used to report payments to independent contractors and self-employed individuals.",
    },
  ],
  federal_instructions: [
    {
      id: "3",
      title: "Instructions for Form 1040",
      category: "instructions",
      jurisdiction: "federal",
      excerpt: "Detailed instructions on how to complete your federal income tax return.",
    },
  ],
  federal_regulations: [
    {
      id: "4",
      title: "IRC Section 162 - Trade or Business Expenses",
      category: "regulations",
      jurisdiction: "federal",
      excerpt: "Regulations governing what business expenses are deductible for tax purposes.",
    },
  ],
  NY_forms: [
    {
      id: "5",
      title: "Form IT-201 - New York State Resident Income Tax Return",
      category: "forms",
      jurisdiction: "state",
      excerpt: "New York State's primary form for resident income tax returns.",
    },
  ],
  NY_sales_tax: [
    {
      id: "6",
      title: "New York Sales Tax Guide",
      category: "sales-tax",
      jurisdiction: "state",
      excerpt: "Comprehensive guide to New York sales tax rates and exemptions.",
    },
  ],
  CA_forms: [
    {
      id: "7",
      title: "Form 540 - California Resident Income Tax Return",
      category: "forms",
      jurisdiction: "state",
      excerpt: "California's primary form for resident income tax returns.",
    },
  ],
  CA_sales_tax: [
    {
      id: "8",
      title: "California Sales and Use Tax Guide",
      category: "sales-tax",
      jurisdiction: "state",
      excerpt: "Overview of California sales tax regulations and special tax rates.",
    },
  ],
}

export default function TaxChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Tax Document Assistant. How can I help you find tax information today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<"federal" | "state" | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null)

  const generateRandomSources = (): SourceDocument[] => {
    const randomCount = Math.floor(Math.random() * 2) + 3 // Random between 3-4
    const sources: SourceDocument[] = []

    for (let i = 0; i < randomCount; i++) {
      const randomName = RANDOM_SOURCE_NAMES[Math.floor(Math.random() * RANDOM_SOURCE_NAMES.length)]
      sources.push({
        id: `random-${Date.now()}-${i}`,
        title: randomName,
        category: selectedCategory || "general",
        jurisdiction: selectedJurisdiction === "federal" ? "federal" : "state",
      })
    }

    return sources
  }

  const handleJurisdictionSelect = (jurisdiction: "federal" | "state") => {
    setSelectedJurisdiction(jurisdiction)
    setSelectedState(null)
    setSelectedCategory(null)

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        jurisdiction === "federal"
          ? "You've selected Federal jurisdiction. What category would you like to search? (forms, instructions, faq, code, regulations, bulletins)"
          : "You've selected State jurisdiction. Which state would you like to search? (NY, CA, NJ, CT, MA, PA)",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
    setSelectedCategory(null)

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `You've selected ${state}. What category would you like to search? (forms, instructions, faq, code, regulations, bulletins, sales-tax)`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Searching for ${category} in ${
        selectedJurisdiction === "federal" ? "Federal" : `${selectedState} State`
      } documents. What would you like to know?`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const randomSources = generateRandomSources()

      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I found relevant ${selectedCategory || "general"} documents from ${
          selectedJurisdiction === "federal" ? "Federal" : `${selectedState} State`
        } jurisdiction that match your query about "${inputValue}". Here are the most relevant documents...`,
        timestamp: new Date(),
        sources: randomSources,
      }
      setMessages((prev) => [...prev, assistantResponse])
      setIsLoading(false)
    }, 800)
  }

  const isInputDisabled = !selectedCategory

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Query tax documents with intelligent filtering by jurisdiction and category
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 bg-card border border-border rounded-lg p-6 mb-4 overflow-y-auto max-h-[600px] space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="w-full max-w-2xl">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.role === "assistant" && message.sources && message.sources.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Random Source Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.sources.map((source) => (
                          <button
                            key={source.id}
                            onClick={() => window.open(source.url || "#")}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-xs font-medium border border-accent/30"
                            title={source.title}
                          >
                            <FileText size={14} />
                            <span className="max-w-[150px] truncate">{source.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isInputDisabled}
              placeholder={isInputDisabled ? "Select a category first..." : "Ask about tax documents..."}
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || isInputDisabled}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4 text-foreground font-semibold">
              <Settings size={18} />
              <span>Search Filters</span>
            </div>

            {/* Jurisdiction Selection */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Jurisdiction</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleJurisdictionSelect("federal")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedJurisdiction === "federal"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Federal
                </button>
                <button
                  onClick={() => handleJurisdictionSelect("state")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedJurisdiction === "state"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  State
                </button>
              </div>
            </div>

            {/* State Selection (if State is selected) */}
            {selectedJurisdiction === "state" && (
              <div className="space-y-2 mt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Select State</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATES.map((state) => (
                    <button
                      key={state}
                      onClick={() => handleStateSelect(state)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedState === state
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Selection (if jurisdiction is selected) */}
            {selectedJurisdiction && (
              <div className="space-y-2 mt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Category</p>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left capitalize ${
                        selectedCategory === category
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Filters Display */}
            {selectedJurisdiction && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Active Filters:</p>
                <div className="space-y-1 text-sm text-foreground">
                  <p>
                    Jurisdiction: <span className="font-semibold capitalize">{selectedJurisdiction}</span>
                  </p>
                  {selectedState && (
                    <p>
                      State: <span className="font-semibold">{selectedState}</span>
                    </p>
                  )}
                  {selectedCategory && (
                    <p>
                      Category: <span className="font-semibold capitalize">{selectedCategory}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
