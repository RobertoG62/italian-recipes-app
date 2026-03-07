# Product Requirements — Italian Recipes App

## Overview
A mobile-first, RTL Hebrew web application showcasing authentic Italian recipes. Zero build dependencies, deploys to GitHub Pages.

## Goals
1. **Accessibility**: Make authentic Italian recipes available in Hebrew
2. **Usability**: Fast, intuitive search and filtering experience
3. **Shareability**: Easy WhatsApp sharing of shopping lists
4. **Scalability**: Start with 10 recipes, expandable to 50+

## Target Audience
- Hebrew speakers interested in Italian cuisine
- Home cooks looking for authentic recipes
- Food enthusiasts exploring international cooking

## Core Features

### 1. Home View
**Hero Section**
- Italian cuisine title with red accent color
- Subtitle: "מתכונים אותנטיים מהלב של איטליה"
- Real-time search bar with glassmorphism effect
- Background gradient (expandable to hero image)

**Category Filters**
- Sticky pill navigation
- 5 categories: פסטה, פיצה, ריזוטו, קינוחים, מנות עיקריות
- Active state with red background
- Icons for visual clarity

**Recipe Grid**
- Responsive grid (1-3 columns)
- Cards with:
  - 16:9 aspect ratio image
  - Hebrew title + Italian original name
  - Description (2-line clamp)
  - Prep + cook time
  - Servings count
  - Difficulty badge (קל/בינוני/מאתגר)
- Hover effect: lift animation + shadow
- Empty state with clear call-to-action

### 2. Recipe Detail View
**Hero**
- Full-width image background
- Category badge
- Recipe title (Hebrew + Italian)
- Description

**Meta Information**
- Glassmorphism card with:
  - Prep time
  - Cook time
  - Servings
  - Difficulty level

**Ingredients List**
- Bordered section with red accent
- Checkmark icons
- Quantity + unit + name
- Count badge

**WhatsApp Sharing**
- Green button to share shopping list
- Pre-formatted message with ingredients
- Includes recipe URL

**Instructions**
- Numbered steps with circular badges
- Clear, detailed Hebrew text

**Tags**
- Pill-style tags for categorization

**Navigation**
- Back button to return to home
- Hash-based routing (#/recipe/:id)

### 3. Search & Filter
**Search**
- Debounced (200ms) real-time filtering
- Searches: title, description, ingredients, tags
- Clear button appears when typing

**Category Filter**
- Pill buttons for each category
- "הכל" option to show all
- Active state tracking

**Result Count**
- Shows "X מתכונים מתוך Y" when filtered
- Hidden when showing all results

## Technical Requirements

### Performance
- First paint < 1s
- Image lazy loading
- Debounced search
- Minimal JavaScript bundle (vanilla JS)

### Responsiveness
- Mobile-first design
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly tap targets (44px minimum)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript
- CSS Grid & Flexbox

### SEO & Meta
- Semantic HTML5
- Open Graph tags
- Descriptive meta description
- Hebrew language tag (`lang="he"`)

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | #C8102E | Accents, CTAs, active states |
| Primary Light | #E8A0A8 | Hover states, light accents |
| Primary Dark | #8B0A1F | Dark mode accents |
| Cream | #FAFAFA | Background |
| Charcoal | #1A1A1A | Text primary |
| Navy | #0A1628 | Footer, dark sections |
| Border | #E5E1DC | Borders, dividers |

### Typography
- **Body**: Heebo (Hebrew-optimized)
- **Display**: Playfair Display (elegant serif)
- **Sizes**: 14px (body), 16px (large), 24px (h3), 32px (h2), 40px (h1)

### Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64

### Effects
- **Glassmorphism**: `rgba(255,255,255,0.85)` + `backdrop-filter: blur(16px)`
- **Card Lift**: `translateY(-6px)` + `box-shadow: 0 20px 40px rgba(0,0,0,0.08)`
- **Transitions**: `cubic-bezier(0.22, 1, 0.36, 1)` for smooth animations

## Data Schema

### Recipe Object
```json
{
  "id": "kebab-case-id",
  "title": "Hebrew recipe name",
  "originalName": "Italian name",
  "description": "Hebrew description",
  "category": "Hebrew category",
  "image": "images/Image_Name.jpg",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "difficulty": "קל|בינוני|מאתגר",
  "ingredients": [
    { "name": "Hebrew", "quantity": "1", "unit": "כוס" }
  ],
  "instructions": ["Step 1", "Step 2"],
  "tags": ["tag1", "tag2"]
}
```

## User Flows

### Browse Recipes
1. User lands on home page
2. Sees hero with search + category pills
3. Scrolls through grid of recipe cards
4. Clicks card → navigates to detail view
5. Reads recipe, shares via WhatsApp, or returns home

### Search Recipe
1. User types in search bar
2. Results filter in real-time (200ms debounce)
3. See result count update
4. Click card to view details
5. Clear search or select category to reset

### Share Shopping List
1. User opens recipe detail
2. Reviews ingredients list
3. Clicks WhatsApp button
4. WhatsApp opens with pre-filled message
5. Sends to contact/group

## Success Metrics
- **Engagement**: Average 3+ recipes viewed per session
- **Performance**: < 2s page load on 3G
- **Accessibility**: 90+ Lighthouse score
- **Mobile**: 70%+ mobile traffic

## Future Enhancements
1. **Favorites**: Save recipes to localStorage
2. **Print View**: Printer-friendly recipe layout
3. **Ratings**: User rating system
4. **Comments**: Recipe feedback and tips
5. **Multi-language**: English translation toggle
6. **Backend**: User submissions, image uploads
7. **PWA**: Offline support, install prompt
8. **Regional Filter**: Northern/Central/Southern Italian categories

## Constraints
- No build tools (100% CDN-based)
- Static hosting (GitHub Pages)
- No backend (pure frontend)
- Hebrew-first content
- Authentic Italian recipes only

## Launch Checklist
- [ ] 10 authentic recipes with Hebrew translations
- [ ] All recipe images added (16:9 ratio)
- [ ] Hero background image
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Validate JSON schema
- [ ] Check all links and routing
- [ ] Deploy to GitHub Pages
- [ ] Share URL for testing
