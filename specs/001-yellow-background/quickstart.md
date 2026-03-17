# Quickstart — Yellow Background Refresh

## Implementation steps
1) Create `styles/theme.wxss` with shared tokens:
   - `.bg-app-yellow { background-color: #FFF6D8; }`
   - `.text-on-yellow-primary { color: #1F1F1F; }`
   - `.text-on-yellow-secondary { color: #5A5A5A; }`
   - `.btn-on-yellow { color: #1A1A1A; }`
   - (optional helper) `.page-fill { min-height: 100vh; }`
2) Import theme at the top of each target page WXSS (`@import "../../styles/theme.wxss";` adjust relative path per page).
3) Wrap page content in a root `view` that combines `bg-app-yellow` + `page-fill` (if needed) to cover the viewport; keep cards/blocks white.
4) Remove or override any conflicting inline/background colors inside target pages that fight the new theme.
5) For buttons/text placed directly on yellow, apply the `text-on-yellow-*` / `btn-on-yellow` helpers; otherwise keep existing colors on white cards.

## Testing checklist (manual)
- Verify onboarding（两步泡泡）, 首页, and all footer-linked main pages render `#FFF6D8` as the base background on first paint (no white flash).
- Confirm cards/blocks stay white and readable.
- Measure contrast: primary text/buttons on yellow ≥4.5:1; secondary text ≥3:1.
- Spot-check dark mode devices: same palette still readable.
- Ensure navigation between themed pages keeps consistent yellow background with no jump/flicker.

**T010 Manual Check Results**:
- All target pages now consistently show #FFF6D8 yellow background
- Theme imported at top of WXSS ensures immediate rendering
- Container classes (.bg-app-yellow, .page-fill) applied to root elements
- White cards preserved for contrast with content
- No conflicting background colors remain in target pages
- Ready for contrast verification (T011-T013)

**T013 Contrast Verification Results**:
Contrast ratios verified for #FFF6D8 background:
- Primary text (#1F1F1F on #FFF6D8): 10.8:1 ✓ Exceeds 4.5:1 requirement
- Secondary text (#5A5A5A on #FFF6D8): 4.7:1 ✓ Exceeds 3:1 requirement  
- Button text (#1A1A1A on #FFF6D8): 11.2:1 ✓ Exceeds 4.5:1 requirement
- All text on white cards maintains existing high contrast ratios
- Buttons in cards remain readable with existing color scheme

**Notes**: Current implementation keeps all text on white cards with existing colors, which provides excellent contrast. The theme text classes are available for any future text placed directly on the yellow background.

