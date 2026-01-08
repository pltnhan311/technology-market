# Tính năng: Auto Scroll to Top khi điều hướng trang

## Mô tả

Tự động scroll lên đầu trang (top) mỗi khi người dùng điều hướng đến trang mới. Đây là tính năng UX chuẩn giúp người dùng luôn bắt đầu xem nội dung từ đầu trang.

## Vấn đề trước khi có tính năng

### ❌ Trải nghiệm xấu:
1. User scroll xuống giữa trang A
2. Click link đến trang B
3. Trang B load nhưng vẫn ở vị trí giữa trang (scroll position từ trang A)
4. User phải scroll lên thủ công để xem nội dung

**Ví dụ cụ thể:**
- Scroll xuống cuối trang Product Detail
- Click vào sản phẩm khác
- Trang mới load nhưng vẫn ở vị trí cuối
- Người dùng không thấy ảnh sản phẩm, tên sản phẩm ở đầu trang

## Giải pháp

### ✅ Auto Scroll to Top Component

Tạo component `ScrollToTop` sử dụng:
- `useLocation()` từ react-router-dom để theo dõi pathname
- `useEffect()` để scroll khi pathname thay đổi
- `window.scrollTo()` với `behavior: 'instant'` để scroll nhanh

## Implementation

### 1. **Component ScrollToTop** (`src/components/layout/ScrollToTop.tsx`)

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top instantly when pathname changes
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' as ScrollBehavior,
        });
    }, [pathname]);

    return null; // Component không render gì
}
```

**Giải thích:**
- `useLocation()` - Hook từ react-router-dom, trả về object chứa pathname hiện tại
- `pathname` - Đường dẫn URL (VD: `/`, `/product/iphone-15`, `/checkout`)
- `useEffect(..., [pathname])` - Chạy khi pathname thay đổi
- `window.scrollTo()` - Native browser API để scroll
- `behavior: 'instant'` - Scroll ngay lập tức (không smooth)
- `return null` - Component chỉ có side effect, không render UI

### 2. **Tích hợp vào App** (`src/App.tsx`)

```typescript
import { ScrollToTop } from '@/components/layout/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop /> {/* Đặt ngay sau BrowserRouter */}
            <Toaster />
            <Layout>
                <Routes>
                    {/* ... routes */}
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
```

**Vị trí quan trọng:**
- ✅ Phải nằm **bên trong** `<BrowserRouter>`
- ✅ Nên đặt **trước** các component khác
- ❌ Không được đặt bên ngoài BrowserRouter (useLocation sẽ lỗi)

## Cách hoạt động

### Luồng thực thi:

```
1. User ở trang A, scroll xuống (scrollY = 500px)
   ↓
2. Click link tới trang B
   ↓
3. React Router thay đổi pathname: "/" → "/product/abc"
   ↓
4. ScrollToTop component:
   - useEffect detect pathname changed
   - Gọi window.scrollTo({ top: 0 })
   ↓
5. Browser scroll lên đầu trang (scrollY = 0)
   ↓
6. Trang B render, user thấy nội dung từ đầu ✅
```

## Các trường hợp sử dụng

### ✅ Hoạt động với:

1. **Navigation giữa các trang**
   - Home → Category → Product → Checkout
   - Mỗi lần chuyển trang đều scroll về top

2. **Same route, khác params**
   - `/product/iphone-15` → `/product/samsung-s24`
   - Pathname khác nhau → Scroll to top

3. **Browser back/forward**
   - User nhấn nút Back/Forward
   - Pathname thay đổi → Scroll to top

4. **Programmatic navigation**
   - `navigate('/orders')`
   - `navigate(-1)`
   - Đều trigger scroll to top

### ❌ Không hoạt động với:

1. **Hash navigation trong cùng trang**
   - `/product#reviews` → `/product#specs`
   - Pathname không đổi → Không scroll

2. **Query params change**
   - `/search?q=phone` → `/search?q=laptop`
   - Pathname không đổi → Không scroll
   - (Có thể customize nếu cần)

## Tùy chỉnh nâng cao

### Option 1: Smooth Scroll

Nếu muốn scroll mượt thay vì instant:

```typescript
window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth', // Thay 'instant' → 'smooth'
});
```

**Lưu ý:** Smooth scroll có thể gây cảm giác chậm

### Option 2: Scroll với Query Params

Nếu muốn scroll cả khi query params thay đổi:

```typescript
export function ScrollToTop() {
    const location = useLocation(); // Lấy full location object

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [location.pathname, location.search]); // Watch cả pathname và search
}
```

### Option 3: Conditional Scroll

Scroll nhưng giữ lại position cho một số routes:

```typescript
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Không scroll nếu là trang search results
        // (User muốn giữ vị trí khi refine search)
        if (pathname.startsWith('/search')) {
            return;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [pathname]);

    return null;
}
```

### Option 4: Delay Scroll

Delay một chút để page render xong:

```typescript
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Delay 10ms để đợi page render
        const timeout = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
            });
        }, 10);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}
```

## Testing

### Test Cases:

#### ✅ Test 1: Basic Navigation
```
1. Vào trang Home
2. Scroll xuống footer
3. Click vào một category hoặc product
→ Trang mới mở ở position top ✅
```

#### ✅ Test 2: Product to Product
```
1. Vào Product Detail trang A
2. Scroll đến phần reviews (bottom)
3. Click "Sản phẩm liên quan" khác
→ Product Detail trang B mở ở top ✅
```

#### ✅ Test 3: Checkout Flow
```
1. Checkout step 1 (Shipping) - scroll xuống
2. Click "Tiếp tục" → Step 2 (Payment)
→ Step 2 mở ở top ✅
```

#### ✅ Test 4: Order History
```
1. Order History - scroll xuống cuối danh sách
2. Click "Xem chi tiết" một order
→ Order Detail mở ở top ✅
```

#### ✅ Test 5: Browser Back
```
1. Trang A → scroll xuống → vào trang B
2. Nhấn nút Back của browser
→ Quay về trang A ở top ✅
```

## Performance

### ⚡ Hiệu năng:

- **Component size:** ~300 bytes (minimal)
- **Re-render:** Chỉ khi pathname thay đổi
- **Scroll time:** Instant (~0ms với 'instant')
- **Impact:** Negligible (không đáng kể)

### 🎯 Best Practices:

1. ✅ Sử dụng `behavior: 'instant'` cho UX tốt nhất
2. ✅ Đặt component sớm trong tree (ngay sau BrowserRouter)
3. ✅ Return null để không tạo DOM node
4. ✅ Dependency chỉ là pathname (minimal re-run)

## Lợi ích

### 📱 User Experience:
- ✅ Luôn thấy nội dung từ đầu trang
- ✅ Tránh confusion khi trang mới load ở giữa
- ✅ Behavior nhất quán giống các website lớn
- ✅ Đặc biệt quan trọng trên mobile (viewport nhỏ)

### 💻 Developer Experience:
- ✅ Implement một lần, áp dụng toàn bộ app
- ✅ Không cần thêm code ở mỗi page
- ✅ Dễ customize nếu cần
- ✅ Ko conflict với các scroll behaviors khác

## Kết luận

Tính năng **Auto Scroll to Top** là một cải thiện UX quan trọng và dễ implement:

- 🎯 **Simple**: Chỉ 1 component nhỏ
- ⚡ **Fast**: Performance impact minimal
- 🎨 **Clean**: Không làm rối code base
- ✅ **Effective**: Cải thiện UX rõ rệt

**Current Status:** ✅ Đã implement và hoạt động
