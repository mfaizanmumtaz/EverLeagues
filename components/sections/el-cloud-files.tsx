"use client"

import { useState } from "react"
import { FileText, Filter, Trash2, Download, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface File {
  id: string
  name: string
  size: string
  tags: string[]
  uploadedDate: string
  status: "Synced" | "Syncing" | "Failed"
}

const initialFiles: File[] = [
  {
    id: "1",
    name: "Form_1040_2024.pdf",
    size: "2.4 MB",
    tags: ["federal", "forms", "2024"],
    uploadedDate: "2024-11-20",
    status: "Synced",
  },
  {
    id: "2",
    name: "Schedule_C_2024.pdf",
    size: "1.8 MB",
    tags: ["federal", "forms", "2024"],
    uploadedDate: "2024-11-19",
    status: "Synced",
  },
  {
    id: "3",
    name: "State_Tax_Return_CA.pdf",
    size: "3.1 MB",
    tags: ["state", "forms", "sales-tax"],
    uploadedDate: "2024-11-18",
    status: "Synced",
  },
  {
    id: "4",
    name: "W2_Forms_2024.pdf",
    size: "5.2 MB",
    tags: ["federal", "forms", "2024"],
    uploadedDate: "2024-11-17",
    status: "Synced",
  },
  {
    id: "5",
    name: "Quarterly_Estimated_Q4.pdf",
    size: "1.5 MB",
    tags: ["federal", "instructions", "2024"],
    uploadedDate: "2024-11-16",
    status: "Syncing",
  },
  {
    id: "6",
    name: "IRS_Revenue_Ruling_2024.pdf",
    size: "0.8 MB",
    tags: ["federal", "bulletins", "2024"],
    uploadedDate: "2024-11-15",
    status: "Synced",
  },
  {
    id: "7",
    name: "Tax_Code_Title_26.pdf",
    size: "12.4 MB",
    tags: ["federal", "code"],
    uploadedDate: "2024-11-14",
    status: "Synced",
  },
  {
    id: "8",
    name: "FAQ_Individual_Taxes.pdf",
    size: "2.1 MB",
    tags: ["federal", "faq"],
    uploadedDate: "2024-11-13",
    status: "Synced",
  },
]

const CATEGORY_TAGS = ["forms", "instructions", "faq", "code", "regulations", "bulletins", "sales-tax"]
const JURISDICTION_TAGS = ["federal", "state"]

export default function ELCloudFiles() {
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const allTags = Array.from(new Set(files.flatMap((f) => f.tags)))
  const sortedTags = allTags.sort((a, b) => {
    const aIsCategory = CATEGORY_TAGS.includes(a)
    const bIsCategory = CATEGORY_TAGS.includes(b)
    if (aIsCategory !== bIsCategory) return aIsCategory ? -1 : 1
    return a.localeCompare(b)
  })

  const filteredFiles = files.filter((f) => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => f.tags.includes(tag))
    const matchesSearch =
      searchQuery === "" ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTags && matchesSearch
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

      {/* Tag Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Filter size={18} /> Tag Filter
        </div>
        <div className="space-y-4">
          {/* Categories Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Document Categories</p>
            <div className="flex flex-wrap gap-2">
              {sortedTags
                .filter((tag) => CATEGORY_TAGS.includes(tag))
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

        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredFiles.length)} of {filteredFiles.length} files
        </span>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {paginatedFiles.map((file) => (
          <div
            key={file.id}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <FileText size={24} className="text-accent mt-1" />
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold mb-1">{file.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{file.size}</span>
                    <span>{file.uploadedDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    file.status === "Synced"
                      ? "bg-green-500/20 text-green-500"
                      : file.status === "Syncing"
                        ? "bg-accent/20 text-accent animate-pulse-glow"
                        : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {file.status === "Syncing" && "⟳ "}
                  {file.status}
                </div>
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
    </div>
  )
}
