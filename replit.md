# AI Education Platform for Uttarakhand

## Overview

This is a comprehensive AI education platform specifically designed for Uttarakhand, India. The application provides AI learning resources, tools, and opportunities in Hindi, with support for local languages. It features a modern full-stack architecture with Express.js backend, React frontend using shadcn/ui components, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with custom configuration
- **Internationalization**: Google Translate widget integration

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs with JSON responses
- **File Upload**: Multer middleware for handling media uploads
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request/response logging

### Database Architecture
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Migrations**: Drizzle Kit for schema management
- **Connection**: @neondatabase/serverless driver

## Key Components

### Data Models
1. **Users** - User authentication and profiles
2. **Courses** - AI learning courses with metadata
3. **Jobs** - Micro-job board for AI-related work
4. **Stories** - User success stories with approval system
5. **Resources** - Downloadable learning materials
6. **AI Tools** - Curated list of AI tools with guides

### Core Features
1. **Learning Section** - Curated courses from YouTube, NPTEL, Skill India
2. **AI Tools Directory** - Tool explanations with step-by-step guides
3. **Earn Section** - Job board for AI-related micro-jobs
4. **Innovation Showcase** - Local success stories with user submissions
5. **Resource Center** - Downloadable materials with usage tracking
6. **Google Translate Integration** - Hindi-English language switching

### UI Components
- Comprehensive design system using shadcn/ui
- Mobile-first responsive design
- Custom color scheme with cultural theme colors
- Accessibility features built-in
- Loading states and error handling

## Data Flow

### Client-Server Communication
1. **API Requests**: TanStack React Query handles all server communication
2. **Error Handling**: Centralized error boundary with user-friendly messages
3. **Caching**: Intelligent query caching and invalidation
4. **Optimistic Updates**: For better user experience

### File Upload Flow
1. **Media Upload**: Multer processes images/videos (10MB limit)
2. **Validation**: File type and size validation
3. **Storage**: Files stored in uploads directory
4. **URL Generation**: File URLs returned for frontend display

### Authentication Flow
- Session-based authentication system
- User registration and login capabilities
- Protected routes and API endpoints

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **@radix-ui/**: UI primitive components
- **wouter**: Lightweight React router
- **multer**: File upload handling

### Development Tools
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Backend bundling for production

### Third-Party Integrations
- **Google Translate**: Language translation widget
- **Google Analytics**: User tracking and analytics
- **WhatsApp**: Customer support integration
- **Replit**: Development environment integration

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution
- **Database**: Development database with push migrations
- **Environment**: Replit-optimized configuration

### Production Build
- **Frontend**: Vite production build to dist/public
- **Backend**: ESBuild bundle to dist/index.js
- **Assets**: Static file serving via Express
- **Database**: Production PostgreSQL via DATABASE_URL

### Environment Configuration
- **Database**: DATABASE_URL environment variable required
- **Analytics**: VITE_GA_MEASUREMENT_ID for Google Analytics
- **Node Environment**: NODE_ENV for environment-specific behavior

### Scalability Considerations
- Serverless-ready database connection
- Stateless backend design
- CDN-ready static assets
- Horizontal scaling capability