# KeepNote

A modern note-taking web application built with Next.js 15 and React 19 that allows users to create, share, and organize notes with calendar integration.

## Features

### User Management
- Account creation with email/password
- Role-based access (Default User/Admin)
- Profile management
- Friend system for note sharing

### Note Management
- Create notes with random pastel colors
- Rich text content support
- Automatic timestamps
- Tag system for organization
- Calendar integration
- Note sharing with friends

### Admin Features
- User management dashboard
- Account deletion capabilities
- System monitoring

## Technology Stack

### Frontend
- React 19 with Next.js 15
- TailwindCSS with SASS
- Zod + React Hook Form
- TypeScript

### Backend
- Next.js API routes
- TypeORM
- PostgreSQL
- Redis
- Swagger API documentation

### DevOps
- Docker
- Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Jarsey45/KeepNote2.git
cd KeepNote2
```

2. Create `.env` file in root directory:
```env
NODE_ENV=development
APP_PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USER=keepnote
DB_PASSWORD=keepnote
DB_NAME=keepnote
REDIS_HOST=redis
REDIS_PORT=6379
PGADMIN_PORT=5050
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
JWT_SECRET=your-secret-key
```

3. Start the application:
```bash
docker-compose up -d
```

4. Apply database migrations:
```bash
docker exec -it keepnote2-app-1 npm run migration:run
```

### Accessing Services
- Web Application: http://localhost:3000
- PgAdmin: http://localhost:5050
- API Documentation (swagger): http://localhost:3000/api-docs

## Database Schema

### User Table
```sql
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'default',
    nickname VARCHAR,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

### Note Table
```sql
CREATE TABLE "note" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    color VARCHAR NOT NULL,
    tags TEXT[],
    calendar_date TIMESTAMP,
    user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

### Note Sharing Table
```sql
CREATE TABLE "user_shared_notes_note" (
    user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
    note_id UUID REFERENCES "note"(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, note_id)
);
```

## ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    User {
        uuid id PK
        string email UK
        string password
        string role
        string nickname
        datetime createdAt
        datetime updatedAt
    }

    Note {
        uuid id PK
        string title
        text content
        string color
        string[] tags
        datetime calendarDate
        datetime createdAt
        datetime updatedAt
        uuid userId FK
    }

    Calendar ||--o{ Note : contains
    User ||--o{ Note : creates
    User }|--|| User : friends
    User }|--|| Note : shared_with
```
## Screenshots

## Screenshots

### 🖥️ Desktop Views

#### Authentication
<div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
  <img src="/screenshots/login-desktop.png" alt="Login Screen" width="400" />
  <img src="/screenshots/register-desktop.png" alt="Register Screen" width="400" />
</div>

#### Core Features
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; margin: 20px 0;">
  <div style="text-align: center;">
    <img src="/screenshots/dashboard-desktop.png" alt="Dashboard" width="800" />
    <p><em>Dashboard - Create and manage your notes</em></p>
  </div>
  
  <div style="text-align: center;">
    <img src="/screenshots/shared-desktop.png" alt="Shared Notes" width="800" />
    <p><em>Shared Notes - View notes shared by other users</em></p>
  </div>
  
  <div style="text-align: center;">
    <img src="/screenshots/calendar-desktop.png" alt="Calendar View" width="800" />
    <p><em>Calendar - Organize notes by date</em></p>
  </div>
</div>

#### User Management
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; margin: 20px 0;">
  <div style="text-align: center;">
    <img src="/screenshots/account-desktop.png" alt="Account Settings" width="800" />
    <p><em>Account Settings - Manage your profile</em></p>
  </div>
  
  <div style="text-align: center;">
    <img src="/screenshots/admin-desktop.png" alt="Admin Panel" width="800" />
    <p><em>Admin Panel - User management and system overview</em></p>
  </div>
</div>

### 📱 Mobile Views

#### Authentication
<div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
  <img src="/screenshots/login-mobile.png" alt="Mobile Login" width="200" />
  <img src="/screenshots/register-mobile.png" alt="Mobile Register" width="200" />
</div>

#### Navigation and Features
<div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
  <img src="/screenshots/menu-mobile.png" alt="Mobile Menu" width="200" />
  <img src="/screenshots/dashboard-mobile.png" alt="Mobile Dashboard" width="200" />
  <img src="/screenshots/shared-mobile.png" alt="Mobile Shared Notes" width="200" />
</div>

#### Additional Views
<div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
  <img src="/screenshots/calendar-mobile.png" alt="Mobile Calendar" width="200" />
  <img src="/screenshots/account-mobile.png" alt="Mobile Account" width="200" />
  <img src="/screenshots/admin-mobile.png" alt="Mobile Admin" width="200" />
</div>

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Developed with ❤️ by **Jarsey45** using:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextUI](https://nextui.org/)
