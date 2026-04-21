# SPEC.md - HK Quick Cooking Blog

## 1. Project Overview

- **Name**: Dinner Recipe (HK Quick Cooking Ideas)
- **Type**: Static Blog Web App
- **Core Functionality**: Recipe discovery with filters for cuisine, budget, serving size, time, dietary needs
- **Target Users**: Busy HK professionals, diabetic-friendly cooks

## 2. Tech Stack

- **Framework**: Astro 4.x (Static SSG)
- **Styling**: Tailwind CSS
- **Data**: JSON recipe files
- **Deployment**: Vercel / Netlify

## 3. Color Palette (Earth Tone Warm)

| Role | Color | Hex |
|------|-------|-----|
| Primary | Terracotta | `#C4785C` |
| Secondary | Warm Sand | `#E8DED1` |
| Accent | Sage Green | `#8B9A7B` |
| Background | Cream | `#FAF6F1` |
| Text | Coffee Brown | `#4A3F35` |
| Card BG | Off-white | `#FFFFFF` |
| Muted Text | Warm Gray | `#7A7267` |

## 4. Filter Options

| Filter | Options |
|--------|---------|
| **Cuisine** | Hong Kong, Western, Japanese, Thai, Vietnamese, Korean, Taiwanese, Chinese |
| **Budget** | User input (HKD $0-$500) |
| **Serving** | 1 person, 2 people, 3-4 people, 5+ people (large icons) |
| **Time** | Quick (≤15min), Medium (≤30min), All |
| **Dietary** | Diabetic-friendly, Low Sugar, Low Carb, Gluten-free |

## 5. Pages

1. **Home** (`/`) - Hero + Filters + Recipe Grid (Pinterest masonry)
2. **Recipe Detail** (`/recipe/[slug]`) - Full recipe with ingredients, steps, tips

## 6. Recipe Data Structure

```json
{
  "id": "1",
  "slug": "xo-sauce-pasta",
  "title": "XO醬意粉",
  "titleEn": "XO Sauce Pasta",
  "cuisine": "hong-kong",
  "budget": 80,
  "serves": 2,
  "time": 15,
  "difficulty": "easy",
  "dietary": ["low-sugar"],
  "image": "/images/recipe-1.jpg",
  "ingredients": [...],
  "steps": [...],
  "tips": "..."
}
```

## 7. Sample Recipes (12 total)

- HK (2): XO醬意粉, 免治牛肉飯
- Western (2): Creamy Pasta, Grilled Chicken Salad
- Japanese (2): Teriyaki Bowl, Miso Soup
- Thai (2): Pad Thai, Green Curry
- Vietnamese (1): Banh Mi
- Korean (1): Bibimbap
- Taiwanese (1): Lu Rou Fan
- Chinese (1): Egg Fried Rice

## 8. Components

- Header: Logo + Navigation
- Hero: Tagline + Search prompt
- FilterBar: All filters in collapsible panel
- RecipeCard: Pinterest-style card with image, title, tags
- RecipeGrid: Masonry layout
- RecipeDetail: Full recipe page
- ServingSelector: Large icon buttons
- BudgetInput: Slider or number input

## 9. Responsive Breakpoints

- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

## 10. Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader friendly labels
- High contrast text