

# Increase Parade of Homes Logo Size on Homepage Card

## Change

**`src/pages/Index.tsx` (~line 224)**

Update the logo `height` from `64` to `160` (150% increase = 2.5× original):

```tsx
// Before
style={{ height: 64, width: "auto", flexShrink: 0 }}

// After
style={{ height: 160, width: "auto", flexShrink: 0 }}
```

Also adjust the card layout so the larger logo sits above the text instead of inline, by changing the flex direction to column.

