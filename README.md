# 🧃 ตู้จำหน่ายสินค้าอัตโนมัติ (Vending Machine)

ระบบตู้จำหน่ายสินค้าอัตโนมัติ เขียนด้วย **Next.js** เป็น Frontend และ **Laravel** เป็น Backend โดยเชื่อมต่อกันผ่าน API พร้อมระบบ Docker Compose สำหรับการรันแบบ containerized ได้ทันที

---

## 🛠 เทคโนโลยีที่ใช้

- 🧩 **Frontend:** Next.js 14+, React, Tailwind CSS
- ⚙️ **Backend:** Laravel 10+, PHP 8.2+, MySQL
- 🐳 **DevOps:** Docker, Docker Compose

---

## 🚀 วิธีใช้งาน (ด้วย Docker)

### คำสั่งเริ่มต้น
```bash
# สร้าง container และเริ่มระบบทั้งหมด
docker compose up --build

### โปรดรอ
หลังจากที่รัน Docker และติดตั้งระบบเรียบร้อยแล้ว ผู้ใช้สามารถตรวจสอบว่าแอปพลิเคชันพร้อมใช้งานได้ด้วยวิธีดังนี้:
INFO  Server running on [http://0.0.0.0:8000]

Frontend (Next.js): http://localhost:3000
Frontend-Admin (Next): http://localhost:3000/admin
Backend API (Laravel): http://localhost:8000/api/product
