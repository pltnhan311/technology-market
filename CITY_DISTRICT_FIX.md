# Sửa lỗi: Lưu và hiển thị Tỉnh/Thành phố, Quận/Huyện

## Vấn đề

Trước đây, hệ thống lưu **nhãn hiển thị** (VD: "TP. Hồ Chí Minh", "Quận 1") thay vì **mã giá trị** (VD: "ho-chi-minh", "district-1") khi tạo đơn hàng. Điều này gây ra vấn đề:

1. ❌ Không thể tự động điền lại form thanh toán với địa chỉ đã lưu
2. ❌ Không thể search/filter theo tỉnh thành
3. ❌ Khó khăn trong việc chuẩn hóa dữ liệu

## Giải pháp

### 1. **Cập nhật cấu trúc lưu trữ** (`ReviewOrderForm.tsx`)

Thay đổi cách lưu `shippingAddress` trong order:

**Trước:**
```typescript
shippingAddress: {
    address: shippingInfo.address,
    district: districtLabel,  // ❌ "Quận 1"
    city: cityLabel,          // ❌ "TP. Hồ Chí Minh"
}
```

**Sau:**
```typescript
shippingAddress: {
    id: `addr_${Date.now()}`,
    name: shippingInfo.name,
    phone: shippingInfo.phone,
    address: shippingInfo.address,
    district: shippingInfo.district, // ✅ "district-1"
    city: shippingInfo.city,         // ✅ "ho-chi-minh"
    isDefault: false,
}
```

### 2. **Thêm logic chuyển đổi khi hiển thị** (`OrderDetailPage.tsx`)

Khi hiển thị thông tin đơn hàng, chuyển đổi từ mã giá trị sang nhãn:

```typescript
// Convert city and district values to labels for display
const cityLabel = CITIES.find((c) => c.value === order.shippingAddress.city)?.label 
    || order.shippingAddress.city;
const districtLabel = DISTRICTS[order.shippingAddress.city]?.find((d) => d.value === order.shippingAddress.district)?.label 
    || order.shippingAddress.district;
```

### 3. **Tương thích ngược**

Code sử dụng fallback `|| order.shippingAddress.city` để đảm bảo:
- ✅ Dữ liệu cũ (có label) vẫn hiển thị được
- ✅ Dữ liệu mới (có value) hiển thị đúng

## Lợi ích

### ✅ Tự động điền form
Bây giờ khi auto-fill, city và district sẽ được điền chính xác với dropdown đúng giá trị

### ✅ Chuẩn hóa dữ liệu
- Dữ liệu được lưu dưới dạng code chuẩn
- Dễ dàng filter, search, và xử lý
- Hỗ trợ đa ngôn ngữ trong tương lai

### ✅ Tương thích với ShippingAddress interface
Giờ đây `Order.shippingAddress` đầy đủ các field theo interface:
```typescript
interface ShippingAddress {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;        // Value code
    district: string;    // Value code
    isDefault: boolean;
}
```

## Files đã thay đổi

1. ✏️ `src/components/checkout/ReviewOrderForm.tsx`
   - Lưu city/district values thay vì labels
   - Thêm đầy đủ fields cho ShippingAddress

2. ✏️ `src/pages/OrderDetailPage.tsx`
   - Import CITIES và DISTRICTS
   - Convert values sang labels khi hiển thị
   - Hiển thị name/phone từ shippingAddress thay vì chỉ từ user

## Migration Notes

**Dữ liệu cũ:**
- Các đơn hàng đã tạo trước khi update này sẽ có city/district là labels
- Code đã được xử lý để fallback về label nếu không tìm thấy value match
- Không cần migration script

**Dữ liệu mới:**
- Tất cả đơn hàng mới sẽ lưu value codes
- Auto-fill sẽ hoạt động chính xác
- Có thể search/filter theo city code

## Test Cases

### ✅ Test 1: Tạo đơn hàng mới
1. Đăng nhập → Thêm sản phẩm vào giỏ
2. Thanh toán → Chọn TP.HCM, Quận 1
3. Kiểm tra localStorage → city: "ho-chi-minh", district: "district-1"

### ✅ Test 2: Xem chi tiết đơn hàng
1. Vào trang order detail
2. Kiểm tra hiển thị → "TP. Hồ Chí Minh", "Quận 1"

### ✅ Test 3: Auto-fill sau khi đã có đơn
1. Đăng xuất → Đăng nhập lại
2. Vào checkout
3. Kiểm tra form đã điền sẵn city và district đúng
