"use client"

import { useState, useRef, useEffect } from "react"
import { FileText, Filter, Trash2, Download, Search, ChevronLeft, ChevronRight, Globe, ExternalLink, AlertCircle, X, ChevronDown, Check, AlertTriangle, ChevronUp, Database, Cpu, RefreshCw, Archive, Unlink, GitCompare } from "lucide-react"

interface File {
  id: string
  name: string
  size: string
  tags: string[]
  uploadedDate: string
  syncStatus: "synced" | "syncing" | "sync_failed"
  indexStatus: "indexed" | "indexing" | "index_failed" | "not_indexed"
  sourceUrl?: string
  sourceDomain?: string
  syncError?: string
  indexError?: string
  knowledgeBaseId?: string
  knowledgeBaseName?: string
  taxYear?: number
  effectiveFrom?: string
  replacedBy?: string
  hasNewerVersion?: boolean
  lastCrawled?: string
  chunkCount?: number
  embeddingModel?: string
  tokensIndexed?: number
  ragErrors?: string
  lastEmbedded?: string
  authorityLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

const initialFiles: File[] = [
  {
    id: "1",
    name: "Form_1040_2024.pdf",
    size: "2.4 MB",
    tags: ["federal", "forms", "2024"],
    uploadedDate: "2024-11-20",
    syncStatus: "synced",
    indexStatus: "indexed",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-1040",
    sourceDomain: "irs.gov",
    knowledgeBaseId: "kb_federal_individual",
    knowledgeBaseName: "Tax – Federal Individual",
    taxYear: 2024,
    effectiveFrom: "2024-01-01",
    hasNewerVersion: true,
    lastCrawled: "2024-11-20 03:12 UTC",
    chunkCount: 384,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 92000,
    ragErrors: "0",
    lastEmbedded: "2024-11-20 03:15 UTC",
    authorityLevel: 2,
  },
  {
    id: "2",
    name: "Schedule_C_2024.pdf",
    size: "1.8 MB",
    tags: ["federal", "forms", "2024"],
    uploadedDate: "2024-11-19",
    syncStatus: "synced",
    indexStatus: "indexing",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-schedule-c-form-1040",
    sourceDomain: "irs.gov",
    knowledgeBaseId: "kb_federal_individual",
    knowledgeBaseName: "Tax – Federal Individual",
    taxYear: 2024,
    effectiveFrom: "2024-01-01",
    lastCrawled: "2024-11-19 14:30 UTC",
    chunkCount: 256,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 61000,
    ragErrors: "0",
    lastEmbedded: "2024-11-19 14:33 UTC",
    authorityLevel: 2,
  },
  {
    id: "3",
    name: "State_Tax_Return_CA.pdf",
    size: "3.1 MB",
    tags: ["state", "forms", "sales-tax"],
    uploadedDate: "2024-11-18",
    syncStatus: "synced",
    indexStatus: "index_failed",
    sourceUrl: "https://www.tax.ca.gov/forms-publications/individual-income-tax",
    sourceDomain: "tax.ca.gov",
    indexError: "OCR validation failed: 3 pages could not be processed. Low image quality detected.",
    knowledgeBaseId: "kb_sales_tax",
    knowledgeBaseName: "Tax – Sales Tax",
    taxYear: 2024,
    effectiveFrom: "2024-01-01",
    lastCrawled: "2024-11-18 09:45 UTC",
    chunkCount: 192,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 45000,
    ragErrors: "3 paragraphs skipped (bad HTML)",
    lastEmbedded: "2024-11-18 09:48 UTC",
    authorityLevel: 6,
  },
  {
    id: "4",
    name: "W2_Forms_2024.pdf",
    size: "5.2 MB",
    tags: ["federal", "forms", "2024"],
    uploadedDate: "2024-11-17",
    syncStatus: "sync_failed",
    indexStatus: "not_indexed",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
    sourceDomain: "irs.gov",
    syncError: "Download timeout: Connection to irs.gov timed out after 30 seconds. Please check network connectivity.",
    knowledgeBaseId: "kb_federal_individual",
    knowledgeBaseName: "Tax – Federal Individual",
    taxYear: 2024,
    effectiveFrom: "2024-01-01",
    authorityLevel: 2,
  },
  {
    id: "5",
    name: "Quarterly_Estimated_Q4.pdf",
    size: "1.5 MB",
    tags: ["federal", "instructions", "2024"],
    uploadedDate: "2024-11-16",
    syncStatus: "syncing",
    indexStatus: "not_indexed",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-1040-es",
    sourceDomain: "irs.gov",
    knowledgeBaseId: "kb_small_business",
    knowledgeBaseName: "Tax – Small Business",
    taxYear: 2024,
    effectiveFrom: "2024-10-01",
    lastCrawled: "2024-11-16 11:20 UTC",
    chunkCount: 128,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 31000,
    ragErrors: "0",
    lastEmbedded: "2024-11-16 11:22 UTC",
    authorityLevel: 2,
  },
  {
    id: "6",
    name: "IRS_Revenue_Ruling_2024.pdf",
    size: "0.8 MB",
    tags: ["federal", "bulletins", "2024"],
    uploadedDate: "2024-11-15",
    syncStatus: "synced",
    indexStatus: "indexed",
    sourceUrl: "https://www.irs.gov/pub/irs-drop/rr-24-01.pdf",
    sourceDomain: "irs.gov",
    knowledgeBaseId: "kb_federal_individual",
    knowledgeBaseName: "Tax – Federal Individual",
    taxYear: 2024,
    effectiveFrom: "2024-01-15",
    lastCrawled: "2024-11-15 16:10 UTC",
    chunkCount: 64,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 15000,
    ragErrors: "0",
    lastEmbedded: "2024-11-15 16:12 UTC",
    authorityLevel: 3,
  },
  {
    id: "7",
    name: "Tax_Code_Title_26.pdf",
    size: "12.4 MB",
    tags: ["federal", "code"],
    uploadedDate: "2024-11-14",
    syncStatus: "synced",
    indexStatus: "indexed",
    sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
    sourceDomain: "uscode.house.gov",
    knowledgeBaseId: "kb_federal_individual",
    knowledgeBaseName: "Tax – Federal Individual",
    taxYear: 2023,
    effectiveFrom: "2023-01-01",
    replacedBy: "Tax_Code_Title_26_2024.pdf",
    lastCrawled: "2024-11-14 08:30 UTC",
    chunkCount: 1024,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 245000,
    ragErrors: "0",
    lastEmbedded: "2024-11-14 08:45 UTC",
    authorityLevel: 1,
  },
  {
    id: "8",
    name: "FAQ_Individual_Taxes.pdf",
    size: "2.1 MB",
    tags: ["federal", "faq"],
    uploadedDate: "2024-11-13",
    syncStatus: "synced",
    indexStatus: "index_failed",
    sourceUrl: "https://www.irs.gov/faqs/individual-income-tax",
    sourceDomain: "irs.gov",
    indexError: "Embedding generation failed: Invalid text encoding detected. File may be corrupted.",
    knowledgeBaseId: "kb_federal_individual",
    knowledgeBaseName: "Tax – Federal Individual",
    taxYear: 2024,
    effectiveFrom: "2024-01-01",
    lastCrawled: "2024-11-13 12:00 UTC",
    chunkCount: 0,
    embeddingModel: "text-embedding-3-large",
    tokensIndexed: 0,
    ragErrors: "Embedding generation failed",
    lastEmbedded: "N/A",
    authorityLevel: 4,
  },
]

// Helper function to extract domain from URL
const getDomainFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace("www.", "")
  } catch {
    return url
  }
}

// Helper function to format source path
const formatSourcePath = (url: string): string => {
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/").filter(Boolean)
    const domain = urlObj.hostname.replace("www.", "")
    const filename = pathParts[pathParts.length - 1] || ""
    
    if (pathParts.length > 0) {
      return `${domain} › ${pathParts.slice(0, -1).join(" › ")}${filename ? ` › ${filename}` : ""}`
    }
    return domain
  } catch {
    return url
  }
}

const JURISDICTION_TAGS = ["federal", "state", "local"]

const KNOWLEDGE_BASES = [
  { id: "all", name: "All" },
  { id: "kb_federal_individual", name: "Tax – Federal Individual" },
  { id: "kb_small_business", name: "Tax – Small Business" },
  { id: "kb_sales_tax", name: "Tax – Sales Tax" },
  { id: "kb_hospital_compliance", name: "Hospital Compliance" },
]

// Authority Level Definitions
const AUTHORITY_LEVELS = {
  1: {
    label: "Level 1 – Statute/Reg",
    description: "IRC, Treasury Regs, CFR",
    color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    badgeColor: "bg-blue-500",
  },
  2: {
    label: "Level 2 – Forms/Instructions",
    description: "IRS forms",
    color: "bg-green-500/20 text-green-600 border-green-500/30",
    badgeColor: "bg-green-500",
  },
  3: {
    label: "Level 3 – Rulings/Procedures",
    description: "Revenue Rulings, Notices",
    color: "bg-purple-500/20 text-purple-600 border-purple-500/30",
    badgeColor: "bg-purple-500",
  },
  4: {
    label: "Level 4 – FAQs/Publications",
    description: "IRS FAQs, IRM",
    color: "bg-orange-500/20 text-orange-600 border-orange-500/30",
    badgeColor: "bg-orange-500",
  },
  5: {
    label: "Level 5 – Expert Sources",
    description: "Big-4 memos, CCH, RIA",
    color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    badgeColor: "bg-yellow-500",
  },
  6: {
    label: "Level 6 – Other/Low Authority",
    description: "Blogs, generic articles",
    color: "bg-gray-500/20 text-gray-600 border-gray-500/30",
    badgeColor: "bg-gray-500",
  },
} as const

// Helper function to auto-assign authority level based on URL (for display purposes)
// In production, this would be done on the backend during ingestion
const getAuthorityLevelFromUrl = (url: string): 1 | 2 | 3 | 4 | 5 | 6 => {
  const urlLower = url.toLowerCase()
  
  // Level 1: Statute/Reg (IRC, Treasury Regs, CFR)
  if (urlLower.includes("law.cornell.edu") || 
      urlLower.includes("govinfo.gov") ||
      urlLower.includes("/irc/") ||
      urlLower.includes("/cfr/") ||
      urlLower.includes("treasury.gov/regulations")) {
    return 1
  }
  
  // Level 2: Forms/Instructions
  if (urlLower.includes("irs.gov/forms-pubs") ||
      urlLower.includes("irs.gov/forms-instructions") ||
      urlLower.includes("/form-")) {
    return 2
  }
  
  // Level 3: Rulings/Procedures
  if (urlLower.includes("irs.gov/pub/irs-drop") ||
      urlLower.includes("revenue-ruling") ||
      urlLower.includes("revenue-procedure") ||
      urlLower.includes("/rr-") ||
      urlLower.includes("/rp-")) {
    return 3
  }
  
  // Level 4: FAQs/Publications
  if (urlLower.includes("irs.gov/faqs") ||
      urlLower.includes("irs.gov/publications") ||
      urlLower.includes("/pub/") ||
      urlLower.includes("/irm/")) {
    return 4
  }
  
  // Level 5: Expert Sources
  if (urlLower.includes("cch.com") ||
      urlLower.includes("ria.thomsonreuters.com") ||
      urlLower.includes("pwc.com") ||
      urlLower.includes("deloitte.com") ||
      urlLower.includes("ey.com") ||
      urlLower.includes("kpmg.com")) {
    return 5
  }
  
  // Level 6: Other/Low Authority (default)
  return 6
}

export default function ELCloudFiles() {
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedKB, setSelectedKB] = useState<string>("all")
  const [selectedAuthorityLevel, setSelectedAuthorityLevel] = useState<number | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [errorDetailsFile, setErrorDetailsFile] = useState<File | null>(null)
  const [kbDropdownOpen, setKbDropdownOpen] = useState(false)
  const kbDropdownRef = useRef<HTMLDivElement>(null)
  const [expandedRagFiles, setExpandedRagFiles] = useState<Set<string>>(new Set())
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [versionDiffModalOpen, setVersionDiffModalOpen] = useState(false)
  const [selectedVersion1, setSelectedVersion1] = useState<File | null>(null)
  const [selectedVersion2, setSelectedVersion2] = useState<File | null>(null)
  const [diffContent, setDiffContent] = useState<{ version1: string[], version2: string[] } | null>(null)

  const allTags = Array.from(new Set(files.flatMap((f) => f.tags)))
  const sortedTags = allTags.sort((a, b) => {
    // Sort tags: jurisdiction tags first, then others
    const aIsJurisdiction = JURISDICTION_TAGS.includes(a)
    const bIsJurisdiction = JURISDICTION_TAGS.includes(b)
    if (aIsJurisdiction !== bIsJurisdiction) return aIsJurisdiction ? -1 : 1
    return a.localeCompare(b)
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (kbDropdownRef.current && !kbDropdownRef.current.contains(event.target as Node)) {
        setKbDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredFiles = files.filter((f) => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => f.tags.includes(tag))
    const matchesKB = selectedKB === "all" || f.knowledgeBaseId === selectedKB
    const matchesAuthority = selectedAuthorityLevel === "all" || f.authorityLevel === selectedAuthorityLevel
    const matchesSearch =
      searchQuery === "" ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTags && matchesKB && matchesAuthority && matchesSearch
  })

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const deleteFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const toggleRagVisibility = (fileId: string) => {
    setExpandedRagFiles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(fileId)) {
        newSet.delete(fileId)
      } else {
        newSet.add(fileId)
      }
      return newSet
    })
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(fileId)) {
        newSet.delete(fileId)
      } else {
        newSet.add(fileId)
      }
      return newSet
    })
  }

  const toggleSelectAll = () => {
    if (selectedFiles.size === paginatedFiles.length) {
      setSelectedFiles(new Set())
    } else {
      setSelectedFiles(new Set(paginatedFiles.map((f) => f.id)))
    }
  }

  const handleBulkReCrawl = () => {
    const selectedIds = Array.from(selectedFiles)
    console.log("Re-crawling files:", selectedIds)
    // Update sync status to "syncing" for selected files
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        selectedIds.includes(file.id) && file.syncStatus !== "syncing"
          ? { ...file, syncStatus: "syncing" as const }
          : file
      )
    )
    setSelectedFiles(new Set())
    // In a real app, this would trigger an API call
  }

  const handleBulkReIndex = () => {
    const selectedIds = Array.from(selectedFiles)
    console.log("Re-indexing files:", selectedIds)
    // Update index status to "indexing" for selected files
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        selectedIds.includes(file.id) && file.indexStatus !== "indexing"
          ? { ...file, indexStatus: "indexing" as const }
          : file
      )
    )
    setSelectedFiles(new Set())
    // In a real app, this would trigger an API call
  }

  const handleBulkUnlinkFromKB = () => {
    const selectedIds = Array.from(selectedFiles)
    console.log("Unlinking files from KB:", selectedIds)
    // Remove KB mapping but keep the file
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        selectedIds.includes(file.id)
          ? { ...file, knowledgeBaseId: undefined, knowledgeBaseName: undefined }
          : file
      )
    )
    setSelectedFiles(new Set())
    // In a real app, this would trigger an API call to remove from search index
  }

  const handleBulkArchive = () => {
    const selectedIds = Array.from(selectedFiles)
    console.log("Archiving files:", selectedIds)
    // Remove archived files from the list (in a real app, they'd be moved to an archive)
    setFiles((prevFiles) => prevFiles.filter((file) => !selectedIds.includes(file.id)))
    setSelectedFiles(new Set())
    // In a real app, this would trigger an API call to archive
  }

  // Generate mock diff content for version comparison
  const generateDiffContent = (version1: File, version2: File) => {
    // Mock diff content - in production, this would fetch actual document content
    const mockContent1 = [
      "Form 1040 - U.S. Individual Income Tax Return",
      "Tax Year 2023",
      "",
      "Standard Deduction:",
      "Single: $13,850",
      "Married Filing Jointly: $27,700",
      "",
      "Tax Rates:",
      "10% on income up to $11,000",
      "12% on income $11,001 to $44,725",
      "22% on income $44,726 to $95,375",
    ]

    const mockContent2 = [
      "Form 1040 - U.S. Individual Income Tax Return",
      "Tax Year 2024",
      "",
      "Standard Deduction:",
      "Single: $14,600",
      "Married Filing Jointly: $29,200",
      "",
      "Tax Rates:",
      "10% on income up to $11,600",
      "12% on income $11,601 to $47,150",
      "22% on income $47,151 to $100,525",
    ]

    setDiffContent({
      version1: mockContent1,
      version2: mockContent2,
    })
  }

  // Helper function to get status display text
  const getStatusDisplay = (syncStatus: string, indexStatus: string): string => {
    const syncText = syncStatus === "synced" ? "Synced" : syncStatus === "syncing" ? "Syncing" : "Sync Failed"
    const indexText = 
      indexStatus === "indexed" ? "Indexed" : 
      indexStatus === "indexing" ? "Indexing..." : 
      indexStatus === "index_failed" ? "Index Failed" : 
      "Not Indexed"
    
    return `${syncText} · ${indexText}`
  }

  // Helper function to get status badge colors
  const getStatusBadgeClass = (syncStatus: string, indexStatus: string): string => {
    // If either status is failed, show red
    if (syncStatus === "sync_failed" || indexStatus === "index_failed") {
      return "bg-destructive/20 text-destructive cursor-pointer hover:bg-destructive/30"
    }
    // If syncing or indexing, show accent with pulse
    if (syncStatus === "syncing" || indexStatus === "indexing") {
      return "bg-accent/20 text-accent animate-pulse-glow"
    }
    // If both are complete, show green
    if (syncStatus === "synced" && indexStatus === "indexed") {
      return "bg-green-500/20 text-green-500"
    }
    // If synced but not indexed, show yellow
    if (syncStatus === "synced" && indexStatus === "not_indexed") {
      return "bg-yellow-500/20 text-yellow-500"
    }
    // Default
    return "bg-muted/50 text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">EL Cloud Files</h1>
        <p className="text-muted-foreground">Manage synchronized tax document files with tag-based organization</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          placeholder="Search files..."
          className="w-80 pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("")
              setCurrentPage(1)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Knowledge Base Filter - Above Tag Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Filter size={18} /> Filters
        </div>
        
        {/* KB Filter Dropdown */}
        <div className="relative inline-block" ref={kbDropdownRef}>
          <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Knowledge Base</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setKbDropdownOpen(!kbDropdownOpen)}
              className="px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between hover:bg-muted/50 transition-colors min-w-[200px]"
            >
              <span className="text-sm">
                {KNOWLEDGE_BASES.find((kb) => kb.id === selectedKB)?.name || "All"}
              </span>
              <ChevronDown
                size={16}
                className={`text-muted-foreground transition-transform ${kbDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {kbDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                {KNOWLEDGE_BASES.map((kb) => (
                  <button
                    key={kb.id}
                    onClick={() => {
                      setSelectedKB(kb.id)
                      setKbDropdownOpen(false)
                      setCurrentPage(1)
                    }}
                    className={`w-full px-4 py-2.5 text-left hover:bg-muted/50 transition-colors flex items-center justify-between text-sm border-b border-border last:border-b-0 ${
                      selectedKB === kb.id ? "bg-accent/10" : ""
                    }`}
                  >
                    <span className="text-foreground">{kb.name}</span>
                    {selectedKB === kb.id && <Check size={16} className="text-accent" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tag Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Filter size={18} /> Tag Filter
          </div>
        <div className="space-y-4">
          {/* Jurisdiction Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Jurisdiction</p>
            <div className="flex flex-wrap gap-2">
              {sortedTags
                .filter((tag) => JURISDICTION_TAGS.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                      selectedTags.includes(tag)
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tag}
                    {selectedTags.includes(tag) && " ✓"}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Authority Level Filter */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Authority Level</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedAuthorityLevel("all")
                setCurrentPage(1)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedAuthorityLevel === "all"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {Object.entries(AUTHORITY_LEVELS).map(([level, info]) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedAuthorityLevel(Number(level) as 1 | 2 | 3 | 4 | 5 | 6)
                  setCurrentPage(1)
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  selectedAuthorityLevel === Number(level)
                    ? `${info.color} border-current`
                    : "bg-muted text-foreground hover:bg-muted/80 border-border"
                }`}
                title={info.description}
              >
                Level {level}
              </button>
            ))}
          </div>
        </div>

        {(selectedTags.length > 0 || selectedKB !== "all" || selectedAuthorityLevel !== "all") && (
          <button
            onClick={() => {
              setSelectedTags([])
              setSelectedKB("all")
              setSelectedAuthorityLevel("all")
            }}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all filters
          </button>
        )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredFiles.length)} of {filteredFiles.length} files
        </span>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedFiles.size > 0 && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">
              {selectedFiles.size} file{selectedFiles.size !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkReCrawl}
              className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Re-crawl selected files from their source URLs"
            >
              <RefreshCw size={16} />
              Re-crawl selected
            </button>
            <button
              onClick={handleBulkReIndex}
              className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Re-index selected files (chunk, embed, add to vector DB)"
            >
              <Database size={16} />
              Re-index selected
            </button>
            <button
              onClick={handleBulkUnlinkFromKB}
              className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Remove selected files from Knowledge Base search (keep files)"
            >
              <Unlink size={16} />
              Unlink from KB
            </button>
            <button
              onClick={handleBulkArchive}
              className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Archive older versions of selected files"
            >
              <Archive size={16} />
              Archive older versions
            </button>
            <button
              onClick={() => setSelectedFiles(new Set())}
              className="px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      {/* Files List */}
      <div className="space-y-3">
        {/* Select All Checkbox */}
        {paginatedFiles.length > 0 && (
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <input
              type="checkbox"
              checked={selectedFiles.size === paginatedFiles.length && paginatedFiles.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-2 cursor-pointer"
            />
            <label className="text-sm font-medium text-foreground cursor-pointer">
              Select all ({paginatedFiles.length} files on this page)
            </label>
          </div>
        )}
        
        {paginatedFiles.map((file) => (
          <div
            key={file.id}
            className={`p-4 rounded-lg bg-card border transition-colors ${
              selectedFiles.has(file.id)
                ? "border-accent bg-accent/5 hover:border-accent/80"
                : "border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex items-start gap-3 mt-1">
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-2 cursor-pointer mt-1"
                  />
                  <FileText size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-foreground font-semibold">{file.name}</h3>
                    {file.hasNewerVersion && (
                      <div 
                        className="group relative"
                        title="A newer version of this document exists from the same source URL"
                      >
                        <AlertTriangle 
                          size={16} 
                          className="text-yellow-500 cursor-help" 
                        />
                      </div>
                    )}
                    {file.authorityLevel && (
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                          AUTHORITY_LEVELS[file.authorityLevel].color
                        }`}
                        title={AUTHORITY_LEVELS[file.authorityLevel].description}
                      >
                        <span className={`w-2 h-2 rounded-full ${AUTHORITY_LEVELS[file.authorityLevel].badgeColor}`}></span>
                        <span>Authority: {AUTHORITY_LEVELS[file.authorityLevel].label}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{file.size}</span>
                    <span>{file.uploadedDate}</span>
                  </div>
                  
                  {/* Versioning & Freshness Information */}
                  {(file.taxYear || file.effectiveFrom || file.replacedBy) && (
                    <div className="mb-3 p-2.5 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        {file.taxYear && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground font-medium">Tax Year:</span>
                            <span className="text-foreground font-semibold">{file.taxYear}</span>
                          </div>
                        )}
                        {file.effectiveFrom && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground font-medium">Effective from:</span>
                            <span className="text-foreground">{file.effectiveFrom}</span>
                          </div>
                        )}
                        {file.replacedBy && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground font-medium">Replaced by:</span>
                            <span className="text-accent hover:underline cursor-pointer">{file.replacedBy}</span>
                          </div>
                        )}
                      </div>
                      {/* Compare Versions Button */}
                      {(file.replacedBy || file.hasNewerVersion) && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <button
                            onClick={() => {
                              setSelectedVersion1(file)
                              // Find the replacedBy file or create a mock newer version
                              const newerVersion = files.find(f => f.name === file.replacedBy) || {
                                ...file,
                                id: `new-${file.id}`,
                                name: file.replacedBy || file.name.replace(/\d{4}/, String((file.taxYear || 2024) + 1)),
                                taxYear: (file.taxYear || 2024) + 1,
                              }
                              setSelectedVersion2(newerVersion)
                              generateDiffContent(file, newerVersion)
                              setVersionDiffModalOpen(true)
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                          >
                            <GitCompare size={14} />
                            Compare Versions
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Source URL Display */}
                  {file.sourceUrl && (
                    <div className="mb-3">
                      <a
                        href={file.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors group"
                        title={file.sourceUrl}
                      >
                        <Globe size={14} className="text-accent/70 group-hover:text-accent" />
                        <span className="max-w-md truncate">
                          {formatSourcePath(file.sourceUrl)}
                        </span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      {file.sourceDomain && (
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border/50">
                            <Globe size={10} />
                            {file.sourceDomain}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Knowledge Base Badge */}
                  {file.knowledgeBaseName && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-500 border border-blue-500/30 font-medium">
                        <FileText size={10} />
                        KB: {file.knowledgeBaseName}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* RAG Pipeline Visibility - Collapsible Section */}
                  {(file.lastCrawled || file.chunkCount !== undefined || file.embeddingModel || file.tokensIndexed !== undefined) && (
                    <div className="mt-4 border-t border-border pt-3">
                      <button
                        onClick={() => toggleRagVisibility(file.id)}
                        className="w-full flex items-center justify-between text-sm font-semibold text-foreground hover:text-accent transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Database size={16} className="text-accent" />
                          <span>RAG Pipeline Details</span>
                        </div>
                        {expandedRagFiles.has(file.id) ? (
                          <ChevronUp size={16} className="text-muted-foreground" />
                        ) : (
                          <ChevronDown size={16} className="text-muted-foreground" />
                        )}
                      </button>
                      
                      {expandedRagFiles.has(file.id) && (
                        <div className="mt-3 p-3 rounded-lg bg-muted/20 border border-border/50 space-y-2.5">
                          {file.lastCrawled && (
                            <div className="flex items-start justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Last crawled:</span>
                              <span className="text-foreground font-mono">{file.lastCrawled}</span>
                            </div>
                          )}
                          {file.chunkCount !== undefined && (
                            <div className="flex items-start justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Chunk count:</span>
                              <span className="text-foreground font-semibold">{file.chunkCount.toLocaleString()} chunks</span>
                            </div>
                          )}
                          {file.embeddingModel && (
                            <div className="flex items-start justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Embedding model:</span>
                              <div className="flex items-center gap-1.5">
                                <Cpu size={12} className="text-accent" />
                                <span className="text-foreground font-mono">{file.embeddingModel}</span>
                              </div>
                            </div>
                          )}
                          {file.tokensIndexed !== undefined && (
                            <div className="flex items-start justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Tokens indexed:</span>
                              <span className="text-foreground font-semibold">~{file.tokensIndexed.toLocaleString()} tokens</span>
                            </div>
                          )}
                          {file.ragErrors !== undefined && (
                            <div className="flex items-start justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Errors:</span>
                              <span className={`font-medium ${
                                file.ragErrors === "0" ? "text-green-500" : "text-yellow-500"
                              }`}>
                                {file.ragErrors}
                              </span>
                            </div>
                          )}
                          {file.lastEmbedded && (
                            <div className="flex items-start justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Last embedded:</span>
                              <span className="text-foreground font-mono">{file.lastEmbedded}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Dual Status Badge */}
                <button
                  onClick={() => {
                    if (file.syncStatus === "sync_failed" || file.indexStatus === "index_failed") {
                      setErrorDetailsFile(file)
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    getStatusBadgeClass(file.syncStatus, file.indexStatus)
                  }`}
                  title={
                    file.syncStatus === "sync_failed" || file.indexStatus === "index_failed"
                      ? "Click to view error details"
                      : undefined
                  }
                >
                  {(file.syncStatus === "syncing" || file.indexStatus === "indexing") && (
                    <span className="animate-spin">⟳</span>
                  )}
                  {(file.syncStatus === "sync_failed" || file.indexStatus === "index_failed") && (
                    <AlertCircle size={12} />
                  )}
                  <span>{getStatusDisplay(file.syncStatus, file.indexStatus)}</span>
                </button>
                <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Download size={18} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 size={18} className="text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border hover:bg-muted text-foreground"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Error Details Modal */}
      {errorDetailsFile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertCircle size={20} className="text-destructive" />
                Error Details
              </h2>
              <button
                onClick={() => setErrorDetailsFile(null)}
                className="p-1 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{errorDetailsFile.name}</h3>
                <div className="text-xs text-muted-foreground mb-4">
                  {errorDetailsFile.sourceUrl && (
                    <div className="flex items-center gap-1">
                      <Globe size={12} />
                      <span className="truncate">{errorDetailsFile.sourceUrl}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sync Error */}
              {errorDetailsFile.syncStatus === "sync_failed" && errorDetailsFile.syncError && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-destructive" />
                    <span className="text-sm font-semibold text-destructive">Sync Failed</span>
                  </div>
                  <p className="text-sm text-foreground">{errorDetailsFile.syncError}</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <p className="font-medium mb-1">What this means:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>The file could not be downloaded from the source URL</li>
                      <li>The file was not added to local storage</li>
                      <li>Indexing cannot proceed until sync is successful</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Index Error */}
              {errorDetailsFile.indexStatus === "index_failed" && errorDetailsFile.indexError && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-destructive" />
                    <span className="text-sm font-semibold text-destructive">Index Failed</span>
                  </div>
                  <p className="text-sm text-foreground">{errorDetailsFile.indexError}</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <p className="font-medium mb-1">What this means:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>The file was downloaded but could not be processed</li>
                      <li>One or more steps failed: Chunking, Embedding, Vector DB insertion, KB mapping, OCR, or Validation</li>
                      <li>The file is not searchable in the Knowledge Base</li>
                    </ul>
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="font-medium mb-1">Indexing process includes:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Chunking - Breaking document into searchable pieces</li>
                        <li>Embedding - Converting text to vector representations</li>
                        <li>Vector DB - Storing embeddings for semantic search</li>
                        <li>KB Mapping - Adding to Knowledge Base collections</li>
                        <li>OCR - Optical Character Recognition (if needed)</li>
                        <li>Validation - Quality checks and verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Summary */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Current Status</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Sync Status:</span>
                    <span className={`font-semibold ${
                      errorDetailsFile.syncStatus === "synced" ? "text-green-500" :
                      errorDetailsFile.syncStatus === "syncing" ? "text-accent" :
                      "text-destructive"
                    }`}>
                      {errorDetailsFile.syncStatus === "synced" ? "Synced" :
                       errorDetailsFile.syncStatus === "syncing" ? "Syncing" :
                       "Sync Failed"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Index Status:</span>
                    <span className={`font-semibold ${
                      errorDetailsFile.indexStatus === "indexed" ? "text-green-500" :
                      errorDetailsFile.indexStatus === "indexing" ? "text-accent" :
                      errorDetailsFile.indexStatus === "index_failed" ? "text-destructive" :
                      "text-yellow-500"
                    }`}>
                      {errorDetailsFile.indexStatus === "indexed" ? "Indexed" :
                       errorDetailsFile.indexStatus === "indexing" ? "Indexing..." :
                       errorDetailsFile.indexStatus === "index_failed" ? "Index Failed" :
                       "Not Indexed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setErrorDetailsFile(null)}
              className="mt-6 w-full px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Version Diff Modal */}
      {versionDiffModalOpen && selectedVersion1 && selectedVersion2 && diffContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-7xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitCompare size={24} className="text-accent" />
                <div>
                  <h2 className="text-xl font-bold text-foreground">Version Comparison</h2>
                  <p className="text-sm text-muted-foreground">
                    Compare document versions to see changes over time
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setVersionDiffModalOpen(false)
                  setSelectedVersion1(null)
                  setSelectedVersion2(null)
                  setDiffContent(null)
                }}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* File Metadata */}
            <div className="p-4 border-b border-border bg-muted/30 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Version 1 (Older)</p>
                <p className="text-sm font-semibold text-foreground">{selectedVersion1.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  {selectedVersion1.taxYear && (
                    <span className="text-xs text-muted-foreground">Tax Year: {selectedVersion1.taxYear}</span>
                  )}
                  {selectedVersion1.effectiveFrom && (
                    <span className="text-xs text-muted-foreground">Effective: {selectedVersion1.effectiveFrom}</span>
                  )}
                  {selectedVersion1.authorityLevel && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-600">
                      Level {selectedVersion1.authorityLevel}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Version 2 (Newer)</p>
                <p className="text-sm font-semibold text-foreground">{selectedVersion2.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  {selectedVersion2.taxYear && (
                    <span className="text-xs text-muted-foreground">Tax Year: {selectedVersion2.taxYear}</span>
                  )}
                  {selectedVersion2.effectiveFrom && (
                    <span className="text-xs text-muted-foreground">Effective: {selectedVersion2.effectiveFrom}</span>
                  )}
                  {selectedVersion2.authorityLevel && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-600">
                      Level {selectedVersion2.authorityLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Diff Content - Side by Side */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Version 1 */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-2 border-b border-border">
                    <p className="text-xs font-semibold text-foreground">{selectedVersion1.name}</p>
                  </div>
                  <div className="p-4 bg-card font-mono text-xs">
                    {diffContent.version1.map((line, index) => {
                      const correspondingLine = diffContent.version2[index]
                      const isChanged = line !== correspondingLine && correspondingLine !== undefined
                      const isDeleted = correspondingLine === undefined
                      
                      return (
                        <div
                          key={index}
                          className={`flex items-start gap-2 ${
                            isChanged || isDeleted ? "bg-yellow-500/20" : ""
                          }`}
                        >
                          <span className="text-muted-foreground w-8 text-right select-none">
                            {index + 1}
                          </span>
                          <span className={isDeleted ? "line-through text-destructive" : ""}>
                            {line || <span className="text-muted-foreground">(empty line)</span>}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Version 2 */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-2 border-b border-border">
                    <p className="text-xs font-semibold text-foreground">{selectedVersion2.name}</p>
                  </div>
                  <div className="p-4 bg-card font-mono text-xs">
                    {diffContent.version2.map((line, index) => {
                      const correspondingLine = diffContent.version1[index]
                      const isChanged = line !== correspondingLine && correspondingLine !== undefined
                      const isAdded = correspondingLine === undefined
                      
                      return (
                        <div
                          key={index}
                          className={`flex items-start gap-2 ${
                            isChanged || isAdded ? "bg-green-500/20" : ""
                          }`}
                        >
                          <span className="text-muted-foreground w-8 text-right select-none">
                            {index + 1}
                          </span>
                          <span className={isAdded ? "text-green-600 font-semibold" : ""}>
                            {line || <span className="text-muted-foreground">(empty line)</span>}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setVersionDiffModalOpen(false)
                  setSelectedVersion1(null)
                  setSelectedVersion2(null)
                  setDiffContent(null)
                }}
                className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
