# 08 — Platform Suite

Authenticated operator console. Layout: sidebar (collapsible) + main + optional AI Agent panel.

## Modules
1. Dashboard
2. Product Library (`products`)
3. Client Management (`clients`)
4. Proposal Builder (`proposals` + `proposal_items`)
5. Project Tracker (`projects` + `project_tasks`)
6. Service Orders (`service_orders` + `service_order_checklist`)
7. Profit Analysis (`profit_analyses`, JSONB: labor_breakdown, margin_distribution, high_margin_items, below_cost_items, findings)
8. Academy (links into Academy tab)
9. Dossier (static HTML view)
10. Star Panel (static HTML view)
11. Upgrade Model (static HTML view)
12. URC Bridge Admin (lists `urc_bridge_leads` for admins)
13. Certificates list
14. AI Agent panel (calls `platform-agent` edge function with R/W tools)

## SwiftUI shape
- `PlatformShell` = `NavigationSplitView` (sidebar + detail).
- Each module is its own `Screen` view + ViewModel using `supabase-swift`.
- Agent panel is a `.sheet` with `.presentationDetents([.medium, .large])`.

## Profit Analysis specifics
JSONB columns deserialize into Swift `Codable` structs:
```swift
struct LaborLineItem: Codable, Identifiable { let id: UUID; let phase: String; let hours: Double; let billed: Double }
struct MarginBucket: Codable { let bucket: String; let count: Int; let value: Double }
struct Finding: Codable { let severity: String; let message: String }
```
Render charts with **Swift Charts**.
