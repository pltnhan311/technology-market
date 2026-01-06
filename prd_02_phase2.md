# Phase 2: Purchase Flow
**Ship Date Target:** Week 3-4 | **Status:** 🟢 Ready After Phase 1

---

## 📋 Phase Overview

### Goal
Users có thể add products vào cart, checkout (guest hoặc logged in), và track order status.

### Why This Phase?
- Convert browsers thành buyers
- Validate business model (do people actually buy?)
- Test payment flows (COD + bank transfer)

### What's Included
✅ Shopping cart (slide-out sheet)  
✅ Cart management (add, update quantity, remove)  
✅ Checkout flow (3 steps: Shipping → Payment → Review)  
✅ Guest checkout (no account required)  
✅ Order confirmation page  
✅ Basic order tracking (by order ID + phone)  
✅ Order status display  

### What's NOT Included
❌ User accounts (login/register) - Phase 3  
❌ Saved addresses - Phase 3  
❌ Order history page - Phase 3  
❌ Reviews - Phase 4  
❌ Online payment gateway (only COD + bank transfer)  

### Dependencies
✅ Phase 1 complete (product discovery working)

---

## 🎨 Stitch Design Prompts

### Prompt 1: Shopping Cart (Slide-out Sheet)
```
Design a shopping cart slide-out sheet for TechZone e-commerce.

TRIGGER: Click cart icon in header (badge shows item count)

SLIDE-OUT SHEET (Right side, 420px wide):
- Header:
  * "Giỏ hàng (3)" title (left)
  * Close button X (right)
- Cart items list (scrollable):
  * Each item card:
    - Product thumbnail (80x80px, left)
    - Product info (middle):
      * Product name (2 lines max)
      * Price: 15.990.000₫ (bold)
    - Quantity controls (right):
      * - [2] + (inline buttons)
    - Remove button (X icon, top-right of card)
    - Subtotal per item: 31.980.000₫ (below quantity)
  * Divider between items
- Empty cart state:
  * Shopping bag icon (large, gray)
  * "Giỏ hàng trống"
  * "Khám phá sản phẩm" button (primary)
- Cart summary (sticky at bottom):
  * Subtotal: 95.970.000₫
  * Shipping: "Tính ở bước thanh toán" (gray text)
  * Divider
  * Total: 95.970.000₫ (large, bold)
  * "Tiến hành thanh toán" button (primary, full width)
  * "Tiếp tục mua sắm" link (center, gray)

INTERACTIONS:
- Overlay darkens main content when cart open
- Click overlay or X to close
- Quantity updates instantly update subtotal + total
- Remove item shows confirm dialog: "Xóa [Product] khỏi giỏ?"

MOBILE VERSION:
- Full-screen slide-up from bottom (not side)
- Swipe down gesture to close

OUTPUT: Show desktop + mobile + empty state
```

### Prompt 2: Checkout Page - Step 1 (Shipping Info)
```
Design checkout page for TechZone - Step 1: Shipping Information.

LAYOUT:
- Progress indicator at top:
  * 1. Thông tin giao hàng (active, blue) → 2. Thanh toán (gray) → 3. Xác nhận (gray)
  * Show step numbers in circles, connected by lines
- Two-column layout (desktop):
  LEFT COLUMN (60%):
  * Page heading: "Thông tin giao hàng"
  * Form fields:
    - Họ và tên* (input)
    - Số điện thoại* (input, phone format)
    - Email* (input)
    - Địa chỉ* (textarea, 2 rows)
    - Tỉnh/Thành phố* (select dropdown with search)
    - Quận/Huyện* (select dropdown, dependent on city)
    - Note: Tất cả fields có * là required, hiển thị red asterisk
  * Validation errors below each field (red text, icon)
  * "Tiếp tục" button (primary, large, bottom of form)
  * "Quay lại giỏ hàng" link (gray, above button)
  
  RIGHT COLUMN (40%):
  * Order summary card (sticky):
    - Heading: "Đơn hàng của bạn"
    - Items list (compact):
      * Product thumbnail (60x60px) + name + quantity (x2) + price
    - Divider
    - Subtotal: 95.970.000₫
    - Shipping: "Sẽ tính ở bước tiếp theo"
    - Divider
    - Total: 95.970.000₫ (bold, large)

VALIDATION:
- Real-time validation on blur
- Show error state: red border + error message + error icon
- Disable "Tiếp tục" until all required fields valid

MOBILE VERSION:
- Single column
- Order summary collapsible at top (tap to expand)
- Progress indicator horizontal at very top

OUTPUT: Show desktop + validation error states + mobile
```

### Prompt 3: Checkout Page - Step 2 (Payment Method)
```
Design checkout page - Step 2: Payment Method.

PROGRESS: 1. Thông tin giao hàng (done, green checkmark) → 2. Thanh toán (active, blue) → 3. Xác nhận (gray)

LEFT COLUMN:
- Heading: "Phương thức thanh toán"
- Shipping address recap (card, small):
  * "Giao hàng đến:" label
  * Name, phone, full address
  * "Thay đổi" link (goes back to step 1)
- Payment method selection:
  * Radio buttons (large, easy to tap):
  
  Option 1: [●] Thanh toán khi nhận hàng (COD)
  - Icon: cash/money icon
  - Description: "Thanh toán bằng tiền mặt khi nhận hàng"
  - Default selected
  
  Option 2: [ ] Chuyển khoản ngân hàng
  - Icon: bank icon
  - Description: "Chuyển khoản trước, đơn hàng xử lý sau khi nhận được tiền"
  - When selected, show bank info card:
    * Bank name: Vietcombank
    * Account number: 1234567890
    * Account holder: CÔNG TY TECHZONE
    * Transfer content: "TZ [Order ID]" (will be generated)
    * Note: "Vui lòng chuyển khoản và gửi ảnh bill qua Zalo: 0901234567"
- Shipping method (read-only for MVP):
  * "Giao hàng tiêu chuẩn" (badge)
  * "2-3 ngày làm việc" (gray text)
  * Shipping fee calculated: 30.000₫ (HN/HCM) or 50.000₫ (other cities)
- Order note (optional):
  * Textarea: "Ghi chú đơn hàng (tùy chọn)"
  * Placeholder: "VD: Giao giờ hành chính, gọi trước 15 phút"
- Buttons:
  * "Quay lại" (secondary, left)
  * "Tiếp tục" (primary, right)

RIGHT COLUMN:
- Order summary (updated with shipping fee):
  * Subtotal: 95.970.000₫
  * Shipping: 30.000₫
  * Total: 96.000.000₫ (bold)

OUTPUT: Show both payment options selected states + mobile
```

### Prompt 4: Checkout Page - Step 3 (Review Order)
```
Design checkout page - Step 3: Review & Confirm Order.

PROGRESS: 1, 2 (done, green checkmarks) → 3. Xác nhận (active, blue)

LEFT COLUMN:
- Heading: "Xác nhận đơn hàng"
- Review sections (each in a card):

  SECTION 1: Thông tin giao hàng
  - Icon: truck
  - Name, phone, email
  - Full address
  - "Chỉnh sửa" link (goes back to step 1)
  
  SECTION 2: Phương thức thanh toán
  - Icon: wallet
  - "Thanh toán khi nhận hàng (COD)" or "Chuyển khoản ngân hàng"
  - If bank transfer: show bank details again (collapsible)
  - "Chỉnh sửa" link (goes back to step 2)
  
  SECTION 3: Sản phẩm đặt mua
  - Items list (detailed):
    * Thumbnail + name + quantity + price
    * Show specs if relevant (e.g., "RAM: 16GB")
  - "Chỉnh sửa" link (goes to cart)

- Terms checkbox:
  * [ ] "Tôi đã đọc và đồng ý với Chính sách bán hàng và Điều khoản sử dụng"
  * Links to policy pages (open in new tab)
- Buttons:
  * "Quay lại" (secondary)
  * "Đặt hàng" (primary, LARGE, disabled until checkbox checked)
  * Loading state: "Đang xử lý..." with spinner

RIGHT COLUMN:
- Order summary (final):
  * All items listed
  * Subtotal
  * Shipping
  * Total (very large, bold, blue)
  * Estimated delivery: "Dự kiến giao: 08-10/01/2025"

OUTPUT: Show desktop + checkbox unchecked/checked states + loading state + mobile
```

### Prompt 5: Order Confirmation Page
```
Design order confirmation (success) page for TechZone.

LAYOUT (centered, max 800px):
- Success animation:
  * Large green checkmark icon (animated pulse)
  * Confetti animation (subtle, brief)
- Success message:
  * "Đặt hàng thành công!" (large heading)
  * "Cảm ơn bạn đã mua hàng tại TechZone" (subheading)
- Order info card:
  * "Mã đơn hàng: #TZ12345678" (large, bold, copyable)
  * "Ngày đặt: 06/01/2025 - 14:30"
  * Copy button (click to copy order ID)
- Order summary (collapsible):
  * Items list (compact)
  * Total amount
  * Payment method
  * Shipping address
- Next steps card:
  * IF COD:
    - Icon: money
    - "Vui lòng chuẩn bị 96.000.000₫ tiền mặt khi nhận hàng"
  * IF Bank Transfer:
    - Icon: bank
    - "Vui lòng chuyển khoản và gửi ảnh bill qua:"
    - Zalo: 0901234567 (with Zalo icon, clickable)
    - Email: order@techzone.vn (clickable)
    - "Đơn hàng sẽ được xử lý sau khi nhận thanh toán (1-2 giờ)"
  * Estimated delivery: "Dự kiến giao hàng: 08-10/01/2025"
- Action buttons:
  * "Theo dõi đơn hàng" (primary)
  * "Tiếp tục mua sắm" (secondary)
- Support info:
  * "Cần hỗ trợ? Liên hệ: 1900 1234"

MOBILE:
- Stack all sections vertically
- Sticky bottom bar: "Theo dõi đơn hàng" button

OUTPUT: Show both COD and Bank Transfer versions + mobile
```

### Prompt 6: Order Tracking Page (Guest)
```
Design order tracking page for guest users.

TWO PARTS:

PART 1: Tracking Form (if not tracked yet)
- Heading: "Tra cứu đơn hàng"
- Description: "Nhập thông tin đơn hàng để theo dõi"
- Form (centered card, max 500px):
  * Mã đơn hàng (input): placeholder "VD: TZ12345678"
  * Số điện thoại (input): placeholder "Số điện thoại khi đặt hàng"
  * "Tra cứu" button (primary, full width)
- Error state: "Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin."

PART 2: Order Detail (after successful lookup)
- Order header:
  * "Đơn hàng #TZ12345678"
  * Status badge (large): "Đang giao hàng" (orange, pulsing)
  * Date: "Đặt ngày: 06/01/2025"
- Order timeline (vertical, left-aligned):
  * Step 1: Đang xử lý (done, green checkmark) - "06/01 - 14:30"
  * Step 2: Đã xác nhận (done, green checkmark) - "06/01 - 15:00"
  * Step 3: Đang giao hàng (current, blue dot pulsing) - "07/01 - 09:00"
    - Shipper: "Nguyễn Văn A - 0912345678"
    - Tracking note: "Đơn hàng đang trên đường giao đến bạn"
  * Step 4: Đã giao (pending, gray) - "Dự kiến: 08/01"
- Order details sections (cards):
  * Sản phẩm (items list)
  * Thông tin giao hàng
  * Thanh toán (method + amount)
- Action button:
  * "Liên hệ hỗ trợ" (if need help)
  * "Hủy đơn" (if status = pending only, red button with confirm dialog)

STATUS BADGE COLORS:
- Pending: yellow
- Confirmed: blue
- Shipping: orange (animated)
- Delivered: green
- Cancelled: red

OUTPUT: Show tracking form + order detail with different statuses + mobile
```

---

## 💻 Lovable Implementation Prompts

### Lovable Prompt 1: Shopping Cart + Zustand Store
```
Implement shopping cart for TechZone using Zustand.

[Attach Stitch design for Cart Sheet here]

ZUSTAND STORE (src/store/store.ts):
```typescript
interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}
```

Use Zustand persist middleware to sync with localStorage (key: 'techzone_cart').

CART SHEET COMPONENT (src/components/cart/CartSheet.tsx):
- Use shadcn Sheet component
- Trigger: cart icon in header (show badge with cartCount)
- CartItem component:
  * Thumbnail, name, price
  * Quantity controls: - [input] + (debounce updates)
  * Remove button → show confirm dialog (shadcn AlertDialog)
  * Subtotal per item
- Empty state with icon + CTA
- Cart summary: subtotal, shipping note, total
- "Tiến hành thanh toán" button → navigate to /checkout
- "Tiếp tục mua sắm" link → close sheet

PRODUCT DETAIL PAGE INTEGRATION:
- Enable "Thêm vào giỏ" button (remove disabled state from Phase 1)
- On click: addToCart(product, quantity) → show toast "Đã thêm vào giỏ" → open cart sheet
- "Mua ngay" button: addToCart → navigate to /checkout immediately

REQUIREMENTS:
- Price formatting: 15.990.000₫ (use lib/utils.ts formatPrice function)
- Quantity validation: min 1, max product.stock
- Update cart badge in header real-time
- Persist cart across page refresh
- Handle out of stock: disable add to cart, show "Hết hàng"

Use shadcn: Sheet, Button, AlertDialog, Badge.
Use lucide-react icons: ShoppingCart, Trash2, Plus, Minus.
Use react-hot-toast for notifications.
```

### Lovable Prompt 2: Checkout Flow - Shipping Form
```
Build checkout page Step 1: Shipping Information.

ROUTE: /checkout

[Attach Stitch design for Checkout Step 1 here]

REQUIREMENTS:
1. Check if cart empty → redirect to /
2. Checkout state management (Zustand or React Context):
   ```typescript
   interface CheckoutState {
     step: 1 | 2 | 3;
     shippingInfo: ShippingInfo | null;
     paymentMethod: 'cod' | 'bank_transfer' | null;
     orderNote: string;
   }
   ```
3. Progress indicator component (CheckoutProgress.tsx):
   - Steps: Thông tin → Thanh toán → Xác nhận
   - Highlight current step, checkmark for completed
4. ShippingForm component (react-hook-form + zod validation):
   ```typescript
   const schema = z.object({
     name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
     phone: z.string().regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
     email: z.string().email("Email không hợp lệ"),
     address: z.string().min(10, "Địa chỉ quá ngắn"),
     city: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
     district: z.string().min(1, "Vui lòng chọn quận/huyện"),
   });
   ```
5. City + District dropdowns (use shadcn Select):
   - Cities: load from constants (Hà Nội, TP HCM, 60+ cities)
   - Districts: dependent on city selection
6. Order summary sidebar (sticky):
   - Show cart items (compact cards)
   - Subtotal, shipping TBD, total
7. Validation:
   - Real-time on blur
   - Show errors below fields (red text + icon)
   - Disable "Tiếp tục" if invalid
8. On submit: save to checkoutState → navigate to step 2

RESPONSIVE:
- Mobile: single column, summary collapsible at top

Use shadcn: Input, Select, Textarea, Button, Card, Label.
Use react-hook-form, zod.
```

### Lovable Prompt 3: Checkout Step 2 - Payment Method
```
Build checkout Step 2: Payment Method selection.

ROUTE: /checkout (step=2)

[Attach Stitch design for Checkout Step 2 here]

REQUIREMENTS:
1. Check if shippingInfo exists → else redirect to step 1
2. Show completed shipping address (recap card):
   - Display saved shipping info
   - "Thay đổi" button → back to step 1
3. Payment method selection (radio group):
   - COD (default selected)
   - Bank Transfer (when selected, show bank details card):
     ```
     Bank: Vietcombank
     Account: 1234567890
     Holder: CÔNG TY TECHZONE
     Content: "TZ [Order ID]" (show placeholder, actual generated in step 3)
     Note: "Gửi bill qua Zalo: 0901234567"
     ```
4. Shipping method (read-only):
   - "Giao hàng tiêu chuẩn (2-3 ngày)"
5. Calculate shipping fee:
   ```typescript
   const shippingFee = ['Hà Nội', 'TP Hồ Chí Minh'].includes(city) ? 30000 : 50000;
   ```
6. Order note textarea (optional)
7. Update order summary:
   - Subtotal
   - Shipping: 30.000₫ or 50.000₫
   - Total (updated)
8. Buttons:
   - "Quay lại" → step 1
   - "Tiếp tục" → save payment info → step 3

Use shadcn: RadioGroup, Card, Textarea, Button.
```

### Lovable Prompt 4: Checkout Step 3 - Review & Submit Order
```
Build checkout Step 3: Review and place order.

ROUTE: /checkout (step=3)

[Attach Stitch design for Checkout Step 3 here]

REQUIREMENTS:
1. Check if paymentMethod exists → else redirect to step 2
2. Display review sections (all in cards):
   - Shipping info + "Chỉnh sửa" link → step 1
   - Payment method + "Chỉnh sửa" link → step 2
   - Products list + "Chỉnh sửa" link → cart
3. Order summary (final):
   - Items, subtotal, shipping, total
   - Estimated delivery: calculate 2-3 days from now (use date-fns)
4. Terms checkbox:
   - "Tôi đã đọc và đồng ý với Chính sách..."
   - Link to /policies page (create simple policy page)
   - Disable "Đặt hàng" until checked
5. Place order logic:
   ```typescript
   const createOrder = async () => {
     const orderId = `TZ${Date.now()}${Math.random().toString(36).substr(2, 4)}`;
     const order: Order = {
       id: orderId,
       guestInfo: { name, email, phone },
       items: cart.map(item => ({
         productId: item.productId,
         productName: item.product.name,
         productImage: item.product.images[0],
         quantity: item.quantity,
         price: item.product.price,
       })),
       shippingAddress,
       paymentMethod,
       shippingFee,
       subtotal,
       total,
       status: 'pending',
       note: orderNote,
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString(),
     };
     
     // Save to localStorage
     const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
     orders.push(order);
     localStorage.setItem('techzone_orders', JSON.stringify(orders));
     
     // Clear cart
     clearCart();
     
     return order;
   };
   ```
6. On submit:
   - Show loading state "Đang xử lý..."
   - Create order
   - Navigate to /order-confirmation?id=[orderId]
7. Error handling: try-catch, show toast if failed

Use shadcn: Checkbox, Button, Card.
Use react-hot-toast.
```

### Lovable Prompt 5: Order Confirmation Page
```
Build order confirmation page.

ROUTE: /order-confirmation?id=[orderId]

[Attach Stitch design for Order Confirmation here]

REQUIREMENTS:
1. Get orderId from URL query param
2. Fetch order from localStorage:
   ```typescript
   const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
   const order = orders.find(o => o.id === orderId);
   ```
3. If not found → redirect to / with toast error
4. Success animation:
   - Green checkmark icon (pulse animation)
   - Brief confetti (use canvas-confetti library OR simple CSS animation)
5. Display order info:
   - Order ID (large, with copy button)
   - Date
   - Collapsible order summary (use shadcn Accordion)
6. Next steps section:
   - IF COD: show cash preparation message
   - IF Bank Transfer: show bank details + Zalo/Email contact
   - Estimated delivery date
7. Action buttons:
   - "Theo dõi đơn hàng" → /order-tracking?id=[orderId]&phone=[phone]
   - "Tiếp tục mua sắm" → /
8. Support info at bottom

RESPONSIVE:
- Mobile: sticky bottom button "Theo dõi đơn hàng"

Use shadcn: Button, Card, Accordion, Badge.
Use lucide-react icons: CheckCircle2, Copy, Phone.
```

### Lovable Prompt 6: Order Tracking (Guest)
```
Build order tracking page for guest users.

ROUTE: /order-tracking

[Attach Stitch design for Order Tracking here]

TWO STATES:

STATE 1: Tracking Form (no query params)
- Form with 2 fields:
  * Order ID input
  * Phone input
- Validation: both required
- On submit: fetch order from localStorage:
  ```typescript
  const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
  const order = orders.find(o => 
    o.id === orderId && 
    (o.guestInfo?.phone === phone || o.userId) // handle both guest and user orders
  );
  ```
- If found: update URL ?id=[orderId]&phone=[phone] → show STATE 2
- If not found: show error "Không tìm thấy đơn hàng"

STATE 2: Order Detail (with query params)
- Order header: ID, status badge, date
- Order timeline (vertical):
  ```typescript
  const statuses = [
    { key: 'pending', label: 'Đang xử lý', color: 'yellow' },
    { key: 'confirmed', label: 'Đã xác nhận', color: 'blue' },
    { key: 'shipping', label: 'Đang giao hàng', color: 'orange' },
    { key: 'delivered', label: 'Đã giao', color: 'green' },
  ];
  ```
  - Show checkmark for completed steps
  - Pulsing dot for current step
  - Gray for pending steps
  - For 'shipping': show mock shipper info "Nguyễn Văn A - 0912345678"
- Order details cards:
  * Products list
  * Shipping address
  * Payment info + amount
- Cancel button:
  - Only show if status === 'pending'
  - Confirm dialog: "Bạn có chắc muốn hủy đơn #[orderId]?"
  - On confirm: update order.status = 'cancelled', update localStorage

SIMULATE STATUS UPDATES (for demo):
- Add hidden button (dev only) to cycle through statuses for testing

RESPONSIVE:
- Mobile: stack all sections vertically

Use shadcn: Input, Button, Card, Badge, AlertDialog.
Use lucide-react icons: Package, Truck, CheckCircle.
```

---

## ✅ Acceptance Criteria (Phase 2 Complete When)

### Shopping Cart
- [ ] Cart icon in header shows item count badge
- [ ] Click cart icon → opens cart sheet (slide-out right on desktop, slide-up on mobile)
- [ ] Cart displays all items with thumbnail, name, price, quantity
- [ ] Quantity picker: +/- buttons work, input editable, validates (min 1, max stock)
- [ ] Update quantity → subtotal updates instantly
- [ ] Remove item → shows confirm dialog, removes on confirm
- [ ] Empty cart state displays with CTA
- [ ] Cart persists in localStorage across page refresh
- [ ] "Tiến hành thanh toán" button navigates to checkout
- [ ] "Tiếp tục mua sắm" closes cart sheet

### Product Detail Integration
- [ ] "Thêm vào giỏ" button enabled (not disabled from Phase 1)
- [ ] Click add to cart → product added, toast shown, cart sheet opens
- [ ] "Mua ngay" button → adds to cart and goes directly to checkout
- [ ] Out of stock products: button disabled, shows "Hết hàng"

### Checkout Step 1 (Shipping)
- [ ] Redirect to homepage if cart empty
- [ ] Progress indicator shows step 1 active
- [ ] Form renders with all fields (name, phone, email, address, city, district)
- [ ] City dropdown populated with Vietnamese cities
- [ ] District dropdown updates based on city selection
- [ ] Real-time validation on blur (errors show below fields)
- [ ] Required fields marked with red asterisk
- [ ] "Tiếp tục" button disabled if form invalid
- [ ] Order summary sidebar shows cart items, subtotal, total
- [ ] Submit form → saves shipping info → navigates to step 2
- [ ] Mobile: summary collapsible at top

### Checkout Step 2 (Payment)
- [ ] Redirect to step 1 if no shipping info
- [ ] Progress shows step 1 done (checkmark), step 2 active
- [ ] Shipping address recap displays correctly
- [ ] "Thay đổi" link goes back to step 1 (preserves data)
- [ ] Payment method radio group: COD default selected
- [ ] Select bank transfer → bank details card appears
- [ ] Shipping fee calculated correctly (HN/HCM: 30k, others: 50k)
- [ ] Order note textarea functional
- [ ] Order summary updates with shipping fee
- [ ] "Quay lại" → step 1, "Tiếp tục" → saves payment info → step 3

### Checkout Step 3 (Review)
- [ ] Redirect to step 2 if no payment method
- [ ] Progress shows steps 1-2 done, step 3 active
- [ ] All review sections display: shipping, payment, products
- [ ] "Chỉnh sửa" links navigate to respective steps
- [ ] Final order summary shows all items, subtotal, shipping, total
- [ ] Estimated delivery date calculated (2-3 days from now)
- [ ] Terms checkbox functional
- [ ] "Đặt hàng" button disabled until checkbox checked
- [ ] Submit order:
  - [ ] Shows loading state
  - [ ] Generates unique order ID
  - [ ] Saves order to localStorage
  - [ ] Clears cart
  - [ ] Navigates to confirmation page

### Order Confirmation
- [ ] Gets order ID from URL query param
- [ ] Fetches and displays order from localStorage
- [ ] Success animation plays (checkmark + optional confetti)
- [ ] Order ID displayed large with copy button (copies to clipboard)
- [ ] Order summary collapsible with all details
- [ ] Next steps section:
  - [ ] COD: shows cash preparation message
  - [ ] Bank transfer: shows bank details + contact info
- [ ] Estimated delivery date shown
- [ ] "Theo dõi đơn hàng" button navigates to tracking page
- [ ] "Tiếp tục mua sắm" button goes to homepage

### Order Tracking
- [ ] Tracking form renders with order ID + phone fields
- [ ] Submit form → fetches order from localStorage
- [ ] If not found: shows error message
- [ ] If found: updates URL with query params, shows order detail
- [ ] Order timeline displays with correct status progression
- [ ] Current status highlighted with pulsing animation
- [ ] Completed statuses show green checkmarks
- [ ] Order details cards display: items, shipping, payment
- [ ] Cancel button:
  - [ ] Only shows if status = 'pending'
  - [ ] Confirm dialog appears on click
  - [ ] Updates order status to 'cancelled' in localStorage
- [ ] Mobile: all sections stack vertically

### Cross-cutting (Phase 2)
- [ ] All localStorage operations have try-catch error handling
- [ ] Toasts show for key actions (added to cart, order placed, etc.)
- [ ] Loading states during async operations
- [ ] Form validation messages clear and helpful
- [ ] No console errors
- [ ] Mobile responsive (tested 375px, 768px, 1024px)
- [ ] Checkout flow can be completed start-to-finish
- [ ] Can place multiple orders without issues
- [ ] Cart persists correctly across page refreshes
- [ ] Order data persists in localStorage

---

## 🎯 Success Metrics (Phase 2)

Track these before moving to Phase 3:

- [ ] Can complete full purchase flow (browse → cart → checkout → order)
- [ ] Can place order as guest (no account needed)
- [ ] Can track order using order ID + phone
- [ ] Cart persists across browser sessions
- [ ] Checkout form validation works correctly
- [ ] Order confirmation displays all info correctly
- [ ] 0 critical bugs in purchase flow
- [ ] 3+ people complete test purchases successfully
- [ ] Feedback: "Checkout was easy/intuitive"

**Key Metrics:**
- Cart abandonment rate (how many add to cart vs complete order)
- Average time to complete checkout
- Payment method preference (COD vs bank transfer)
- Mobile vs desktop checkout rate

---

## 🚧 Known Limitations (Accept for Phase 2)

- No user accounts yet (all orders are guest orders)
- No saved addresses
- No order history page for users
- No email confirmations (only on-site)
- No real payment gateway (manual bank transfer)
- No inventory deduction (stock is static)
- Status updates are manual (no auto-tracking)
- Single shipping method (no express option)
- No promo codes/discounts

---

## 📝 Handoff to Phase 3

Before starting Phase 3, ensure:
1. ✅ All Phase 2 acceptance criteria met
2. ✅ Can complete full purchase flow without bugs
3. ✅ Cart and order data persists correctly
4. ✅ Mobile checkout tested on real devices
5. ✅ At least 5 test orders placed successfully
6. ✅ User feedback: checkout flow is clear

**Issues to watch:**
- localStorage quota (if many test orders, consider cleanup)
- Form validation edge cases
- Mobile UX friction points

**Ready for Phase 3?** → Open `03_PRD_Phase3_Account.md`

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-06 | 1.0 | Phase 2 PRD created with purchase flow |