# Spare Parts Marketplace

A full-stack Spare Parts Marketplace platform that connects **buyers, sellers, and admins** in a transparent and efficient way.  
The system ensures **secure transactions, seller approvals, and easy navigation** across dashboards for different user roles.

---

## 🚀 Features

### Public Pages
- **Landing Page (Home):** Welcome page with categories of spare parts.
- **Authentication:** User registration & login with role-based access.
- **Navbar & Footer:** Shown only on public pages (hidden in dashboards).

### Buyer Dashboard
- Browse available spare parts.
- Checkout flow (integrated with product data).
- Profile management (update name, email, password, profile photo).

### Seller Dashboard
- Upload spare parts (with images and descriptions).
- Track sales and uploaded items.
- Profile page (photo upload, edit account).
- Requires **Admin approval** before login is allowed.
- Seller **Company ID field** for business tracking.

### Admin Dashboard
- Manage all users (buyers & sellers).
- Approve/reject seller accounts before activation.
- View payment summaries (future feature).
- Delete projects if necessary.

---

## 🔑 Authentication & Sessions
- Role-based login:
  - **Admin:** Uses static credentials (`Admin` / `AdminSpareParts`).
  - **Buyers & Sellers:** Register through the system.
- Persistent login:  
  Sessions are **stored in localStorage** so data is not lost on refresh.

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Django REST Framework
- **Database:** PostgreSQL
- **Payments:** M-Pesa Daraja API (planned integration)
- **Storage:** LocalStorage for profiles & sessions (will shift to cloud)

---

<!-- ## 📦 Installation & Setup

### Prerequisites
- Node.js (>= 16.x)
- Python (>= 3.10) with virtualenv
- PostgreSQL (>= 13)

### Backend (Django + PostgreSQL)
```bash
# Navigate to backend folder
cd backend

# Activate virtual environment
source spareparts/bin/activate  # Linux/Mac
spareparts\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver -->
