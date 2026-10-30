# 🌟 LFit - Hệ Thống Gợi Ý Phối Đồ Thời Trang Thông Minh

> Nền tảng Virtual Stylist hỗ trợ người dùng phân tích dáng người, sở thích màu sắc và gợi ý các bộ trang phục (Outfit) tối ưu theo từng ngữ cảnh thời tiết, sự kiện và lối sống.

---

## 📋 Mục lục
1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Cấu trúc dự án](#2-cấu-trúc-dự-án)
3. [Cấu hình biến môi trường](#3-cấu-hình-biến-môi-trường)
4. [Cài đặt và Khởi chạy](#4-cài-đặt-và-khởi-chạy)
5. [Tài liệu API (Swagger UI)](#5-tài-liệu-api-swagger-ui)
6. [Tài khoản quản trị mẫu](#6-tài-khoản-quản-trị-mẫu)

---

## 1. Yêu cầu hệ thống
Để cài đặt và chạy mượt mà dự án, máy tính cần cài sẵn:
- **Node.js:** Phiên bản `>= 18.x` hoặc `20.x` LTS.
- **npm:** Đi kèm với Node.js (`>= 9.x`).
- **MongoDB:** Cụm MongoDB Atlas (Cloud) hoặc MongoDB Server cục bộ (`>= 6.0`).
- **Trình duyệt web:** Chrome, Edge, Firefox phiên bản hiện đại.

---

## 2. Cấu trúc dự án
```text
Web_LFit/
├── backend/                  # Máy chủ API Node.js/Express
│   ├── scripts/              # Script tiện ích (tạo admin, seed dữ liệu)
│   ├── src/
│   │   ├── config/           # Cấu hình kết nối DB
│   │   ├── middleware/       # JWT Auth, xử lý lỗi toàn cục
│   │   ├── models/           # Mongoose Schemas (User, Catalog, Outfit,...)
│   │   ├── routes/           # Khai báo Endpoint API & Swagger docs
│   │   ├── services/         # Toàn bộ Business Logic & Thuật toán gợi ý
│   │   ├── app.js            # Cấu hình Express app
│   │   └── server.js         # Entry point khởi động server
│   ├── .env                  # Biến môi trường Backend
│   └── package.json
│
├── frontend/                 # Giao diện người dùng React + Vite
│   ├── public/               # Static assets, favicon, SVG icons
│   ├── src/
│   │   ├── assets/           # Hình ảnh giao diện
│   │   ├── components/       # Header, Footer dùng chung
│   │   ├── context/          # AuthContext quản lý đăng nhập
│   │   ├── pages/
│   │   │   ├── admin/        # Trang Dashboard, Catalog, Users, Predefined Outfits
│   │   │   └── user/         # Home, Login, Register, Profile, Recommendation,...
│   │   ├── routes/           # ProtectedRoute, AdminRoute
│   │   ├── services/         # Axios API client
│   │   ├── App.jsx           # Cấu hình Routing
│   │   └── main.jsx          # Entry point React
│   ├── .env                  # Biến môi trường Frontend (tuỳ chọn)
│   ├── vite.config.js
│   └── package.json
```

---

## 3. Cấu hình biến môi trường

### 3.1. Cấu hình Backend (`backend/.env`)
Tạo hoặc kiểm tra file `.env` nằm trong thư mục `backend/` với nội dung:
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/lfit?retryWrites=true&w=majority
JWT_SECRET=lfit_super_secret_jwt_key_2026_change_in_production
```
*(Nếu dùng Mongo cục bộ, đổi `MONGO_URI=mongodb://localhost:27017/lfit`)*.

### 3.2. Cấu hình Frontend (`frontend/.env`)
Tạo file `.env` trong thư mục `frontend/` (mặc định nếu không tạo sẽ dùng `http://localhost:3000/api`):
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 4. Cài đặt và Khởi chạy

### Bước 1: Khởi động Backend
Mở cửa sổ Terminal thứ nhất:
```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Tạo tài khoản Admin đầu tiên (làm theo hướng dẫn trên màn hình)
node scripts/create-admin.js

# 4. Chạy Backend ở chế độ phát triển
npm run dev
```
> Khi màn hình hiển thị:  
> `MongoDB connected successfully`  
> `LFit server is running on port 3000`  
> là Backend đã sẵn sàng!

---

### Bước 2: Khởi động Frontend
Mở cửa sổ Terminal thứ hai:
```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt thư viện giao diện
npm install

# 3. Chạy Frontend ở chế độ dev
npm run dev
```
> Màn hình hiển thị: `Local: http://localhost:5173/`.  
> Mở trình duyệt và truy cập: **`http://localhost:5173`**.

---

## 5. Tài liệu API (Swagger UI)
Hệ thống tích hợp sẵn OpenAPI 3.0. Khi backend đang chạy, truy cập đường dẫn sau để test trực tiếp tất cả API:  
🔗 **`http://localhost:3000/api-docs`**

---

## 6. Phân quyền tài khoản
- **Người dùng khách (Guest):** Xem danh sách trang phục công khai trên trang chủ, xem chi tiết sản phẩm.
- **Người dùng (USER):** Đăng ký, thiết lập số đo Profile, nhận gợi ý phối đồ cá nhân hóa, lưu Draft, chỉnh sửa sản phẩm trong bộ đồ, chuyển thành Final và công khai bộ đồ.
- **Quản trị viên (ADMIN):** Quản lý kho Catalog (Thêm/Sửa/Tắt món đồ, upload ảnh tự động nén WebP), Quản lý người dùng, Xem thống kê Dashboard và Tự động sinh Predefined Outfits mẫu.
