# CLAUDE.md - Project Context

## Project Overview

Website for **TTG Baseball Academy** ("Trust the Grind"), a baseball training academy based in Arizona focused on player development for high school athletes.

**Live Site:** https://ocruz.github.io/ttg-baseball/
**Repository:** https://github.com/ocruz/ttg-baseball

## Design Direction

**Aesthetic:** Aggressive athletic brutalism - bold, intense, high-energy
- Dark backgrounds with red accents
- Bold condensed typography (Bebas Neue)
- Diagonal slash elements
- Grayscale-to-color image effects on hover

## Technical Stack

- **Pure HTML/CSS/JS** - No build tools, no frameworks
- **Hosting:** GitHub Pages (free)
- **Fonts:** Google Fonts (Bebas Neue + Barlow)

## File Structure

```
ttg-baseball/
├── index.html          # Home page (single-page with sections)
├── teams.html          # Travelling teams rosters (16U, 18U)
├── css/
│   └── styles.css      # All styles with CSS custom properties
├── js/
│   └── main.js         # Scroll animations, mobile nav, form handling
├── assets/
│   └── images/
│       ├── logo.png        # Main TTG logo
│       ├── logo-alt.png    # Alternate logo
│       ├── coach-1.jpg     # D'vone McClure
│       ├── coach-2.jpg     # Abino Vazquez
│       ├── action-1.jpg    # Action photo (also used for players)
│       ├── action-2.jpg    # Action photo
│       └── action-3.jpg    # Action photo
└── CLAUDE.md           # This file
```

## Color Palette

```css
--red: #e63946;           /* Primary accent */
--red-dark: #b71c1c;      /* Darker red for gradients */
--black: #0a0a0a;         /* Primary background */
--dark: #111111;          /* Section backgrounds */
--dark-elevated: #1a1a1a; /* Card backgrounds */
--gray: #2a2a2a;          /* Borders, dividers */
--white: #ffffff;         /* Primary text */
--white-muted: rgba(255, 255, 255, 0.85);  /* Secondary text */
--white-dim: rgba(255, 255, 255, 0.6);     /* Tertiary text */
```

## Typography

- **Display Font:** Bebas Neue (headings, buttons, labels)
- **Body Font:** Barlow (paragraphs, form inputs)
- All headings are UPPERCASE with tight line-height (0.9)

## Page Sections (index.html)

1. **Hero** - Full-viewport with diagonal red slash, logo, CTA
2. **About** - "Why TTG" with stat cards (100+ athletes, 15+ years, etc.)
3. **Coaches** - Alternating layout with large photos (D'vone McClure, Abino Vazquez)
4. **Services** - Grid of training programs (Hitting, Pitching, Private)
5. **CTA** - Red gradient section with call-to-action
6. **Contact** - Form and contact info
7. **Footer** - Logo, nav links, social icons

## Teams Page (teams.html)

- **16U Team** - 4 players with placeholder data
- **18U Team** - 4 players with placeholder data
- Player cards show: photo, jersey number, name, position, bats/throws

## Key CSS Patterns

- `.section--dark` / `.section--black` - Section backgrounds
- `.reveal` - Scroll-triggered fade-in animation
- `.text-red` - Red accent color
- `.text-huge` / `.text-large` - Typography scale
- `.player-card` - Player roster cards
- `.coach` - Coach profile cards (alternating layout)

## JavaScript Features

- Header scroll effect (transparent → solid)
- Mobile hamburger navigation
- Smooth scroll for anchor links
- Intersection Observer for reveal animations
- Animated number counter for stats
- Parallax effect on hero content

## Coaching Staff

| Name | Role |
|------|------|
| D'vone McClure | Head Coach |
| Abino Vazquez | Assistant Coach |

## Assets Source

Original assets came from: `/Users/omarcruz/Documents/ttg/`

## Deployment

```bash
git add .
git commit -m "Description of changes"
git push
# Site auto-updates via GitHub Pages (~1 minute)
```

## Notes

- Player roster data is placeholder - update with real names/photos when available
- Contact form is simulated (no backend) - needs real form handler
- Social media links are placeholder (#)
- 12U team was removed (can be re-added later)
