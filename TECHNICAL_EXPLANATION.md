# 📖 BÁO CÁO GIẢI THÍCH KỸ THUẬT HỆ THỐNG LFIT

## 1. KIẾN TRÚC TỔNG THỂ & TECH STACK

Hệ thống được thiết kế theo mô hình **Client - Server (Decoupled Architecture)** giúp phân tách hoàn toàn tầng hiển thị và tầng xử lý nghiệp vụ:

### 1.1. Frontend (React 19 + Vite 8)
- **Vite:** Công cụ Build tool siêu tốc, biên dịch ESM native.
- **React 19 & React Router DOM v7:** Quản lý cây component phân cấp, phân luồng bằng `ProtectedRoute` (yêu cầu đăng nhập) và `AdminRoute` (yêu cầu role `ADMIN`).
- **Context API (`AuthContext`):** Quản lý phiên đăng nhập tập trung, tự động phục hồi token từ `localStorage` và gọi `/api/auth/me` để đồng bộ trạng thái khi tải lại trang (`F5`).
- **Axios Client Interceptors:** Đính kèm header `Authorization: Bearer <token>` vào mọi request tự động; unwrap lỗi chuẩn từ server trả về.

### 1.2. Backend (Node.js + Express 5)
- **Express 5:** Web framework tối ưu xử lý bất đồng bộ.
- **MongoDB & Mongoose 9:** Cơ sở dữ liệu hướng tài liệu (NoSQL), hỗ trợ Schema validation, chỉ mục đa trường (Compound indexes).
- **Sharp & MongoDB GridFS:** Xử lý media độc lập. Hình ảnh tải lên được nén chuẩn WebP chất lượng 82%, kích thước $1200 \times 1200$, sau đó ghi vào GridFS Bucket (`images.files`, `images.chunks`).
- **Swagger JSDoc & Swagger UI:** Tự động tạo tài liệu đặc tả API chuẩn OpenAPI 3.0.

---

## 2. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMAS)

1. **`User`:** Lưu `name`, `email` (unique), `passwordHash` (mã hóa bcrypt salt 10 vòng), `role` (`USER` hoặc `ADMIN`).
2. **`UserProfile`:** Lưu liên kết 1-1 với `userId`. Gồm số đo `height`, `weight`, `bust`, `waist`, `hip`, dáng người tính toán `bodyShape`, và mảng màu sắc yêu thích `favoriteColors` (chuẩn hóa lowercase).
3. **`CatalogItem`:** Kho sản phẩm thời trang. Gồm `category` (`top`, `bottom`, `shoes`, `accessory`), `name`, `color` (lowercase), `imageId` (GridFS), `imageUrl` (link ngoài), và 6 mảng tiêu chí: `shapes`, `cases`, `styles`, `seasons`, `weathers`, `lifestyles`. Đánh chỉ mục `{ category: 1, isActive: 1 }`.
4. **`UserOutfit`:** Bộ trang phục đã lưu. Lưu ngữ cảnh phối đồ, `recommendationGroupId`, `status` (`DRAFT` hoặc `FINAL`), cờ `isPublic`, `isPreDefined`.
5. **`OutfitItem`:** Lưu từng món đồ trong 1 bộ outfit. Liên kết `outfitId`, `catalogId`, `category`, `name`, `color`, `imageId`, `imageUrl`.

---

## 3. CƠ CHẾ & THUẬT TOÁN CỐT LÕI (CORE ALGORITHMS)

### 3.1. Thuật toán xác định Dáng Người (`bodyShape.service.js`)
Dựa trên tỷ lệ số đo 3 vòng (Ngực - Eo - Mông):
$$\text{bustHipDiff} = |\text{bust} - \text{hip}|, \quad \text{bustWaistDiff} = \text{bust} - \text{waist}, \quad \text{hipWaistDiff} = \text{hip} - \text{waist}$$

- **Đồng hồ cát (`hourglass`):** $\text{bustHipDiff} \le 5\text{ cm}$ VÀ $\text{bustWaistDiff} \ge 18\text{ cm}$ VÀ $\text{hipWaistDiff} \ge 18\text{ cm}$.
- **Quả lê (`pear`):** $\text{hip} - \text{bust} \ge 5\text{ cm}$ (Hông nở nang hơn ngực đáng kể).
- **Tam giác ngược (`inverted-triangle`):** $\text{bust} - \text{hip} \ge 5\text{ cm}$ (Vai/ngực rộng hơn hông).
- **Hình chữ nhật (`rectangle`):** $\text{bustHipDiff} \le 5\text{ cm}$ VÀ độ thắt eo nhỏ ($\text{bustWaistDiff} < 18\text{ cm}$).
- **Quả táo (`apple`):** Các trường hợp còn lại (Vòng 2 lớn, số đo eo tiệm cận hoặc lớn hơn ngực/mông).

---

### 3.2. Thuật toán Hòa Hợp Màu Sắc (`colorCompatibility.service.js`)
Dựa trên lý thuyết bánh xe màu sắc chuẩn 360° kết hợp nhóm màu trung tính:
1. **Nhóm trung tính (`neutral`):** `white`, `black`, `gray`, `beige`, `brown`.
   - Bất kỳ món đồ nào có màu trung tính phối với món khác đều đạt **điểm tuyệt đối (2 điểm)** vì màu trung tính luôn dễ phối.
2. **Khoảng cách góc trên bánh xe màu sắc ($\Delta\theta$):**
   - **Tương đồng (Analogous):** $\Delta\theta \le 60^\circ \implies 2\text{ điểm}$.
   - **Tương phản bổ sung (Complementary):** $150^\circ \le \Delta\theta \le 210^\circ \implies 2\text{ điểm}$.
   - **Khác biệt vừa phải:** $1\text{ điểm}$.
3. **Màu yêu thích:** Nếu món đồ trùng màu yêu thích của người dùng: $+2\text{ điểm}$; nếu phối hợp hài hòa với màu yêu thích: $+1\text{ đến }2\text{ điểm}$.

---

### 3.3. Thuật toán Đánh Giá & Sinh Trang Phục (`recommendation.service.js`)
Quy trình thực thi 4 giai đoạn tối ưu:
```text
[Catalog Active Items] 
        │
        ▼ (Giai đoạn 1: Chấm điểm từng món)
  Score = BodyShape(5đ) + Color(2đ) + Case(1đ) + Style(1đ) + Season(1đ) + Weather(1đ) + Lifestyle(1đ)
        │
        ▼ (Giai đoạn 2: Lọc linh hoạt có Fallback)
  Ngưỡng >= 8  ──(Nếu thiếu áo/quần/giày)──> Ngưỡng >= 5 ──(Nếu thiếu)──> Ngưỡng >= 1
        │
        ▼ (Giai đoạn 3: Cắt tỉa Pruning Top-K)
  Lấy Top 8 Áo, Top 8 Quần, Top 8 Giày, Top 5 Phụ kiện
        │
        ▼ (Giai đoạn 4: Ghép tổ hợp & Tính Color Harmony)
  Sinh tối đa 2.560 bộ; Tính ColorScore trung bình giữa các cặp món trong bộ
        │
        ▼
  TotalScore = ItemScore + ColorScore  ===>  Sort giảm dần  ===>  Phân trang (4 bộ/trang)
```

---

## 4. LUỒNG NGHIỆP VỤ (SYSTEM WORKFLOWS)

### 4.1. Luồng Xác thực (Authentication)
1. Người dùng gửi `email`, `password` lên `POST /api/auth/login`.
2. Server xác thực bcrypt hash, ký JWT chứa `userId` và `role`, thời hạn 1 giờ.
3. Client lưu token vào `localStorage`, cài đặt vào Header Axios `Authorization: Bearer <token>`.
4. Khi truy cập các route bảo vệ, `ProtectedRoute` kiểm tra trạng thái trong `AuthContext`.

### 4.2. Luồng Vòng đời Trang phục (Outfit Lifecycle)
1. **Sinh gợi ý (Recommendation):** Người dùng nhập tiêu chí -> Server trả danh sách gợi ý.
2. **Lưu Nháp (`DRAFT`):** Khi bấm "Save", một bộ đồ `DRAFT` được tạo kèm `recommendationGroupId`.
3. **Tùy biến Nháp (Edit):** Người dùng có thể đổi món khác từ Catalog trên trang `OutfitEdit`.
4. **Chốt Trang phục (`FINAL`):** Bấm "Finalize" -> Trạng thái đổi thành `FINAL`, hệ thống **tự động xóa sạch các bản nháp khác** trong cùng nhóm `recommendationGroupId` để giải phóng bộ nhớ.
5. **Chia sẻ công khai (`Visibility`):** Người dùng có thể bật/tắt `isPublic` để đưa bộ đồ lên Trang chủ cho cộng đồng xem.

### 4.3. Luồng Quản lý Media (GridFS Image Flow)
1. Admin chọn ảnh -> Client gửi `multipart/form-data` lên `POST /api/images/upload`.
2. Multer nhận file vào bộ nhớ đệm (`MemoryStorage`).
3. `sharp` nén thành ảnh WebP chuẩn 82% chất lượng, resize max 1200px.
4. Mở `bucket.openUploadStream` ghi thẳng vào MongoDB, trả về `imageId`.
5. Bất kỳ ai cần xem ảnh chỉ cần gọi `GET /api/images/:id`, server dùng `bucket.openDownloadStream(id).pipe(res)` kèm cache header `max-age=86400` (1 ngày).
