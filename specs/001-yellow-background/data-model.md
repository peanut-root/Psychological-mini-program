# Data Model — Yellow Background Refresh

## Entities

### ThemePalette
- Fields: `bgAppYellow (#FFF6D8)`, `textPrimaryOnYellow (#1F1F1F)`, `textSecondaryOnYellow (#5A5A5A)`, `btnTextOnYellow (#1A1A1A)`.
- Relationships: Referenced by `PageThemeApplication` for background + text colors.
- Validation rules: Colors must be hex; `textPrimaryOnYellow` contrast vs `bgAppYellow` ≥4.5:1; `textSecondaryOnYellow` ≥3:1; palette stored once in `styles/theme.wxss`.

### PageThemeApplication
- Fields: `pageId` (e.g., `home`, `index`, `my-page`, `search`, `ocd`, footer-linked entries), `rootWrapperClass` (uses `.bg-app-yellow`), `inheritsPalette` (bool).
- Relationships: Uses `ThemePalette` for background/text; relies on existing page containers/cards.
- Validation rules: Root wrapper spans full viewport (`min-height: 100vh`), background applies to the lowest container only; cards/blocks keep white backgrounds; no conflicting inline `background-color` within page scope.

### ContrastRule
- Fields: `elementType` (`primary-text`, `secondary-text`, `button`), `requiredRatio` (4.5 or 3.0), `textColorRef` (palette key), `backgroundRef` (`bgAppYellow` or card white).
- Relationships: Binds palette to UI elements on themed pages.
- Validation rules: Ratios satisfied per WCAG; secondary text cannot drop below 3:1 even on overlays; buttons stay fully visible against both yellow and white surfaces.

## Notes
- No data persistence or API entities are introduced; scope is styling/theme only.
- Dark mode retains the same palette; QA must verify contrast remains acceptable.***

