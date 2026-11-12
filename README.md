# Full-Featured Authentication System

A modern, production-grade **Role-Based Authentication & User Management System** built with **Laravel 13**, **React 19**, **Inertia.js v3**, **PostgreSQL**, and **Tailwind CSS v4**.

Designed with security, developer experience, and responsive UX in mind, featuring email OTP verification, Google OAuth 2.0, interactive avatar manipulation, and administrative user controls.

---

## Key Features

### 1. Robust Authentication & Registration
- **Email & Password Authentication**: Standard registration and login with rate-limiting / throttle protection against brute-force attacks.
- **Google OAuth 2.0 Sign-In**: One-click registration and login powered by Laravel Socialite.
- **Remember Me Functionality**: Persistent sessions via secure tokens.
- **Safe Session Invalidation**: Complete cache flushing and session regeneration upon logout.

### 2. 6-Digit Email OTP Verification
- **Email Ownership Verification**: 6-digit verification code dispatched via SMTP upon registration.
- **High Security Architecture**: Codes are encrypted using bcrypt (`code_hash`) in PostgreSQL.
- **Brute-Force Guard**: Automatically expires after 5 failed attempts or 5 minutes.
- **Anti-Spam Resend Timer**: Integrated 60-second reactive countdown timer.
- **Route Guard Middleware**: `verified` middleware enforces email verification before accessing protected user dashboards.

### 3. Forgot Password & Password Reset via OTP
- **Password Reset Flow**: Request a reset code to registered email.
- **Dedicated Reset View**: Monospace OTP input, live resend cooldown, new password with show/hide toggle.
- **Automatic Status Synchronization**: Successfully resetting password automatically verifies previously unverified accounts.

### 4. Role-Based Access Control (RBAC) & Dynamic Dashboards
- **Multi-Role Separation**: Strict role boundaries between `admin` and `user`.
- **Intelligent Redirection**: Accessing root (`/`) or `/dashboard` automatically evaluates authentication and user role, redirecting to the proper dashboard.
- **Admin Dashboard**: System overview metrics (Total Users, Verified Users, Admins, Regular Users) and latest user registrations table.
- **User Dashboard**: Account credentials summary, verification status badge, and quick profile actions.

### 5. Admin User Management (Full CRUD)
- **User Directory**: Searchable, paginated user management interface.
- **Create User**: Administrative user creation with explicit role assignment (`admin` or `user`).
- **Edit & Update**: Modify user details, roles, or update passwords.
- **Delete Protection**: Confirmation dialog before deletion with safety constraints (administrators cannot delete their own active account).

### 6. Interactive Profile Photo Cropper
- **Custom Avatar Upload**: Floating camera action trigger on profile screens.
- **In-Browser Image Editor (`AvatarCropperModal`)**:
  - Drag-and-drop pointer repositioning (pan).
  - Smooth zoom slider (1x to 3x).
  - 90° clockwise canvas rotation.
  - One-click reset to original state.
  - High-resolution 1:1 square canvas export (400x400) preventing distortion (`object-cover`).
- **Remove Avatar**: Instant reset to user initials fallback.
- **Google Avatar Sync**: Automatically imports high-res avatars during Google OAuth.

### 7. Account Settings & Security
- **Profile Settings**: Update display name and email address.
- **Appearance Settings**: Real-time theme toggle (Light, Dark, or System mode).
- **Security & Password Management**: Change current password, secured with Laravel's `RequirePassword` confirmation screen.
- **Self Account Deletion**: Permanent account removal with password confirmation dialog, redirecting cleanly to login.

### 8. Mobile-First Responsive Design
- **Adaptive Sidebar**: Smooth sidebar transitions between expanded mode and collapsed icon mode with popovers.
- **Mobile Sheet Navigation**: Auto-closing drawer when navigating on mobile devices (iOS Safari, Android).

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Laravel 13 (PHP 8.5) |
| **Frontend Architecture** | Inertia.js v3 + React 19 + TypeScript |
| **Styling & Components** | Tailwind CSS v4 + Radix UI / Shadcn UI |
| **Database** | PostgreSQL |
| **Icons** | Lucide React |
| **Testing** | Pest PHP 3.x (69 Automated Tests) |
| **Code Formatting** | Laravel Pint |
| **Type Safety** | Laravel Wayfinder (Typesafe Routes & Actions) |

---

## Getting Started

### Prerequisites
- PHP 8.2 or higher (PHP 8.5 recommended)
- Composer
- Node.js (v20+ recommended) & npm
- Docker (for PostgreSQL container) or a local PostgreSQL instance

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alfinmuzakkiiman/Full-Featured_Authentication_System.git
   cd Full-Featured_Authentication_System
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure Database**:
   Update your database credentials in `.env`:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=role_auth_system
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

   *If using Docker Compose:*
   ```bash
   docker compose up -d
   ```

6. **Run Migrations & Seeders**:
   ```bash
   php artisan migrate --seed
   ```

7. **Create Storage Symlink**:
   ```bash
   php artisan storage:link
   ```

8. **Build Assets & Start Servers**:
   ```bash
   # Terminal 1 - Backend Server
   php artisan serve

   # Terminal 2 - Frontend Compiler
   npm run dev
   ```

---

## Testing

Run the automated test suite powered by **Pest PHP**:

```bash
vendor/bin/pest
```

---

## Developer

Developed by **Alfin Muzakki Iman**:
- **Portfolio**: [alfindev.my.id](https://alfindev.my.id/)
- **LinkedIn**: [alfin-muzakki-iman](https://www.linkedin.com/in/alfin-muzakki-iman-14b889375/)
- **GitHub**: [@alfinmuzakkiiman](https://github.com/alfinmuzakkiiman)

---

## License

This project is open-sourced under the [MIT license](LICENSE).
