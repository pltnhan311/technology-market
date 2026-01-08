# Sửa lỗi: Đặt hàng không thấy thông báo và không hiển thị trong Order History

## Vấn đề

Khi user đặt hàng:
1. ❌ Không có thông báo thành công/thất bại
2. ❌ Không thấy đơn hàng trong Order History
3. ❌ Không rõ đơn hàng có được tạo thành công hay không

## Nguyên nhân

### 1. **Thiếu Toaster Component**
- App không có `<Toaster />` từ `react-hot-toast`
- Tất cả các `toast.success()` và `toast.error()` không hiển thị được

### 2. **Order không có userId**
- Khi tạo order, không lưu `userId` của user đang đăng nhập
- `OrderHistoryPage` filter orders theo `userId`
- Kết quả: Không tìm thấy order nào khớp với userId

```typescript
// ❌ Trước
const order = {
    id: orderId,
    guestInfo: { ... },
    // Thiếu userId!
}

// OrderHistoryPage filter
const userOrders = allOrders.filter((order) => order.userId === user?.id);
// → Không tìm thấy order nào vì order.userId undefined
```

## Giải pháp

### 1. **Thêm Toaster Component** (`App.tsx`)

```typescript
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    success: { ... },
                    error: { ... },
                }}
            />
            <Layout>
                ...
            </Layout>
        </BrowserRouter>
    );
}
```

**Kết quả:**
- ✅ Hiển thị toast "Đặt hàng thành công!" khi order được tạo
- ✅ Hiển thị toast lỗi nếu có vấn đề
- ✅ User feedback tức thì

### 2. **Thêm userId vào Order** (`ReviewOrderForm.tsx`)

```typescript
import { useAuthStore } from '@/store/authStore';

export function ReviewOrderForm() {
    const { user } = useAuthStore();
    
    const handlePlaceOrder = async () => {
        const order = {
            id: orderId,
            ...(user && { userId: user.id }), // ✅ Thêm userId nếu user đã login
            guestInfo: { ... },
            // ...
        };
    };
}
```

**Kết quả:**
- ✅ Order có `userId` của user đăng nhập
- ✅ OrderHistoryPage tìm thấy orders
- ✅ User xem được lịch sử đơn hàng

## Luồng hoàn chỉnh sau khi sửa

### Logged-in User Flow:

1. **User đặt hàng** → Click "Đặt hàng"
2. **Order được tạo** với `userId`
3. **Toast hiển thị** "Đặt hàng thành công!" ✅
4. **Navigate** đến `/order-confirmation`
5. **Xem Order History** → Thấy đơn hàng ✅

### Guest User Flow:

1. **Guest đặt hàng** (không đăng nhập)
2. **Order được tạo** KHÔNG có `userId`
3. **Toast hiển thị** "Đặt hàng thành công!" ✅
4. **Navigate** đến `/order-confirmation`
5. **Tracking** qua số điện thoại

## Test Cases

### ✅ Test 1: Logged-in user đặt hàng
```
1. Đăng nhập: nguyenvana@demo.com / demo12345
2. Thêm sản phẩm vào giỏ
3. Checkout → Điền form → Đặt hàng
4. Kiểm tra:
   - Toast "Đặt hàng thành công!" hiển thị ✅
   - Redirect đến order-confirmation ✅
   - Vào /orders → Thấy đơn hàng mới ✅
5. localStorage → order có userId ✅
```

### ✅ Test 2: Guest user đặt hàng
```
1. KHÔNG đăng nhập
2. Thêm sản phẩm → Checkout
3. Điền đầy đủ thông tin → Đặt hàng
4. Kiểm tra:
   - Toast "Đặt hàng thành công!" hiển thị ✅
   - Redirect đến order-confirmation ✅
   - Tracking qua phone number hoạt động ✅
5. localStorage → order KHÔNG có userId ✅
```

### ✅ Test 3: Toast notifications
```
1. Đặt hàng thành công → Toast xanh "Đặt hàng thành công!"
2. Thêm vào giỏ → Toast "Đã thêm vào giỏ hàng"
3. Lỗi xảy ra → Toast đỏ với message lỗi
4. Duration: 3s (success), 4s (error)
5. Position: top-center
```

## Files đã thay đổi

### 1. `src/App.tsx`
- ✅ Import và thêm `<Toaster />` component
- ✅ Cấu hình toast options (position, duration, colors)

### 2. `src/components/checkout/ReviewOrderForm.tsx`
- ✅ Import `useAuthStore`
- ✅ Lấy user từ auth state
- ✅ Thêm `userId` vào order object khi user đã login

## Lưu ý quan trọng

### Conditional userId
Sử dụng spread operator với điều kiện:
```typescript
...(user && { userId: user.id })
```

Điều này đảm bảo:
- ✅ Nếu user đăng nhập → order có `userId`
- ✅ Nếu guest → order KHÔNG có field `userId` (không undefined)
- ✅ Tương thích với Order interface (userId?: string)

### Toast Configuration
```typescript
toastOptions={{
    duration: 3000,        // Default
    success: { duration: 3000 },  // Success toast
    error: { duration: 4000 },    // Error có thời gian lâu hơn
}}
```

## Kết luận

Sau khi sửa, user experience được cải thiện đáng kể:

**Trước:**
- 😕 Đặt hàng xong không biết thành công hay thất bại
- 😕 Vào order history không thấy gì
- 😕 Phải check localStorage để biết order có được tạo không

**Sau:**
- ✅ Toast notification rõ ràng
- ✅ Order history hiển thị đầy đủ
- ✅ User experience mượt mà và chuyên nghiệp
- ✅ Phân biệt rõ logged-in vs guest orders
