# CLAUDE.md — Italian Recipes App

## Project Overview
Hebrew RTL recipe web application featuring authentic Italian cuisine. Built with vanilla JavaScript, Tailwind CSS v4, and zero build dependencies. Deploys to GitHub Pages.

## Design System

### Color Palette (Italian)
```css
--it-primary: #C8102E        /* Italian red */
--it-primary-light: #E8A0A8  /* Light red */
--it-primary-dark: #8B0A1F   /* Dark red */
--it-cream: #FAFAFA
--it-charcoal: #1A1A1A
--it-navy: #0A1628
--it-warm-gray: #F5F0EB
--it-text-secondary: #6B7280
--it-border: #E5E1DC
```

### Typography
- **Hebrew**: Heebo (300, 400, 500, 700)
- **Display**: Playfair Display (600, 700)
- Direction: RTL (`dir="rtl"`, `lang="he"`)

### Categories
1. **פסטה** (Pasta) - `fa-utensils`
2. **פיצה** (Pizza) - `fa-pizza-slice`
3. **ריזוטו** (Risotto) - `fa-bowl-rice`
4. **קינוחים** (Desserts) - `fa-ice-cream`
5. **מנות עיקריות** (Main Dishes) - `fa-drumstick-bite`

## Architecture

### Tech Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS v4 (CDN)
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts
- **Routing**: Hash-based SPA (`#/`, `#/recipe/:id`)
- **Deployment**: GitHub Pages

### File Structure
```
italian-recipes-app/
├── index.html              # Main HTML with Tailwind config
├── css/
│   └── style.css          # Custom CSS (glassmorphism, cards)
├── js/
│   ├── data.js            # Data layer (fetch, filter, search)
│   ├── ui.js              # UI rendering (cards, detail, filters)
│   └── app.js             # App orchestration (router, events)
├── data/
│   └── recipes.json       # 10 Italian recipes (expandable to 50+)
└── images/                # Recipe images (to be added)
```

### Key Features
- **Real-time search** with 200ms debounce
- **Category filtering** with pill UI
- **Glassmorphism effects** on hero and cards
- **Card lift animations** on hover
- **WhatsApp sharing** for shopping lists
- **Responsive grid** (1 col mobile → 3 col desktop)

## Development Workflow

### Local Development
```bash
# Serve locally (no build step)
python -m http.server 8000
# Open http://localhost:8000
```

### Adding Recipes
1. Edit `data/recipes.json`
2. Follow schema: `id`, `title`, `originalName`, `description`, `category`, `image`, `prepTime`, `cookTime`, `servings`, `difficulty`, `ingredients[]`, `instructions[]`, `tags[]`
3. Add corresponding images to `images/` directory

### Adding Images
- Place images in `images/` directory
- Name format: `Original_Name_With_Underscores.jpg` (e.g., `Spaghetti_Carbonara.jpg`)
- Recommended aspect ratio: 16:9
- Recommended size: 1200x675px

### Deployment
```bash
# Deploy to GitHub Pages using gh-pages-deploy skill
/gh-pages-deploy
```

## Code Rules

### JavaScript
- Use ES6+ modules pattern (IIFE)
- Keep state management centralized in `RecipeData`
- Separate concerns: data, UI, app orchestration
- Use debouncing for search (200ms)
- Validate recipe IDs in router

### CSS
- Use CSS custom properties with `--it-` prefix
- Glassmorphism: `rgba()` + `backdrop-filter`
- Card hover: `translateY(-6px)` + elevated shadow
- RTL-first: `border-right` for primary accents

### HTML
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`)
- Accessibility: `alt` text, ARIA labels where needed
- Lazy loading for images: `loading="lazy"`

## Expansion Roadmap

### V2: More Recipes
- Expand to 50 recipes across all categories
- Add regional categorization (Northern, Central, Southern Italy)

### V3: Advanced Features
- Favorites (localStorage)
- Print recipe view
- Recipe ratings and comments
- Multi-language support (Hebrew + English)

### V4: Backend Integration
- User-submitted recipes
- Image upload
- Recipe rating system
- User authentication

## Notes
- No build step required - deploys as static files
- Images are placeholders until added by user
- All text in Hebrew except `originalName` in Italian
- WhatsApp sharing URL encodes recipe shopping list
