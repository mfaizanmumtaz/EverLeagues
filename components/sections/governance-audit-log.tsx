"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  FileText,
  ArrowRight,
  X,
  ChevronDown,
  Clock,
  Shield,
  FileCheck,
  AlertCircle,
} from "lucide-react"
import { useGovernanceLog } from "@/contexts/governance-log-context"
import {
  GovernanceLogEntry,
  GovernanceLogFilter,
  filterGovernanceLogs,
  exportLogsToCSV,
  exportLogsToJSON,
  downloadFile,
  formatLogTimestamp,
  formatAction,
  getUniqueUsers,
  getUniqueDocuments,
  getUniqueActions,
  getUniqueFields,
} from "@/utils/governance-logger"

const ITEMS_PER_PAGE = 10

// Action badge colors
const ACTION_COLORS: Record<string, string> = {
  state_changed: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  metadata_updated: "bg-purple-500/20 text-purple-600 border-purple-500/30",
  authority_changed: "bg-orange-500/20 text-orange-600 border-orange-500/30",
  bulk_action: "bg-cyan-500/20 text-cyan-600 border-cyan-500/30",
  document_published: "bg-green-500/20 text-green-600 border-green-500/30",
  document_deprecated: "bg-gray-500/20 text-gray-600 border-gray-500/30",
}

export default function GovernanceAuditLog() {
  const { logs } = useGovernanceLog()
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filter, setFilter] = useState<GovernanceLogFilter>({})
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  // Get unique values for filter dropdowns
  const uniqueUsers = useMemo(() => getUniqueUsers(logs), [logs])
  const uniqueDocuments = useMemo(() => getUniqueDocuments(logs), [logs])
  const uniqueActions = useMemo(() => getUniqueActions(logs), [logs])
  const uniqueFields = useMemo(() => getUniqueFields(logs), [logs])

  // Apply filters and sorting
  const filteredLogs = useMemo(() => {
    let result = filterGovernanceLogs(logs, filter)
    // Sort by timestamp
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })
    return result
  }, [logs, filter, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset page when filters change
  const updateFilter = (newFilter: Partial<GovernanceLogFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilter({})
    setCurrentPage(1)
  }

  const hasActiveFilters =
    filter.dateFrom ||
    filter.dateTo ||
    filter.userId ||
    filter.documentName ||
    filter.action ||
    filter.fieldChanged ||
    filter.searchQuery

  // Export handlers
  const handleExportCSV = () => {
    const csv = exportLogsToCSV(filteredLogs)
    const filename = `governance-audit-log-${new Date().toISOString().split("T")[0]}.csv`
    downloadFile(csv, filename, "text/csv")
  }

  const handleExportJSON = () => {
    const json = exportLogsToJSON(filteredLogs)
    const filename = `governance-audit-log-${new Date().toISOString().split("T")[0]}.json`
    downloadFile(json, filename, "application/json")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Shield className="text-accent" size={28} />
            Governance Audit Log
          </h1>
          <p className="text-muted-foreground mt-1">
            Immutable record of all governance actions. Query by date, user, or document.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card border-border hover:bg-muted/50"
            }`}
          >
            <Filter size={18} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-accent-foreground/20">
                Active
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 border border-border rounded-lg overflow-hidden">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-card hover:bg-muted/50 transition-colors text-sm font-medium"
              title="Export as CSV"
            >
              <Download size={16} />
              CSV
            </button>
            <div className="w-px h-6 bg-border" />
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2.5 bg-card hover:bg-muted/50 transition-colors text-sm font-medium"
              title="Export as JSON"
            >
              <Download size={16} />
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <AlertCircle size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-blue-600">Compliance Notice</p>
          <p className="text-muted-foreground mt-1">
            This audit log is immutable and cannot be edited or deleted. All governance actions are
            permanently recorded for tax audits, legal discovery, and healthcare compliance (HIPAA,
            PCAOB, IRS Circular 230).
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-foreground">{logs.length}</div>
          <div className="text-sm text-muted-foreground">Total Log Entries</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-foreground">{uniqueUsers.length}</div>
          <div className="text-sm text-muted-foreground">Unique Users</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-foreground">{uniqueDocuments.length}</div>
          <div className="text-sm text-muted-foreground">Documents Affected</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-bold text-foreground">{filteredLogs.length}</div>
          <div className="text-sm text-muted-foreground">Matching Filters</div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 rounded-lg bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground uppercase">Query Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:underline flex items-center gap-1"
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* Search */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search across all fields..."
                  value={filter.searchQuery || ""}
                  onChange={(e) => updateFilter({ searchQuery: e.target.value || undefined })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Date From
              </label>
              <input
                type="date"
                value={filter.dateFrom || ""}
                onChange={(e) => updateFilter({ dateFrom: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Date To
              </label>
              <input
                type="date"
                value={filter.dateTo || ""}
                onChange={(e) => updateFilter({ dateTo: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            {/* User Filter */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">User</label>
              <select
                value={filter.userId || ""}
                onChange={(e) => updateFilter({ userId: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">All Users</option>
                {uniqueUsers.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Filter */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Document
              </label>
              <input
                type="text"
                placeholder="Filter by document name..."
                value={filter.documentName || ""}
                onChange={(e) => updateFilter({ documentName: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            {/* Action Filter */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Action
              </label>
              <select
                value={filter.action || ""}
                onChange={(e) => updateFilter({ action: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">All Actions</option>
                {uniqueActions.map((action) => (
                  <option key={action} value={action}>
                    {formatAction(action)}
                  </option>
                ))}
              </select>
            </div>

            {/* Field Filter */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Field Changed
              </label>
              <select
                value={filter.fieldChanged || ""}
                onChange={(e) => updateFilter({ fieldChanged: e.target.value || undefined })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">All Fields</option>
                {uniqueFields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredLogs.length)} of{" "}
          {filteredLogs.length} entries
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <button
            onClick={() => setSortOrder("newest")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortOrder === "newest"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Newest First
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortOrder === "oldest"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Oldest First
          </button>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    When
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    Who
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <FileText size={14} />
                    Document
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Field Changed
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Previous → New Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FileCheck size={48} className="text-muted-foreground/50" />
                      <div className="text-muted-foreground">
                        {hasActiveFilters
                          ? "No log entries match your filters"
                          : "No governance actions logged yet"}
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-accent hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <LogRow key={log.id} log={log} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 7) {
                pageNum = i + 1
              } else if (currentPage <= 4) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i
              } else {
                pageNum = currentPage - 3 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted/50"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

// Individual log row component
function LogRow({ log }: { log: GovernanceLogEntry }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <tr
        className="hover:bg-muted/30 cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-foreground whitespace-nowrap">
              {formatLogTimestamp(log.timestamp)}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
              <User size={12} className="text-accent" />
            </div>
            <span className="text-foreground truncate max-w-[150px]" title={log.userId}>
              {log.userId}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-foreground truncate max-w-[180px]" title={log.documentName}>
              {log.documentName}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              ACTION_COLORS[log.action] || "bg-gray-500/20 text-gray-600 border-gray-500/30"
            }`}
          >
            {formatAction(log.action)}
          </span>
        </td>
        <td className="px-4 py-3 text-sm">
          <code className="px-2 py-0.5 rounded bg-muted text-foreground text-xs font-mono">
            {log.fieldChanged}
          </code>
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2 max-w-[200px]">
            {log.previousValue ? (
              <>
                <span className="text-muted-foreground line-through truncate" title={log.previousValue}>
                  {log.previousValue}
                </span>
                <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />
              </>
            ) : (
              <span className="text-muted-foreground italic">(none)</span>
            )}
            <span className="text-foreground font-medium truncate" title={log.newValue}>
              {log.newValue}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <span className="text-muted-foreground truncate max-w-[200px] block" title={log.reason}>
            {log.reason || "-"}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-muted/20">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Log ID</p>
                <code className="text-xs font-mono text-foreground">{log.id}</code>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Full Timestamp
                </p>
                <code className="text-xs font-mono text-foreground">{log.timestamp}</code>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Document ID
                </p>
                <code className="text-xs font-mono text-foreground">{log.documentId}</code>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Previous Value (Full)
                </p>
                <code className="text-xs font-mono text-foreground break-all">
                  {log.previousValue || "(none)"}
                </code>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  New Value (Full)
                </p>
                <code className="text-xs font-mono text-foreground break-all">{log.newValue}</code>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Reason (Full)
                </p>
                <p className="text-foreground">{log.reason || "(no reason provided)"}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

