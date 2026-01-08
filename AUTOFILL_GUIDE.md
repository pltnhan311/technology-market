# Hướng dẫn: Tự động điền thông tin thanh toán

## Tính năng

Khi bạn đã đăng nhập vào tài khoản, hệ thống sẽ **tự động điền** các thông tin cá nhân vào form thanh toán, bao gồm:

- ✅ Họ và tên
- ✅ Số điện thoại
- ✅ Email
- ✅ Địa chỉ giao hàng (nếu có)
- ✅ Tỉnh/Thành phố (nếu có)
- ✅ Quận/Huyện (nếu có)

## Cách sử dụng

### 1. Đăng nhập vào tài khoản

Trước khi thanh toán, hãy đảm bảo bạn đã đăng nhập vào tài khoản của mình.

### 2. Thêm sản phẩm vào giỏ hàng và tiến hành thanh toán

Khi bạn click vào "Thanh toán", form sẽ tự động được điền với thông tin từ tài khoản của bạn.

### 3. Kiểm tra và chỉnh sửa (nếu cần)

- Tất cả các trường thông tin vẫn có thể chỉnh sửa
- Bạn có thể thay đổi bất kỳ thông tin nào trước khi tiếp tục
- Thông tin được điền chỉ là gợi ý từ tài khoản của bạn

## Demo Users (Để test)

Hệ thống đã có sẵn các tài khoản demo với thông tin đầy đủ:

### User 1:
- **Email**: `nguyenvana@demo.com`
- **Password**: `demo12345`
- **Địa chỉ mặc định**: 123 Lê Lợi, Quận 1, TP. Hồ Chí Minh

### User 2:
- **Email**: `tranthib@demo.com`
- **Password**: `demo12345`
- **Địa chỉ mặc định**: 789 Hai Bà Trưng, Hoàn Kiếm, Hà Nội

## Lưu ý kỹ thuật

- Auto-fill chỉ hoạt động khi:
  - Bạn đã đăng nhập
  - Chưa có thông tin shipping được lưu từ lần checkout trước
- Nếu tài khoản có nhiều địa chỉ, hệ thống sẽ tự động chọn địa chỉ đầu tiên
- Trong tương lai, sẽ có tính năng chọn địa chỉ đã lưu

## Code Implementation

Auto-fill được thực hiện trong `ShippingForm.tsx`:

```typescript
useEffect(() => {
    if (user && !shippingInfo) {
        // Fill basic user info
        if (user.name) setValue('name', user.name);
        if (user.email) setValue('email', user.email);
        if (user.phone) setValue('phone', user.phone);

        // Fill address info from first saved address
        if (user.addresses && user.addresses.length > 0) {
            const firstAddress = user.addresses[0];
            if (firstAddress.address) setValue('address', firstAddress.address);
            if (firstAddress.city) setValue('city', firstAddress.city);
            if (firstAddress.district) setValue('district', firstAddress.district);
        }
    }
}, [user, shippingInfo, setValue]);
```
