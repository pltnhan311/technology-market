# TechZone E-commerce - Overview & Master Plan

## 📌 Document Purpose
This is the MASTER document. Read this first, then follow Phase PRDs in sequence.

---

## 1. Project Overview

### 1.1 Product Vision
**TechZone** - E-commerce platform bán đồ công nghệ (laptop, PC, accessories, gaming gear) với focus vào:
- 🎯 **Trust**: Thông tin specs rõ ràng, reviews thật
- ⚡ **Speed**: UX mượt, checkout đơn giản
- 📱 **Mobile-first**: 70% traffic từ mobile

### 1.2 Core Problem
- Marketplace lớn (Shopee/Lazada): quá nhiều seller fake, khó tin
- Shop nhỏ Facebook: thiếu chuyên nghiệp, không track order
- Tech buyers: cần specs chi tiết để so sánh

### 1.3 Solution
Single-vendor e-commerce với inventory tập trung, specs đầy đủ, review verified, tracking real-time.

### 1.4 Why Now
- WFH boom → nhu cầu mua laptop/gear cao
- Gen Z quen mua online, cần platform chuyên biệt
- Có thể MVP với localStorage (no backend complexity)

---

## 2. Target Users

**Primary: "Minh the Researcher" (70%)**
- 22-32 tuổi, tech-savvy, income 10-30M/tháng
- Research kỹ trước khi mua, đọc reviews, so sánh specs
- Pain: sợ hàng fake, thông tin mơ hồ

**Secondary: "Lan the Gifter" (30%)**
- 25-40 tuổi, mua quà hoặc nhu cầu cơ bản
- Cần gợi ý nhanh, tin review, thích COD
- Pain: không hiểu specs, cần support

---

## 3. Tech Stack (Consistent Across All Phases)

### Frontend
- **React 18 + TypeScript** - Type safety
- **Vite** - Fast build
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built components (Button, Card, Dialog, Sheet, Input, Select, Badge, Tabs, Accordion)

### Routing & State
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management với localStorage persistence

### Storage (MVP)
- **localStorage** - 5-10MB limit
- Migration path: Supabase hoặc Firebase (Phase 5+)

### Key Libraries
- `react-hook-form` + `zod` - Form validation
- `date-fns` - Date formatting
- `lucide-react` - Icons
- `react-hot-toast` - Notifications
- `embla-carousel-react` - Carousels
- `clsx` / `tailwind-merge` - Conditional classes

---

## 4. Data Structures (Master Schema)

```typescript
// ========== PRODUCTS ==========
interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'laptop' | 'phone' | 'accessory' | 'gaming' | 'pc' | 'smarthome';
  brand: string;
  price: number; // VND
  oldPrice?: number;
  description: string; // short
  fullDescription: string; // HTML
  specs: Record<string, string>; // flexible
  images: string[]; // [main, ...gallery]
  stock: number;
  rating: number; // 0-5
  reviewCount: number;
  isPopular: boolean;
  isFeatured: boolean;
  createdAt: string;
}

// ========== CART ==========
interface CartItem {
  productId: string;
  product: Product; // denormalized
  quantity: number;
  addedAt: string;
}

// ========== USER & AUTH ==========
interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  addresses: ShippingAddress[];
  createdAt: string;
}

interface ShippingAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  isDefault: boolean;
}

interface AuthToken {
  userId: string;
  email: string;
  expiresAt: string;
}

// ========== ORDERS ==========
interface Order {
  id: string;
  userId?: string; // null for guest
  guestInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number; // snapshot at order time
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'cod' | 'bank_transfer';
  shippingFee: number;
  subtotal: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  note?: string;
  trackingInfo?: {
    shipper: string;
    estimatedDelivery: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ========== REVIEWS ==========
interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  orderId: string; // verified purchase
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  helpfulCount: number;
  createdAt: string;
}

// ========== STORAGE KEYS ==========
const STORAGE_KEYS = {
  PRODUCTS: 'techzone_products',
  CART: 'techzone_cart',
  USER: 'techzone_user',
  AUTH_TOKEN: 'techzone_auth',
  ORDERS: 'techzone_orders',
  REVIEWS: 'techzone_reviews',
};
```

---

## 5. Development Phases (DO IN ORDER)

### 🔵 Phase 1: Product Discovery (Week 1-2)
**Goal:** Users có thể browse và xem sản phẩm
- Homepage với categories
- Product listing với filter/search
- Product detail page
- **No cart, no checkout yet**

**Output:** Static product catalog hoàn chỉnh
**PRD:** `01_PRD_Phase1_Discovery.md`

---

### 🟢 Phase 2: Purchase Flow (Week 3-4)
**Goal:** Users có thể mua hàng
- Shopping cart
- Checkout flow (guest + logged in)
- Order confirmation
- Basic order tracking

**Output:** End-to-end purchase working
**PRD:** `02_PRD_Phase2_Purchase.md`

---

### 🟡 Phase 3: User Accounts (Week 5)
**Goal:** Users có thể tạo account và track orders
- Register/Login
- User profile
- Order history
- Saved addresses

**Output:** User retention features
**PRD:** `03_PRD_Phase3_Account.md`

---

### 🟣 Phase 4: Social Proof (Week 6)
**Goal:** Build trust qua reviews
- Review submission
- Review display & filtering
- Rating calculation
- Helpful votes

**Output:** Trust & credibility layer
**PRD:** `04_PRD_Phase4_Social.md`

---

### 🔴 Phase 5: Admin (Post-MVP)
**Goal:** Owner có thể manage products & orders
- Product CRUD
- Order management
- Inventory tracking
- Basic analytics

**Output:** Operational dashboard
**PRD:** `05_PRD_Admin.md` (tạo sau)

---

## 6. Design System (Consistent Across Phases)

### 6.1 Colors
```css
--primary: #2563EB;        /* Blue - trust */
--primary-hover: #1D4ED8;
--secondary: #F97316;      /* Orange - CTA */
--success: #10B981;        /* Green */
--error: #EF4444;          /* Red */
--warning: #ECC94B;        /* Yellow */

--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-600: #6B7280;
--gray-900: #1F2937;
```

### 6.2 Typography
- **Font:** Inter hoặc Roboto
- **Headers:** Bold, 28-40px
- **Body:** Regular, 16px
- **Price:** Semi-bold, 20-24px (card), 32px (detail)

### 6.3 Spacing
- Container max-width: 1280px
- Grid gap: 16px (mobile), 24px (desktop)
- Section padding: 40px (mobile), 80px (desktop)

### 6.4 Components (shadcn/ui)
Dùng consistent:
- `Button` - variants: default, outline, ghost, destructive
- `Card` - product cards, order cards
- `Badge` - stock status, ratings
- `Dialog` - confirmations
- `Sheet` - cart, mobile filter
- `Input`, `Select`, `Textarea` - forms
- `Tabs` - category navigation
- `Accordion` - specs table

### 6.5 Responsive Breakpoints
```
sm: 640px   (mobile landscape)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
```

### 6.6 Image Guidelines
- Product thumbnails: 1:1 ratio, 400x400px
- Product detail: 4:3 ratio, 800x600px
- Format: WebP với PNG fallback
- Size: <150KB per image
- Lazy load below fold

---

## 7. Folder Structure (Complete App)

```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── layout/          # Header, Footer, Layout
│   ├── product/         # ProductCard, ProductDetail, etc.
│   ├── filter/          # FilterSidebar, PriceRange, etc.
│   ├── cart/            # CartSheet, CartItem, etc.
│   ├── checkout/        # CheckoutProgress, ShippingForm, etc.
│   ├── order/           # OrderCard, OrderTimeline, etc.
│   ├── review/          # ReviewCard, ReviewForm, etc.
│   └── auth/            # LoginForm, RegisterForm, etc.
├── pages/
│   ├── Home.tsx
│   ├── Category.tsx
│   ├── ProductDetail.tsx
│   ├── SearchResults.tsx
│   ├── Checkout.tsx
│   ├── OrderTracking.tsx
│   ├── OrderHistory.tsx
│   ├── Profile.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useFilter.ts
├── store/
│   └── store.ts         # Zustand store
├── lib/
│   ├── storage.ts       # localStorage utils
│   ├── utils.ts         # formatPrice, slugify, etc.
│   ├── validation.ts    # Zod schemas
│   └── constants.ts     # categories, cities, brands
├── data/
│   └── seed-products.ts # Initial 30-50 products
├── types/
│   └── index.ts
└── App.tsx
```

---

## 8. Success Metrics (Entire Project)

### MVP Launch Criteria
- [ ] Users có thể browse 50+ products
- [ ] Users có thể filter by price, brand, specs
- [ ] Users có thể add to cart và checkout
- [ ] Users có thể track orders
- [ ] Users có thể tạo account và login
- [ ] Users có thể leave reviews
- [ ] Mobile responsive (tested on iOS + Android)
- [ ] No critical bugs trong happy path
- [ ] Page load <3s on 3G

### Post-Launch Goals (Month 1)
- 20+ test orders
- 10+ user reviews
- 5+ returning customers
- Collect feedback for Phase 5 (Admin)

### Key Metrics to Track
- Conversion rate (visitors → orders)
- Cart abandonment rate
- Average order value
- Search usage rate
- Mobile vs desktop ratio
- Page load times

---

## 9. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| localStorage quota exceeded | High | Auto-cleanup old data, warn at 80%, export feature |
| No real-time inventory | High | Accept risk MVP, manual stock updates, plan backend |
| Images slow to load | Medium | WebP + lazy load + compression <150KB |
| Payment verification (bank transfer) | High | Manual process, clear instructions, 1-2h confirmation SLA |
| No email notifications | Medium | Clear on-site confirmation, encourage save order ID |

---

## 10. Next Steps

1. **Read Phase 1 PRD** → `01_PRD_Phase1_Discovery.md`
2. **Feed to Stitch** → Use prompts provided trong Phase 1 PRD
3. **Get designs back** → Review & iterate
4. **Feed to Lovable** → Use implementation prompts + designs
5. **Test Phase 1** → Make sure discovery works perfectly
6. **Move to Phase 2** → Repeat process

---

## 11. Questions & Decisions

### ✅ Decided
- MVP uses localStorage only (no backend)
- Single-vendor model (not marketplace)
- Vietnamese only
- Tax included in prices
- COD + bank transfer (no online gateway)
- Each variant = separate product (no variant SKUs)

### 🤔 To Decide Later
- Backend migration timing (after how many users?)
- Admin CMS approach (custom vs headless CMS)
- Email service provider (SendGrid vs Resend)
- Analytics platform (GA4 vs Mixpanel)
- Payment gateway (Momo vs VNPay vs Stripe)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-06 | 1.0 | Master overview document created |