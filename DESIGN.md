---
name: Vivid Rawness
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#DA0267'
  on-surface-variant: '#414a36'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#717a64'
  outline-variant: '#c0cab0'
  surface-tint: '#3c6a00'
  primary: '#2563E9'
  on-primary: '#ffffff'
  primary-container: '#88dd20'
  on-primary-container: '#345d00'
  inverse-primary: '#87dc1f'
  secondary: '#bc0006'
  on-secondary: '#ffffff'
  secondary-container: '#ea000b'
  on-secondary-container: '#fffbff'
  tertiary: '#7a29e2'
  on-tertiary: '#ffffff'
  tertiary-container: '#d6bbff'
  on-tertiary-container: '#6e11d6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a2fa40'
  primary-fixed-dim: '#87dc1f'
  on-primary-fixed: '#0f2000'
  on-primary-fixed-variant: '#2c5000'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930004'
  tertiary-fixed: '#ecdcff'
  tertiary-fixed-dim: '#d6baff'
  on-tertiary-fixed: '#280056'
  on-tertiary-fixed-variant: '#6000bf'
  background: '#ffffff'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Anton
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 100%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 110%
    letterSpacing: 0em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 110%
    letterSpacing: 0em
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 120%
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
  label-bold:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 120%
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 120%
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  border-width: 3px
---

## Brand & Style

This design system is built for a visual artist and photographer who demands a high-impact, neo-brutalist aesthetic. It uses a clean white page, lime-green borders and separators, pink branding, blue actions, black informational text, and crisp black shadows. The brand personality is unapologetically bold, professional, and edgy, designed to challenge the viewer while maintaining a functional, organized hierarchy.

The visual style is characterized by:
- **High-Contrast Neo-Brutalism:** Heavy black borders, hard shadows, and vibrant color blocks that command attention.
- **Minimalist Structure:** Despite the aggressive visual elements, the layout relies on expansive whitespace and a rigid grid to ensure the artwork remains the focal point.
- **Raw Sophistication:** A "digital-first" feel that avoids gradients and soft transitions in favor of solid fills and sharp edges.

## Colors

The palette is anchored by clean white, vivid lime green, electric blue, and vivid pink.

- **Background:** White (#FFFFFF) is the page background.
- **Brand:** Pink (#DA0267) is used for the TOČAKOV wordmark, headings, and accents.
- **Actions:** Blue (#2563E9) identifies buttons and other primary actions.
- **Grid:** Lime green (#88DD20) marks frames, borders, and separators; cards remain white.
- **Neutral (Black/White):** Black is used for informational text and hard shadows. White is used for the page and card backgrounds.
- **Application:** Use solid color blocks behind text or images. Avoid color blending; colors should meet at hard, distinct edges.

## Typography

The typography strategy uses **Anton** as a heavy, condensed display face for headlines—echoing industrial posters and bold editorial design. To balance this, **Hanken Grotesk** is used for body copy for its high legibility, while **JetBrains Mono** is used for labels, metadata, and captions to lean into the technical aspect of the design.

- **Headlines:** Set in Anton. Should be set with tight leading. Use "Headline-XL" for hero sections to create a massive visual impact.
- **Wordmark:** Set TOČAKOV in Anton with a custom, smaller chevron above the C. It animates into a vertical rail on the left as the page scrolls.
- **Body:** Kept clean and spacious to balance the aggressive headlines.
- **Labels:** Monospaced fonts should be used for project dates, camera settings (EXIF data), or navigation links to provide a "work-in-progress" or archival aesthetic.

## Layout & Spacing

The home page is a single, vertically scrollable page with a strict **12-column grid** on desktop and a **4-column grid** on mobile. The first visit opens on a full-screen TOČAKOV wordmark; the first scroll transitions it into the header, and further scrolling moves it vertically to the left. Selecting a portfolio category replaces the category cards with an inline series carousel; selecting a series replaces it with an image carousel, and selecting an image opens a larger view. Back and Escape return one level at a time.

- **Grid Philosophy:** Elements should explicitly align to the grid, but can "break" it using hard-offset shadows that bleed into margins.
- **Hard Borders:** Lime borders frame cards and gallery views; the wordmark rail uses a lime separator.
- **Spacing Rhythm:** Use a 4px base unit. Margins are intentionally large on desktop to emphasize the minimalist "gallery" feel.
- **Reflow:** On mobile, large headlines should scale down aggressively to prevent awkward word breaks, while padding remains tight to maximize screen real estate for imagery.

## Elevation & Depth

This system rejects traditional soft shadows and blurs. Depth is communicated through **Hard-Offset Shadows**:

- **The "Brutalist Shadow":** Elements appear elevated by a solid black rectangle offset by 4px, 8px, or 12px to the bottom-right. There is no blur.
- **Interaction Depth:** When a button or card is hovered, it should translate (move) to "cover" its shadow (e.g., `transform: translate(4px, 4px); box-shadow: 0 0 0 black;`), simulating a physical press.
- **Layering:** Use primary color blocks as background layers for text elements to create "stacked" depth without using Z-axis transparency.

## Shapes

The shape language is square and direct, supporting the neo-brutalist visual system. Cards and gallery elements use sharp edges and hard-offset black shadows.

## Components

### Buttons
- **Primary:** Solid Blue (#2563E9) background, 3px Black border, Hard Black Shadow (4px). Text in Anton.
- **Secondary:** Solid White background, 3px Black border, Hard Black Shadow.
- **Interaction:** On hover, the button moves 4px down and right to overlap the shadow.

### Cards (Project/Image)
- Lime borders, white backgrounds, and hard black shadows.
- Labels (using JetBrains Mono) placed in a "tag" style at the top-left or bottom-right, also with hard borders.
- Artwork remains in its original color; hover interactions may use a subtle scale rather than grayscale.

### Input Fields
- White background with lime border.
- Placeholder text in JetBrains Mono (Muted Gray).
- Active state: Keep the field legible against the lime contact panel and use a visible blue focus outline.

### Chips/Tags
- Small, rectangular blocks with solid color fills (Purple or Blue).
- Subtle 4px rounding to match the system shape language.

### Lists
- Separated by 3px solid black horizontal rules.
- Hover state for list items: The entire row background changes to Lime Green.

### Navigation
- Vertical or horizontal, but always pinned to the grid with thick borders.
- Active links are highlighted with a Red underline (3px thick) or a solid block of color behind the text.

## Gallery content

The `photography`, `digital-art`, and `paintings` categories and the current test series are listed in `assets/data/gallery.json`. The original uploaded images stay in their category folders; optimized copies used by the site are stored under `assets/images/gallery/optimized/`. Images appear in grayscale until opened in the enlarged view. Thumbnails preserve the artwork proportions instead of cropping. For example:

```json
{
  "categories": {
    "photography": {
      "cover": "assets/images/gallery/optimized/photography/cover.webp",
      "series": [
        {
          "title": "Naziv serije",
          "cover": "assets/images/gallery/optimized/photography/serija/cover.webp",
          "images": [
            {
              "src": "assets/images/gallery/optimized/photography/serija/rad-01.webp",
              "alt": "Kratak opis rada"
            }
          ]
        }
      ]
    }
  }
}
```

The other category keys are `digital-art` and `paintings`. Each series should have a title and an `images` list; each image needs a `src` and should have a descriptive `alt`. The category cover is shown on the home page. Keep all image paths relative to the project folder.