# 🧃 ตู้จำหน่ายสินค้าอัตโนมัติ (Vending Machine)

ระบบตู้จำหน่ายสินค้าอัตโนมัติ เขียนด้วย **Next.js** เป็น Frontend และ **Laravel** เป็น Backend โดยเชื่อมต่อกันผ่าน API พร้อมระบบ Docker Compose สำหรับการรันแบบ containerized ได้ทันที

---

## 🛠 เทคโนโลยีที่ใช้

- 🧩 **Frontend:** Next.js 14+, React, Tailwind CSS
- ⚙️ **Backend:** Laravel 10+, PHP 8.2+, MySQL
- 🐳 **DevOps:** Docker, Docker Compose

---

## 🚀 วิธีใช้งาน (ด้วย Docker)
# ขั้นตอนการเริ่มต้น
# 1. Clone repository: Clone โปรเจคจาก Git repository โดยใช้คำสั่งดังนี้ git clone https://github.com/chakid-c/vending-machine.git
# 2. เปิด Docker Desktop: เปิด Docker Desktop เพื่อให้ DockerCompose สามารถทำงานได้
# 3. สร้าง container และเริ่มระบบทั้งหมด: ใช้คำสั่งดังนี้
### คำสั่งเริ่มต้น
```bash
# สร้าง container และเริ่มระบบทั้งหมด
docker compose up --build

# คำสั่งรัน unit test
docker exec vending-machine-frontend-1 npm run test

### โปรดรอ
หลังจากที่รัน Docker และติดตั้งระบบเรียบร้อยแล้ว ผู้ใช้สามารถตรวจสอบว่าแอปพลิเคชันพร้อมใช้งานได้ด้วยวิธีดังนี้:

Frontend (Next.js): http://localhost:3000
Frontend-Admin (Next): http://localhost:3000/admin
Backend API (Laravel): http://localhost:8000/api/product
