# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```



ProPlumber — Full Stack Web Application
A complete plumber business website with a public landing page and a private admin panel. Built with Laravel 13 (backend API) and React + TypeScript (frontend).

Tech Stack
LayerTechnologyFrontendReact 19 + TypeScript + ViteStylingTailwind CSS v4BackendLaravel 13AuthenticationLaravel SanctumDatabaseMySQLHTTP ClientAxiosRoutingReact Router DOM

Project Structure
MwangiProjects/
├── plumberProject/       # Laravel API (backend)
└── plumber-frontend/     # React app (frontend)

Features
Public Side (No login required)

Landing page with hero section
Services section — fetched live from the API
About section with business stats
Booking form — customers submit job requests

Admin Panel (Login required)

Secure login with Sanctum token auth
Dashboard with live booking statistics
Bookings management — view, update status, delete
Services management — create, edit, hide/show, delete


Database Tables
TablePurposeusersAdmin accountservicesPlumbing services offeredcustomersCustomers who submit bookingsbookingsJob requests linking customers and servicespersonal_access_tokensSanctum auth tokens

API Endpoints
Public Routes
MethodEndpointDescriptionGET/api/servicesGet active services (landing page)POST/api/bookingsSubmit a booking (contact form)POST/api/admin/loginAdmin login
Protected Routes (require Bearer token)
MethodEndpointDescriptionGET/api/meGet current admin userPOST/api/logoutLogout and delete tokenGET/api/dashboard/statsDashboard statisticsGET/api/bookingsGet all bookingsGET/api/bookings/{id}Get single bookingPATCH/api/bookings/{id}/statusUpdate booking statusPATCH/api/bookings/{id}/scheduleSchedule a bookingDELETE/api/bookings/{id}Delete a bookingGET/api/admin/servicesGet all services (including hidden)POST/api/servicesCreate a servicePUT/api/services/{id}Update a serviceDELETE/api/services/{id}Delete a service

Getting Started
Requirements

PHP 8.2+
Composer
Node.js 18+
MySQL
XAMPP (or any MySQL server)


Backend Setup
bash# 1. Navigate to backend
cd plumberProject

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Generate app key
php artisan key:generate

# 5. Configure your database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=plumberproject
DB_USERNAME=root
DB_PASSWORD=

# 6. Run migrations
php artisan migrate

# 7. Seed the database (creates admin account + services)
php artisan db:seed

# 8. Start the server
php artisan serve
The API will be running at http://localhost:8000

Frontend Setup
bash# 1. Navigate to frontend
cd plumber-frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
The app will be running at http://localhost:5173

Default Admin Credentials
FieldValueEmailadmin@plumber.comPasswordpassword123

Important: Change these credentials before deploying to production.


Booking Status Flow
new → confirmed → in_progress → completed
                ↘ cancelled

Frontend Routes
RouteAccessDescription/PublicLanding page/admin/loginPublicAdmin login/admin/dashboardProtectedStats overview/admin/bookingsProtectedManage bookings/admin/servicesProtectedManage services

PHP Version Switching
If you have multiple PHP versions installed:
bash# Switch to PHP 8.3 (for this project)
php83

# Switch back to PHP 7.4 (for older projects)
php74

# Check current version
phpv

Key Concepts Learned

Migrations — versioned database schema changes
Eloquent ORM — database queries without raw SQL
Foreign Keys — relational data integrity
Sanctum — API token authentication
Route Model Binding — automatic model injection in controllers
React Context — global state management
Protected Routes — frontend auth guards
Axios Interceptors — automatic token injection
TypeScript Interfaces — type-safe API responses
Eager Loading — N+1 query prevention with with()


Author
MK — Built as a full stack learning project
Stack: Laravel 13 + React + TypeScript
Location: Nairobi, Kenya