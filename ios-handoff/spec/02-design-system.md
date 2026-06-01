# 02 — Design System

Source of truth: `content/design-tokens.css` (full `src/index.css`) + `content/tailwind.config.ts`.

## Palette
Dark luxury: pure black surfaces, gold accents, `#C42020` platform red.

Convert every HSL token in `content/design-tokens.css` to a `Color` static var on `TCLColor`:

```swift
enum TCLColor {
    static let background = Color(h: 0, s: 0, l: 0)              // --background
    static let foreground = Color(h: 0, s: 0, l: 1.0)            // --foreground
    static let gold       = Color(hex: "#C9A84C")                // brand accent
    static let platformRed = Color(hex: "#C42020")               // platform accent
    // ...one per --token in design-tokens.css
}
```

## Typography
- Headings: **Playfair Display** (serif).
- Body: **DM Sans**.
- Code/mono: **DM Mono**.

```swift
enum TCLFont {
    static func display(_ size: CGFloat) -> Font { .custom("PlayfairDisplay-Regular", size: size) }
    static func body(_ size: CGFloat) -> Font { .custom("DMSans-Regular", size: size) }
    static func mono(_ size: CGFloat) -> Font { .custom("DMMono-Regular", size: size) }
}
```

## Spacing & radii
- Base spacing: 4pt grid.
- Card radius: 16pt.
- Button radius: 12pt.
- Hairline gold borders on premium surfaces (1pt, gold @ 30% opacity).

## Surfaces
- Cards: `RoundedRectangle(cornerRadius: 16).fill(.black).overlay(stroke: gold@0.3)`.
- Liquid Glass: use sparingly on overlays/sheets; do not let translucency wash out the gold.

## Motion
- Default transition: `.opacity.combined(with: .move(edge: .bottom))` for sheets.
- Hero reveals: spring(response: 0.5, dampingFraction: 0.85).
