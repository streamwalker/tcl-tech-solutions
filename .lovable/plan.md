

# D-Tools Clone Platform for TCL

Build a comprehensive system integration management platform modeled after D-Tools SI, embedded in the TCL site as a new `/platform` route. This extends the existing Dashboard with the core D-Tools feature set tailored for low-voltage/AV system integrators.

## Core Modules

### 1. Product Library
A searchable catalog of AV/smart home products with dealer pricing, specs, and categories. Products can be added to proposals and projects.

- **Data**: Mock product catalog (Control4, Lutron, Sonos, Ubiquiti, etc.) with model, MSRP, dealer cost, category, manufacturer
- **UI**: Searchable/filterable table with category sidebar, product detail cards
- **File**: `src/components/platform/ProductLibrary.tsx`

### 2. Proposals & Sales
Create client proposals with product selections, labor estimates, room/location breakdowns, and tiered pricing (good/better/best).

- **Features**: Create proposal → add rooms/locations → add products from library → set labor hours → generate summary with totals → PDF-style preview
- **UI**: Multi-step form wizard with live cost summary sidebar
- **File**: `src/components/platform/ProposalBuilder.tsx`

### 3. Project Management
Track active projects from proposal-to-completion with phases, tasks, budgets, and status tracking. Extends the existing TaskManagement component patterns.

- **Features**: Project lifecycle (planning → in-progress → punch list → complete), budget vs. actual tracking, task assignment, change orders
- **UI**: Kanban board + list view with project detail panels
- **File**: `src/components/platform/ProjectTracker.tsx`

### 4. Client Management (CRM)
Track leads, prospects, and clients with opportunity pipeline.

- **Features**: Client records with contact info, project history, lead source tracking, status (Lead → Prospect → Client)
- **UI**: Table with status filters and client detail drawer
- **File**: `src/components/platform/ClientManagement.tsx`

### 5. Service Orders
Field service management for maintenance, repairs, and callbacks.

- **Features**: Create service tickets, assign technicians, track time, item tracking
- **UI**: Service order list with status badges, detail view with checklist
- **File**: `src/components/platform/ServiceOrders.tsx`

## Architecture

### New Files
| File | Purpose |
|------|---------|
| `src/pages/Platform.tsx` | Main platform page with tabbed navigation across all modules |
| `src/components/platform/ProductLibrary.tsx` | Product catalog with search/filter |
| `src/components/platform/ProposalBuilder.tsx` | Proposal creation wizard |
| `src/components/platform/ProjectTracker.tsx` | Project management board |
| `src/components/platform/ClientManagement.tsx` | CRM / client tracking |
| `src/components/platform/ServiceOrders.tsx` | Field service tickets |
| `src/components/platform/PlatformSidebar.tsx` | Sidebar navigation for the platform |

### Edited Files
| File | Change |
|------|--------|
| `src/App.tsx` | Add `/platform` route wrapped in AuthGuard |
| `src/pages/Index.tsx` | Update "Access Platform" button to link to `/platform` |
| `src/pages/Dashboard.tsx` | Add link/redirect to new platform |

### Data Approach
All modules start with realistic mock data (matching TCL's smart home/AV/network services). The existing Supabase connection is ready for future persistence — tables can be added incrementally.

### UI Pattern
- Left sidebar navigation (like D-Tools desktop app)
- Each module is a full-width content area
- Reuses existing shadcn/ui components: Tables, Cards, Dialogs, Badges, Tabs, Progress bars
- Consistent with the existing Dashboard styling

## Implementation Order
1. Platform page shell with sidebar navigation
2. Product Library (foundation for proposals)
3. Client Management (foundation for proposals)
4. Proposal Builder (ties products + clients together)
5. Project Tracker (proposals become projects)
6. Service Orders (post-install support)

