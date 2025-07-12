# Teacher Management System

A comprehensive teacher management system built with Next.js 15, featuring role-based authentication, teacher profiles, qualifications management, and availability scheduling.

## 🏗️ Architecture Overview

This application is built using modern web technologies with a robust backend and intuitive frontend:

### **Tech Stack**
- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with server-side rendering
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth and Credentials
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Motion (Framer Motion)

### **Key Features**
- 🔐 Role-based authentication (Admin/Teacher)
- 👥 Teacher profile management
- 📚 Qualifications tracking
- 📅 Availability scheduling
- 🎨 Modern, responsive UI with dark/light theme
- 🔄 Real-time data updates

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin-only routes (route groups)
│   │   └── teachers/             # Teacher management for admins
│   ├── api/                      # API endpoints
│   │   ├── auth/                 # NextAuth.js configuration
│   │   ├── availability/         # Availability management API
│   │   ├── qualifications/       # Qualifications management API
│   │   └── teacher/              # Teacher profile API
│   ├── teacher/[id]/             # Individual teacher profile pages
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Landing page
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components (buttons, cards, etc.)
│   ├── landing-page.tsx          # Marketing landing page
│   ├── teachers-table.tsx        # Admin teacher management table
│   ├── teacherProfile.tsx        # Teacher profile component
│   ├── qualifications.tsx        # Qualifications management
│   ├── availability.tsx          # Availability scheduling
│   └── navbar.tsx                # Navigation component
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth.js configuration
│   ├── db.ts                     # Prisma client instance
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript type definitions
└── generated/                    # Generated Prisma client
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

### **User Model**
- **Role-based system**: Admin or Teacher
- **Profile information**: Name, email, phone, address, birthdate
- **Authentication**: Supports Google OAuth and credentials
- **Relationships**: Has many qualifications and availability slots

### **Qualifications Model**
- **Academic credentials**: Title, date, rating
- **Linked to teachers**: Each qualification belongs to a specific teacher

### **Availability Model**
- **Time scheduling**: Day of week and time slots
- **Status tracking**: Available, Unavailable, or Scheduled
- **Unique constraints**: Prevents duplicate time slots per teacher

### **Authentication Models**
- **Account**: OAuth provider information
- **Session**: User session management

## 🚀 Core Functionality

### **Authentication & Authorization**
- **NextAuth.js Integration**: Supports Google OAuth and credential-based login
- **Role-based Access**: Admins can manage all teachers, teachers can only edit their own profiles
- **Session Management**: Secure session handling with role information

### **Admin Features**
- **Teacher Management**: View all teachers in a comprehensive table
- **Add New Teachers**: Dialog-based teacher creation
- **Teacher Profiles**: Access to individual teacher details

### **Teacher Features**
- **Profile Management**: Edit personal information (name, email, phone, address)
- **Qualifications**: Add, edit, and manage academic qualifications with ratings
- **Availability**: Set weekly availability with time slots and status updates

### **User Interface**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Support**: Dark/light mode toggle
- **Modern Components**: Radix UI primitives for accessibility
- **Smooth Animations**: Motion library for enhanced UX

## 🛠️ API Endpoints

### **Authentication**
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication handlers

### **Teacher Management**
- `POST /api/teacher` - Get teacher profile by ID
- `PUT /api/teacher` - Update teacher profile information

### **Qualifications**
- `POST /api/qualifications` - Add new qualification
- `PUT /api/qualifications` - Update existing qualification
- `DELETE /api/qualifications` - Remove qualification

### **Availability**
- `POST /api/availability` - Add availability slot
- `PUT /api/availability` - Update availability status
- `DELETE /api/availability` - Remove availability slot

## 🔧 Development Setup

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (for Google login)

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd teacher-management-assignment
```

2. **Install dependencies**
```bash
pnpm install
# or npm install
```

3. **Environment Setup**
Create a `.env` file with:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/teacher_management"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed database (optional)
pnpm run db:seed
```

5. **Start Development Server**
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### **Available Scripts**

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:seed` - Seed database with sample data

## 🏃‍♂️ Getting Started

1. **First Visit**: The landing page provides an overview of the system
2. **Authentication**: Click "Sign In" to authenticate via Google or credentials
3. **Role-based Experience**:
   - **Admins**: Access teacher management at `/teachers`
   - **Teachers**: Access personal profile at `/teacher/[id]`
4. **Profile Management**: Update personal information, qualifications, and availability

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Vercel Deployment**
```bash
# Connect to Vercel
vercel

# Deploy
vercel --prod
```

2. **Environment Variables**: Configure all environment variables in Vercel dashboard

3. **Database**: Use a production PostgreSQL database (e.g., Neon, Supabase)

## 🧩 Key Components

### **Landing Page**
- Marketing-focused homepage with feature highlights
- Responsive design with animations
- Authentication integration

### **Teacher Management Table**
- Sortable and filterable teacher list for admins
- Quick actions for editing and deleting
- Responsive table design

### **Teacher Profile**
- Comprehensive profile editing
- Real-time updates
- Form validation

### **Qualifications Management**
- Add, edit, delete qualifications
- Date and rating tracking
- Intuitive user interface

### **Availability Scheduling**
- Weekly availability grid
- Time slot management
- Status tracking (Available/Unavailable/Scheduled)

## 🔒 Security Features

- **Authentication**: Secure OAuth and credential-based login
- **Authorization**: Role-based access control
- **Data Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **CSRF Protection**: NextAuth.js provides CSRF protection

This teacher management system provides a solid foundation for educational institutions to manage their teaching staff efficiently while maintaining security and user experience standards.
