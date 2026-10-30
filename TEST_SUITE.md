# 🧪 BỘ KỊCH BẢN KIỂM THỬ TOÀN DIỆN (FULL TEST SUITE)

---

## PHẦN 1: BẢN KIỂM THỬ GIAO DIỆN NGƯỜI DÙNG (FRONTEND UI TEST)

### Test Suite 1: Xác thực & Điều hướng (Auth & Routing)
| Mã | Chức năng | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **UI-01** | Đăng ký tài khoản mới | 1. Vào `/register`<br>2. Nhập Name: "Nguyen Van A", Email: "test@example.com", Pass: "12345678"<br>3. Bấm "Register" | Chuyển sang `/login` kèm thông báo thành công và tự điền email. |
| **UI-02** | Validation form đăng ký | 1. Nhập password < 8 ký tự<br>2. Bấm "Register" | Báo lỗi mật khẩu phải từ 8 ký tự trở lên. |
| **UI-03** | Đăng nhập User thường | 1. Vào `/login`<br>2. Nhập tài khoản User vừa tạo | Chuyển về trang chủ (`/`), Header hiển thị các menu: Home, Profile, Recommendation, History, Logout. |
| **UI-04** | Đăng nhập Admin | 1. Vào `/login`<br>2. Nhập tài khoản Admin | Tự động chuyển hướng vào `/admin`, Header hiển thị các menu: Dashboard, Catalog, Predefined Outfits, User Management, Logout. |
| **UI-05** | Phân quyền bảo vệ route | Khi chưa đăng nhập, gõ trực tiếp URL `/profile` hoặc `/admin` | Tự động bị redirect về `/login`. |
| **UI-06** | Menu Quản lý User của Admin | Đăng nhập Admin -> Bấm menu "User Management" | Mở đúng trang `/admin/users`, không bị văng về trang chủ. |

---

### Test Suite 2: Hồ sơ cá nhân & Tính Body Shape (Profile)
| Mã | Chức năng | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **UI-07** | Nhập số đo lần đầu | 1. Vào `/profile`<br>2. Nhập Cao: 165, Nặng: 52, Ngực: 88, Eo: 62, Mông: 90<br>3. Chọn màu: Black, Blue<br>4. Bấm "Create Profile" | Thông báo thành công. Hệ thống tự động tính ra BodyShape là **Hourglass** (Đồng hồ cát). |
| **UI-08** | Cập nhật màu & số đo | 1. Sửa màu: Tick thêm "Navy", bỏ "Black"<br>2. Bấm "Save Changes"<br>3. Nhấn F5 | Dữ liệu lưu thành công, trạng thái các ô checkbox màu được giữ nguyên vẹn. |

---

### Test Suite 3: Gợi ý trang phục (Recommendation)
| Mã | Chức năng | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **UI-09** | Tìm gợi ý trang phục | 1. Vào `/recommendation`<br>2. Chọn Occasion: "casual", Style: "basic", Season: "summer", Weather: "warm", Lifestyle: "student"<br>3. Bấm "Find Outfits" | Chuyển sang trang kết quả `/recommendation/result`. Hiển thị tối đa 4 bộ đồ mỗi trang, có điểm số, hình ảnh hiển thị rõ ràng. |
| **UI-10** | Phân trang kết quả gợi ý | Bấm nút "Next" / "Previous" ở trang kết quả | Chuyển trang mượt mà, bộ đồ trang sau không bị trùng lặp. |
| **UI-11** | Lưu bộ đồ ưng ý | Bấm "Save" tại một bộ đồ bất kỳ | Chuyển hướng sang `/outfits/history` kèm thông báo lưu thành công dạng `DRAFT`. |

---

### Test Suite 4: Lịch sử & Tùy biến trang phục (History & Edit)
| Mã | Chức năng | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **UI-12** | Đổi món đồ trong Draft | 1. Tại trang History, ở bộ đồ Draft bấm "Edit Draft"<br>2. Chọn danh mục "shoes"<br>3. Bấm "Select item" một đôi giày khác<br>4. Bấm "Save Changes" | Bộ đồ được cập nhật món mới thành công và quay lại trang History. |
| **UI-13** | Finalize bộ đồ | Bấm nút "Finalize" ở bộ đồ Draft | Trạng thái chuyển thành "Final Outfit", các bản nháp khác trong cùng nhóm tự động biến mất. Nút "Edit Draft" biến mất. |
| **UI-14** | Bật/Tắt công khai | Bấm nút "Make Public" tại bộ đồ Final | Trạng thái chuyển thành "Public". Mở tab ẩn danh vào trang chủ sẽ nhìn thấy bộ đồ này xuất hiện ở mục Public Outfits. |
| **UI-15** | Xóa bộ đồ | Bấm "Delete" -> Xác nhận popup confirm | Bộ đồ lập tức biến mất khỏi danh sách. |

---

### Test Suite 5: Quản trị viên (Admin Management)
| Mã | Chức năng | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **UI-16** | Xem Dashboard | Vào `/admin` | Hiển thị 6 thẻ thống kê: Tổng Users, Tổng Products, Active, Inactive, Predefined Outfits, User Outfits. Bấm "Refresh" cập nhật số liệu. |
| **UI-17** | Thêm sản phẩm Catalog | 1. Vào `/admin/catalog`<br>2. Bấm "+ Add Product"<br>3. Điền tên, màu, upload 1 file ảnh (JPG/PNG)<br>4. Tick các tiêu chí phù hợp -> Bấm "Create Product" | Sản phẩm mới hiển thị ngay trên danh sách với ảnh WebP thu nhỏ sắc nét. |
| **UI-18** | Tắt/Bật hoạt động sản phẩm | Bấm nút "Deactivate" tại 1 sản phẩm | Trạng thái chuyển sang "Inactive". Sản phẩm không còn xuất hiện khi User tìm kiếm ở ngoài. |
| **UI-19** | Tạo Predefined Outfits | 1. Vào `/admin/predefined-outfits`<br>2. Chọn tiêu chí -> Bấm "Generate Outfits" | Hệ thống tạo tự động các bộ đồ mẫu công khai cho cả 5 dáng người, hiển thị danh sách các bộ vừa tạo thành công. |
| **UI-20** | Tra cứu User | 1. Vào `/admin/users`<br>2. Nhập từ khóa tên/email vào ô tìm kiếm -> Bấm "Tìm kiếm" | Danh sách lọc chính xác tài khoản mong muốn kèm phân trang. |

---

## PHẦN 2: BẢN KIỂM THỬ API DOCS (SWAGGER / CURL TEST)

Kiểm thử trực tiếp trên giao diện Swagger: `http://localhost:3000/api-docs`

```text
LƯU Ý KHI TEST:
- Với các API cần quyền đăng nhập, lấy chuỗi token từ response của API Login.
- Bấm nút "Authorize" (ổ khóa màu xanh ở góc trên Swagger), điền theo định dạng:
  Bearer <chuỗi_token_của_bạn>
```

### 1. Nhóm API Xác thực (`Auth`)
- **API: `POST /api/auth/register`**
  - **Body test hợp lệ:**
    ```json
    { "name": "Test User", "email": "testuser@gmail.com", "password": "password123" }
    ```
  - **Expected:** Status `201 Created`, trả về thông tin user và JWT token.
  - **Test lỗi:** Gửi `email` đã tồn tại $\implies$ Status `409 Conflict`. Mật khẩu 5 ký tự $\implies$ Status `400 Bad Request`.

- **API: `POST /api/auth/login`**
  - **Body test:**
    ```json
    { "email": "testuser@gmail.com", "password": "password123" }
    ```
  - **Expected:** Status `200 OK`, trả về `token`.
  - **Test lỗi:** Sai mật khẩu $\implies$ Status `401 Unauthorized`.

- **API: `GET /api/auth/me`**
  - **Header:** `Authorization: Bearer <token>`
  - **Expected:** Status `200 OK`, trả về `{ user: { id, name, email, role } }`.

---

### 2. Nhóm API Hồ sơ (`Profile`)
- **API: `POST /api/profile`**
  - **Body test:**
    ```json
    {
      "height": 170, "weight": 60, "bust": 90, "waist": 65, "hip": 92,
      "favoriteColors": ["black", "navy", "white"]
    }
    ```
  - **Expected:** Status `201 Created`, trả về bodyShape tự tính là `"hourglass"`.

- **API: `GET /api/profile`**
  - **Expected:** Status `200 OK`, trả về thông tin hồ sơ kèm số đo và danh sách màu sắc chữ thường.

- **API: `PUT /api/profile`**
  - **Body test:** Cập nhật `waist: 75` $\implies$ Status `200 OK`, `bodyShape` tự động cập nhật lại theo số đo mới.

---

### 3. Nhóm API Gợi ý Trang phục (`Recommendation`)
- **API: `POST /api/recommendation`**
  - **Header:** `Authorization: Bearer <token_da_co_profile>`
  - **Body test:**
    ```json
    {
      "case": "casual",
      "style": "basic",
      "season": "summer",
      "weather": "warm",
      "lifestyle": "student",
      "page": 1
    }
    ```
  - **Expected:** Status `200 OK`, trả về mảng `recommendations` (tối đa 4 bộ), mỗi bộ gồm danh sách items kèm `itemScore`, `colorScore`, `totalScore`. Đi kèm object `pagination`.

---

### 4. Nhóm API Bộ đồ (`Outfits`)
- **API: `POST /api/outfits` (Lưu Draft)**
  - **Body test:**
    ```json
    {
      "criteria": { "case": "casual", "style": "basic", "season": "summer", "weather": "warm", "lifestyle": "student" },
      "outfit": { "items": [{ "id": "<catalog_item_id_1>" }, { "id": "<catalog_item_id_2>" }] },
      "recommendationGroupId": "group-uuid-1234"
    }
    ```
  - **Expected:** Status `201 Created`, outfit có `status: "DRAFT"`.

- **API: `PATCH /api/outfits/{id}/finalize`**
  - **Expected:** Status `200 OK`, `status` chuyển thành `"FINAL"`. Các outfit khác có cùng `recommendationGroupId` và status `DRAFT` bị xóa.

- **API: `PATCH /api/outfits/{id}/visibility`**
  - **Body test:** `{ "isPublic": true }`
  - **Expected:** Status `200 OK`, `isPublic: true`.

- **API: `GET /api/outfits/public`**
  - Không cần token. Trả về danh sách trang phục `FINAL` đang ở chế độ `isPublic: true`.

---

### 5. Nhóm API Quản trị (`Admin`)
- **API: `GET /api/admin/dashboard`**
  - **Header:** Token của tài khoản có `role: "ADMIN"`.
  - **Expected:** Status `200 OK`, trả về các con số thống kê tổng quát của toàn hệ thống.
  - **Test lỗi:** Sử dụng token của User thường $\implies$ Status `403 Forbidden` ("Admin access required").

- **API: `POST /api/images/upload`**
  - **Content-Type:** `multipart/form-data`, file key `image`.
  - **Expected:** Status `201 Created`, trả về `{ imageId: "...", contentType: "image/webp" }`.

- **API: `GET /api/images/{id}`**
  - **Expected:** Trả về file ảnh trực tiếp (nhìn thấy ảnh trên trình duyệt) với header `Content-Type: image/webp` và `Cache-Control: public, max-age=86400`.
