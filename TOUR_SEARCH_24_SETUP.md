# Tour Search 24 - Dynamic Routing Setup

## Overview

This setup provides dynamic routing for all tour cards in `/tour-search-24` with comprehensive seed data generation.

## Generated Structure

```
/data/tours/
├── index.json           # Index of all tours for static generation
├── tour-jp-001.json     # Japan tour details
├── tour-kr-002.json     # Korea tour details
├── tour-tw-003.json     # Taiwan tour details
├── tour-tr-004.json     # Turkey tour details
├── tour-eu-005.json     # Europe tour details
├── tour-cn-006.json     # China tour details
├── tour-sg-007.json     # Singapore tour details
├── tour-my-008.json     # Malaysia tour details
├── tour-id-009.json     # Indonesia tour details
├── tour-ph-010.json     # Philippines tour details
├── tour-vn-011.json     # Vietnam tour details
└── tour-kh-012.json     # Cambodia tour details

/scripts/
└── seed-tours.ts        # Seed generation script
```

## Usage

### 1. Generate Seed Data

Run the seed script to generate/update tour data:

```bash
# Generate seed data for all tours
npx tsx scripts/seed-tours.ts
```

This will:
- Scan existing tour card data from `/tour-search-24`
- Generate comprehensive seed data with departures, addons, FAQs
- Create individual tour files and index file
- Output generation summary

### 2. Development

```bash
# Start development server
npm run dev

# Visit tour search page
http://localhost:3000/tour-search-24

# Visit individual tour pages
http://localhost:3000/tour-search-24/tour-jp-001?src=search24
```

### 3. Production Build

```bash
# Build with static generation
npm run build

# All tour routes will be pre-generated
```

## Route Structure

- **Main Page**: `/tour-search-24`
- **Tour Detail**: `/tour-search-24/[id]`
- **Analytics Parameter**: `?src=search24` (added automatically when navigating from search page)

## Seed Data Schema

Each tour includes:

- **Basic Info**: title, country, duration, price, rating
- **Images**: hero images and gallery
- **Content**: highlights, itinerary, included/excluded items
- **Booking**: departures with pricing and availability
- **Addons**: insurance, upgrades, seat selection
- **Support**: FAQs, policies, contact info
- **SEO**: metadata and open graph tags

## Features

### ✅ Implemented

- [x] Dynamic route generation for all tour cards
- [x] Server-side data loading from seed files
- [x] Static generation with fallback
- [x] Comprehensive seed data (departures, addons, FAQs)
- [x] Client-server component architecture
- [x] Analytics parameter tracking (`src=search24`)
- [x] Error handling and fallback data
- [x] Mobile-responsive tour detail pages

### 🔧 Automatic Features

- **Departure Generation**: 8 departures over next 12 months
- **Price Variation**: ±15% from base price
- **Seat Availability**: Random realistic numbers
- **Country Detection**: Auto-detects from tour titles
- **Itinerary Creation**: Generated based on duration and destination
- **Related Tours**: Cross-referenced by country/region

## Maintenance

### Update Tour Data

1. Modify tour cards in `/tour-search-24/page.tsx`
2. Run `npx tsx scripts/seed-tours.ts`
3. Rebuild the application

### Add New Tours

1. Add tour card to main search page
2. Run seed script to generate data files
3. The new route will be automatically available

### Customize Seed Data

Edit individual tour files in `/data/tours/` for specific customizations, or modify the seed script for systematic changes.

## File Structure

```typescript
// Seed Data Schema
interface TourSeed {
  id: string
  slug: string
  title: string
  country: string
  cities: string[]
  duration_days: number
  nights: number
  price_from: number
  currency: "THB"
  badges: string[]
  rating: number
  reviews_count: number
  hero_images: string[]
  highlights: string[]
  itinerary: Array<{
    day: number
    title: string
    details: string[]
  }>
  gallery: string[]
  included: string[]
  excluded: string[]
  policies: {
    deposit: number
    cancellation: string
    payment_options: string[]
  }
  departures: Array<{
    id: string
    start_date: string
    end_date: string
    date_label: string
    price: number
    seats_left: number
    status: "available" | "low" | "soldout"
  }>
  addons: Array<{
    code: string
    label: string
    price: number
  }>
  faqs: Array<{
    q: string
    a: string
  }>
  related: Array<{
    id: string
    title: string
    price_from: number
    thumb: string
  }>
  licenses: {
    tourism_license?: string
    airline_partners?: string[]
  }
  seo?: {
    title?: string
    description?: string
    og_image?: string
  }
}
```

## Troubleshooting

### Route Not Found (404)
- Check if tour ID exists in `/data/tours/index.json`
- Run seed script to regenerate data
- Rebuild application

### Data Loading Issues
- Verify seed files exist in `/data/tours/`
- Check file permissions
- Review server logs for file read errors

### Missing Components
- Ensure `BookingModal.tsx` and `StickyBookingBar.tsx` exist in `/src/components/tour-search-24/`
- Check import paths in `TourDetailClient.tsx`

### Performance Issues
- Monitor bundle size if adding many tours
- Consider lazy loading for large galleries
- Optimize images (WebP, proper sizing)

---

**Generated**: $(date +"%Y-%m-%d %H:%M:%S")  
**Version**: 1.0.0  
**Author**: Claude Code Assistant