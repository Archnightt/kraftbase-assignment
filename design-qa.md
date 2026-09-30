# Footer design QA

## Comparison target

- Source visual truth: `/Users/nightwing/Documents/Screenshot 2026-09-29 at 20.09.35.png`
- Source dimensions: 2074 × 1164 pixels (approximately 1037 × 582 CSS pixels at 2× density).
- Implementation: `http://localhost:4173/` (browser-rendered footer region).
- Implementation viewport: approximately 1000 CSS pixels wide in the Codex in-app browser at 1× density.
- State: default desktop layout, with a responsive medium-width check.

## Full-view comparison evidence

The rendered footer preserves the reference's large centered contact callout, pale blue radial semicircle, white circular logo holder, blue framed Get Started CTA, three-column information row, separator lines, and copyright strip. The supplied `logo.png` is used in both reference-logo positions. The social marks are sourced from `react-icons` and placed as white circular badges at wide desktop sizes.

Focused footer capture was used because the source image is a footer-only composition; the browser capture verified the CTA and lower information grid rather than unrelated page content.

## Required fidelity surfaces

- **Fonts and typography:** Inter/system sans matches the existing site; heading hierarchy, tight display tracking, muted support copy, and column labels were checked. The source font is not embedded in the project, so the system fallback is an acceptable P3-level difference.
- **Spacing and layout rhythm:** Desktop contact content is centered with generous vertical spacing; the three lower columns use the source-style dividers and stack cleanly on small screens.
- **Colors and visual tokens:** The footer uses the requested radial sequence: `#CAEBFD` at 0%, `#CED5F9` at 48%, and white at 100%. CTA colors remain owned by the reusable component.
- **Image quality and asset fidelity:** The supplied `/public/logo.png` is used unscaled beyond its container; social icons use the requested icon library rather than custom vector drawings.
- **Copy and content:** Navigation, contact detail, footer description, CTA label, and copyright copy follow the supplied reference.

## Comparison history

1. **[P2] Medium-desktop badge overlap**
   - Evidence: at an approximately 1000px-wide browser view, the lower left/right floating social badges could overlap the information grid.
   - Fix: `SocialBubbles` now displays at `xl` and above, while the grid remains intact at narrower widths.
   - Post-fix evidence: the medium-width browser capture shows a clear three-column grid without badge obstruction; wide desktop retains the floating-badge composition.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- [P3] A supplied web font matching the Figma source exactly would tighten glyph-level equivalence further.

## Implementation checklist

- [x] Use the supplied logo in a round container.
- [x] Use `CTAButton` for Get Started.
- [x] Import social marks from `react-icons`.
- [x] Implement the specified radial gradient.
- [x] Verify production build and lint.

final result: passed
