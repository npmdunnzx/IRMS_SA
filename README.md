# IRMS - Restaurant Management System

Một ứng dụng quản lý nhà hàng hiện đại được xây dựng với React, Vite, TailwindCSS và TypeScript.

## Yêu cầu hệ thống

- **Node.js**: phiên bản 18.0.0 trở lên
- **npm**: phiên bản 9.0.0 trở lên (hoặc yarn/pnpm)

## Cài đặt

### 1. Clone hoặc tải down dự án

```bash
# Nếu sử dụng Git
git clone <repo-url>
cd IRMS
```

### 2. Cài đặt dependencies

```bash
npm install
```
### TypeScript errors

Đảm bảo `@types/react` và `@types/react-dom` đã được cài:

```bash
npm install -D @types/react @types/react-dom
```

Hoặc nếu sử dụng yarn/pnpm:

```bash
yarn install
# hoặc
pnpm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env.local` tại thư mục gốc dự án và thêm các biến cần thiết:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

- Lấy Gemini API key tại: https://ai.google.dev/

## Chạy dự án

### Chế độ Development

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

- Server sẽ tự động hot-reload khi bạn thay đổi code
- Mở trình duyệt và truy cập địa chỉ trên để xem ứng dụng

### Build cho Production

```bash
npm run build
```

Lệnh này sẽ:

- Compile TypeScript
- Bundle code với Vite
- Tối ưu hóa cho production
- Output vào thư mục `dist/`

### Preview bản build

```bash
npm run preview
```

Xem trước bản build production tại: `http://localhost:4173`

### Kiểm tra TypeScript

```bash
npm run lint
```

Kiểm tra lỗi TypeScript mà không cần build toàn bộ dự án.

### Dọn dẹp

```bash
npm run clean
```

Xóa thư mục `dist/` (kết quả build).

## Cấu trúc dự án

```
IRMS/
├── src/
│   ├── components/       # Các component React dùng lại
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── pages/           # Các trang chính của ứng dụng
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── Kitchen.tsx
│   │   ├── Login.tsx
│   │   ├── Reports.tsx
│   │   ├── Tables.tsx
│   │   └── table.css
│   ├── App.tsx          # Component chính
│   ├── index.css        # CSS toàn cục
│   └── main.tsx         # Entry point
├── public/              # Assets tĩnh
├── dist/                # Output build (được tạo sau khi build)
├── package.json         # Dependencies và scripts
├── tsconfig.json        # Cấu hình TypeScript
├── vite.config.ts       # Cấu hình Vite
└── README.md            # File này
```

## Công nghệ sử dụng

- **React** 19.0.1 - UI library
- **TypeScript** 5.8.2 - Ngôn ngữ lập trình
- **Vite** 6.2.3 - Build tool & dev server
- **TailwindCSS** 4.1.14 - Utility-first CSS framework
- **React Router** 7.15.0 - Routing
- **Lucide React** 0.546.0 - Icon library
- **Motion** 12.23.24 - Animation library
- **Google Generative AI** - Gemini API integration

## Troubleshooting

### Port 3000 đã được sử dụng

Thay đổi port trong lệnh dev:

```bash
npm run dev -- --port 3001
```


## Liên kết hữu ích

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Google Generative AI](https://ai.google.dev)

