# 03 — Component Mapping

| Web (shadcn / custom) | SwiftUI counterpart |
|---|---|
| `Button` (variants: default, premium, outline, ghost) | `Button` + custom `ButtonStyle` per variant |
| `Card`, `CardHeader`, `CardContent` | `VStack` inside `TCLCard` view modifier |
| `Sheet`, `Drawer` | `.sheet` / `.presentationDetents` |
| `Dialog`, `AlertDialog` | `.alert` / `.confirmationDialog` |
| `Tabs` | `Picker(.segmented)` or `TabView(.page)` |
| `Accordion` | `DisclosureGroup` |
| `Tooltip`, `HoverCard` | `Popover` on iPad; long-press popover on iPhone |
| `NavigationMenu` (top nav) | Tab bar root + `NavigationStack` |
| `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `RadioGroup`, `Slider` | SwiftUI `Form` + native controls themed by `TCLTheme` |
| `Toast` (sonner) | iOS 26 `.alert` overlay or custom `ToastCenter` |
| `Progress` | `ProgressView` |
| `Avatar` | `Image` + `.clipShape(Circle())` |
| `Badge` | Capsule label |
| Chart components | **Swift Charts** |
| Lucide icons | **SF Symbols** (see `assets/icons/mapping.md`) |
| AdSense / AdSidebar | **Omit** in native app (or replace with in-house promo cards) |
| Markdown (`MiniMarkdown`) | `AttributedString(markdown:)` |
| `WKWebView` for embedded HTML | `WKWebView` via `UIViewRepresentable` for legal/lesson long-form |

Full component inventory: `reference/component-inventory.csv`.
