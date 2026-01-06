# Phase 1: Product Discovery
**Ship Date Target:** Week 1-2 | **Status:** 🔵 Ready to Start

---

## 📋 Phase Overview

### Goal
Users có thể browse products, search, filter, và xem chi tiết sản phẩm. **NO cart, NO checkout yet.**

### Why This First?
- Core value proposition: "Xem được đồ công nghệ với specs rõ ràng"
- Test market fit trước khi build purchase flow
- Có thể share link để gather feedback sớm

### What's Included
✅ Homepage với categories  
✅ Product listing page (category view)  
✅ Search functionality  
✅ Filter sidebar (price, brand, specs)  
✅ Product detail page  
✅ Responsive mobile + desktop  

### What's NOT Included
❌ Cart  
❌ Checkout  
❌ User accounts  
❌ Reviews (chỉ hiển thị mock rating)  

---

## 🎨 Stitch Design Prompts

Copy từng prompt này vào Stitch theo thứ tự. Wait for output trước khi next prompt.

### Prompt 1: Homepage
```
Design a modern e-commerce homepage for TechZone - a Vietnamese tech products store.

LAYOUT:
- Header: Logo (left), Search bar (center), Cart icon + User icon (right)
- Hero section: Full-width banner image with text overlay "Đồ công nghệ chính hãng, giá tốt"
- Categories grid: 6 boxes in 2 rows (Laptop, PC, Điện thoại, Phụ kiện, Gaming Gear, Smart Home) - each box has an icon, category name, and subtle background image
- Featured products section: "Sản phẩm nổi bật" heading + horizontal carousel with 5 products
- Best sellers section: "Bán chạy nhất" heading + 8 products in 4x2 grid
- Trust badges section: 3 badges (Chính hãng 100%, Bảo hành 12 tháng, Giao hàng toàn quốc)
- Footer: 3 columns (About Us, Chính sách, Liên hệ), payment methods icons, social media icons

STYLE:
- Color scheme: Primary blue (#2563EB), secondary orange (#F97316), clean white background
- Modern, spacious layout with ample whitespace
- Product cards: square 1:1 image, product name, price (large, bold), rating stars (5 stars with yellow fill)
- Mobile-first responsive design

COMPONENTS TO SHOW:
- Desktop version (1280px wide)
- Mobile version (375px wide)

OUTPUT: Show both desktop and mobile layouts side-by-side
```

### Prompt 2: Product Listing Page (Category)
```
Design a product listing page for the "Laptop" category on TechZone.

LAYOUT:
- Breadcrumb: Home > Laptop (top left)
- Page header: "Laptop" heading + result count "(24 sản phẩm)"
- Filter sidebar (left, 280px wide):
  * Price range: slider with 4 presets (<5tr, 5-10tr, 10-20tr, >20tr)
  * Brand: checkboxes for Apple, Dell, HP, Asus, Lenovo, MSI
  * RAM: checkboxes for 8GB, 16GB, 32GB
  * Storage: checkboxes for 256GB SSD, 512GB SSD, 1TB SSD
  * "Xóa bộ lọc" button at bottom
- Main content (right):
  * Sort dropdown (top right): "Sắp xếp: Phổ biến nhất"
  * Applied filters chips: "RAM: 16GB [X]", "Giá: 10-20tr [X]" (dismissible)
  * Product grid: 3 columns on desktop, 2 on mobile
  * Pagination at bottom: "< 1 2 3 >"

PRODUCT CARD DESIGN:
- Square product image (1:1 ratio)
- "Bán chạy" badge (top right corner, orange)
- Product name (2 lines max, ellipsis)
- Brand name (small, gray text)
- Price: 15.990.000₫ (large, bold, blue)
- Old price: 18.000.000₫ (strikethrough, small, gray) - if discount
- Rating: ★★★★☆ (4.5) - 23 reviews
- Stock badge: "Còn 5 sản phẩm" (green) or "Hết hàng" (gray overlay)

MOBILE CHANGES:
- Filter becomes bottom sheet, triggered by "Lọc" button (top right)
- 2 column grid
- Sticky filter button at top

OUTPUT: Show desktop + mobile + open filter sidebar/sheet
```

### Prompt 3: Product Detail Page
```
Design a product detail page for a laptop on TechZone.

LAYOUT (Desktop):
- Breadcrumb: Home > Laptop > MacBook Pro 14" M3
- Two-column layout:
  LEFT COLUMN (50%):
  * Main product image (large, 4:3 ratio)
  * Thumbnail gallery below (4-5 small thumbnails, horizontal scroll)
  * Click image to zoom (show zoom icon on hover)
  
  RIGHT COLUMN (50%):
  * Product name (H1): "MacBook Pro 14\" M3 2024 - 18GB/512GB"
  * Brand + SKU: "Apple | SKU: MBP-M3-001"
  * Rating: ★★★★★ (4.8) - 47 reviews (clickable)
  * Price section:
    - Current price: 45.990.000₫ (very large, bold)
    - Old price: 52.000.000₫ (strikethrough)
    - Savings: "Tiết kiệm 6.010.000₫" (green text)
  * Stock status: "Còn 8 sản phẩm" (green badge)
  * Short description: 2-3 lines highlighting key features
  * Quantity picker: - [1] + (buttons with number input)
  * CTA buttons:
    - "Thêm vào giỏ" (primary blue, large) - DISABLED FOR PHASE 1, show "Sắp ra mắt"
    - "Mua ngay" (secondary orange, large) - DISABLED FOR PHASE 1

BELOW (Full width):
- Tabs navigation: "Mô tả" | "Thông số kỹ thuật" | "Đánh giá (47)"
- Tab content:
  * Mô tả: Rich text with images
  * Thông số kỹ thuật: Table with specs (CPU, RAM, Storage, Display, etc.)
  * Đánh giá: Show message "Tính năng đánh giá sẽ có trong phiên bản tiếp theo"

- Related products carousel: "Sản phẩm tương tự" + 5 product cards

MOBILE VERSION:
- Single column layout
- Image gallery at top
- Product info below
- Sticky bottom bar: Price + "Thêm vào giỏ" button (disabled)

OUTPUT: Show desktop + mobile + zoom interaction example
```

### Prompt 4: Search Results Page
```
Design a search results page for TechZone.

SCENARIO: User searched for "tai nghe bluetooth"

LAYOUT:
- Search query shown: "Kết quả tìm kiếm cho: tai nghe bluetooth" (heading)
- Result count: "Tìm thấy 12 sản phẩm"
- Same filter sidebar as category page (but simplified - only Price, Brand, Rating)
- Same product grid layout as category page
- Same sort dropdown

NO RESULTS STATE:
- Empty state illustration (magnifying glass icon)
- Message: "Không tìm thấy sản phẩm phù hợp"
- Suggestions: "Gợi ý cho bạn:" + list popular categories

SEARCH BAR IN HEADER:
- Show auto-suggest dropdown when typing (show 5 product suggestions with thumbnail + name + price)
- Highlight matched text in bold

OUTPUT: Show results page + no results state + search autocomplete
```

---

## 💻 Lovable Implementation Prompts

Use these prompts AFTER you have designs from Stitch. Feed to Lovable in order.

### Lovable Prompt 1: Project Setup + Homepage
```
Create a React + TypeScript + Vite project for TechZone e-commerce.

SETUP:
- Use Tailwind CSS + shadcn/ui components
- Install: react-router-dom, zustand, lucide-react, embla-carousel-react, clsx
- Setup folder structure:
  src/
  ├── components/
  │   ├── ui/ (shadcn)
  │   ├── layout/
  │   └── product/
  ├── pages/
  ├── lib/
  ├── data/
  └── types/

SEED DATA:
Create seed-products.ts with 30 products across categories:
- 10 laptops (brands: Apple, Dell, HP, Asus, Lenovo - prices 10M-50M)
- 8 accessories (mice, keyboards, headphones - prices 200K-3M)
- 6 phones (iPhone, Samsung, Xiaomi - prices 5M-30M)
- 6 gaming gear (prices 1M-15M)

Each product needs: id, name, slug, category, brand, price, oldPrice (30% have), description, images (use placeholder.com), stock (random 0-20), rating (3.5-5), reviewCount, isPopular (20% true), isFeatured (10% true)

BUILD HOMEPAGE:
[Attach Stitch design for Homepage here]

Implement exactly as designed:
- Header component with search bar (non-functional yet), cart icon, user icon
- Hero section with background image
- Categories grid (6 boxes, clickable, routes to /category/[slug])
- Featured products carousel using embla-carousel
- Best sellers grid
- Trust badges section
- Footer

Make it responsive (mobile-first).

Use shadcn/ui components: Button, Card, Badge.
```

### Lovable Prompt 2: Product Listing + Filter
```
Build the product listing page for TechZone.

ROUTE: /category/:categorySlug

[Attach Stitch design for Product Listing here]

REQUIREMENTS:
1. Fetch products from seed data, filter by category
2. FilterSidebar component (desktop) / FilterSheet (mobile bottom sheet):
   - Price range filter (4 preset buttons: <5M, 5-10M, 10-20M, >20M)
   - Brand checkboxes (get unique brands from products)
   - RAM checkboxes (for laptop category only)
   - Storage checkboxes (for laptop category only)
   - "Xóa bộ lọc" button
3. Applied filters chips (dismissible)
4. Sort dropdown (Phổ biến nhất, Giá thấp → cao, Giá cao → thấp, Mới nhất)
5. ProductGrid component (3 cols desktop, 2 cols mobile)
6. ProductCard component matching design:
   - Image with lazy loading
   - "Bán chạy" badge if isPopular
   - Price formatting: 15.990.000₫
   - Rating stars (use lucide-react Star icon)
   - Stock badge
   - Click → go to /product/:slug
7. Pagination (12 products per page)

STATE MANAGEMENT:
Use Zustand for filter state (price, brands, specs, sort).
Persist in URL query params for shareable links.

RESPONSIVE:
Mobile: Filter button (top right) opens bottom sheet.
Use shadcn Sheet component.
```

### Lovable Prompt 3: Product Detail Page
```
Build the product detail page for TechZone.

ROUTE: /product/:slug

[Attach Stitch design for Product Detail here]

REQUIREMENTS:
1. Fetch product by slug from seed data
2. ProductGallery component:
   - Main image (large)
   - Thumbnails carousel below (embla-carousel)
   - Click to view larger (use shadcn Dialog for zoom modal)
3. Product info section:
   - Name, brand, SKU
   - Rating (clickable but shows "Coming soon")
   - Price with old price strikethrough if exists
   - Stock badge
   - Short description
4. Quantity picker (- [input] +)
5. CTA buttons: "Thêm vào giỏ" + "Mua ngay"
   - Both DISABLED with tooltip "Tính năng sắp ra mắt - Phase 2"
6. Tabs (use shadcn Tabs):
   - Mô tả: Show fullDescription (HTML content)
   - Thông số kỹ thuật: Specs table (use shadcn Accordion for each spec row)
   - Đánh giá: "Tính năng sẽ có trong Phase 4"
7. Related products carousel (filter by same category, exclude current)
8. Breadcrumb navigation
9. 404 page if product not found

RESPONSIVE:
Mobile: Single column, sticky bottom bar with price + CTA button.

Make sure images are lazy loaded.
```

### Lovable Prompt 4: Search Functionality
```
Implement search for TechZone.

ROUTE: /search?q=[query]

[Attach Stitch design for Search Results here]

REQUIREMENTS:
1. Search bar in header:
   - Input with search icon
   - Auto-suggest dropdown as user types (debounced 300ms)
   - Show top 5 matching products: thumbnail + name + price
   - Press Enter or click result → go to product or search results
2. Search results page:
   - Query displayed in heading
   - Result count
   - Reuse FilterSidebar + ProductGrid from category page
   - Search logic: match query against product name, brand, description (case-insensitive)
3. No results state:
   - Illustration (use lucide-react SearchX icon)
   - Message + suggestions (link to popular categories)
4. URL query param: ?q=tai+nghe
5. Update document title: "Tìm kiếm: [query] - TechZone"

STATE:
Use Zustand to store search query.
Persist in URL.

PERFORMANCE:
Debounce auto-suggest.
Limit auto-suggest to 5 results.
```

---

## ✅ Acceptance Criteria (Phase 1 Complete When)

### Homepage
- [ ] Header renders với logo, search bar, cart icon, user icon
- [ ] Hero section với image và CTA text
- [ ] 6 categories hiển thị đúng, clickable → category page
- [ ] Featured products carousel swipe được (touch + mouse)
- [ ] Best sellers grid hiển thị 8 products
- [ ] Trust badges section renders
- [ ] Footer với links
- [ ] Responsive mobile + desktop

### Product Listing
- [ ] Category page load đúng products theo category
- [ ] Filter sidebar works:
  - [ ] Price range filter products correctly
  - [ ] Brand checkboxes filter correctly
  - [ ] Specs filters (RAM, storage) work for laptops
  - [ ] "Xóa bộ lọc" clears all filters
- [ ] Applied filters show as chips, dismissible
- [ ] Sort dropdown changes order (price, popularity)
- [ ] Product cards render đúng: image, name, price, rating, stock
- [ ] Click product → goes to detail page
- [ ] Pagination works (12 per page)
- [ ] Mobile: filter button opens bottom sheet
- [ ] URL query params persist filters (shareable links)

### Product Detail
- [ ] Page loads product by slug correctly
- [ ] 404 page nếu slug not found
- [ ] Image gallery: thumbnails clickable, changes main image
- [ ] Click main image → zoom modal
- [ ] Quantity picker: + / - buttons work, input editable
- [ ] Specs table expands/collapses (accordion)
- [ ] Tabs switch content (Mô tả, Thông số, Đánh giá)
- [ ] Related products carousel shows 5 products from same category
- [ ] Breadcrumb navigation works
- [ ] Mobile: sticky bottom bar with price + CTA
- [ ] CTA buttons disabled với tooltip "Phase 2"

### Search
- [ ] Search bar in header accepts input
- [ ] Auto-suggest shows 5 matching products as user types (debounced)
- [ ] Click suggestion → goes to product detail
- [ ] Press Enter → goes to search results page
- [ ] Search results page shows matching products
- [ ] Result count displayed
- [ ] Filter sidebar works on search results
- [ ] No results state displays với suggestions
- [ ] URL query param ?q= persists search query

### Cross-cutting
- [ ] All images lazy load (below fold)
- [ ] Page load <3s on 3G (test with Chrome DevTools throttling)
- [ ] No console errors
- [ ] Mobile responsive: tested on 375px, 768px, 1024px widths
- [ ] Keyboard navigation works (tab through links/buttons)
- [ ] Focus states visible

---

## 🎯 Success Metrics (Phase 1)

Track these before moving to Phase 2:

- [ ] Can browse all 30 seeded products
- [ ] Can filter products by price + brand + specs
- [ ] Can search and find products
- [ ] Can view product details
- [ ] 0 critical bugs
- [ ] Mobile usable (tested on real device)
- [ ] Feedback from 3+ people: "I can find products easily"

---

## 🚧 Known Limitations (Accept for Phase 1)

- Cart icon không functional (shows badge "0")
- User icon không functional (clicking shows "Coming soon")
- Add to cart buttons disabled
- Reviews tab empty
- No backend (all data from seed file)
- No analytics tracking yet

---

## 📝 Handoff to Phase 2

Before starting Phase 2, ensure:
1. ✅ All Phase 1 acceptance criteria met
2. ✅ No critical bugs in discovery flow
3. ✅ Designs approved by stakeholders
4. ✅ Performance acceptable (<3s load)
5. ✅ Mobile tested on real devices

**Ready for Phase 2?** → Open `02_PRD_Phase2_Purchase.md`

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-06 | 1.0 | Phase 1 PRD created with Stitch + Lovable prompts |