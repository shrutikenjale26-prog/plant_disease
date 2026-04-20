# Plant Care AI - replit.md

## Overview

Plant Care AI is a full-stack web application that provides AI-powered plant identification and disease detection services. Users can upload images of plants or take photos using their device camera, and the application analyzes the images to identify the plant species and detect any potential diseases or health issues.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with multipart form data support for image uploads
- **Image Processing**: Sharp for image optimization and processing
- **File Upload**: Multer for handling multipart/form-data

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **In-Memory Storage**: Temporary MemStorage class for development/testing

### Authentication & Session Management
- **Session Store**: PostgreSQL-based sessions using connect-pg-simple
- **Session Management**: Express sessions with secure configuration

## Key Components

### Image Capture System
- **Camera Integration**: Native browser camera API with fallback support
- **File Upload**: Drag-and-drop and click-to-upload functionality
- **Image Processing**: Client-side image compression and server-side optimization
- **Supported Formats**: All major image formats with 10MB size limit

### AI Analysis Pipeline
- **Plant Identification**: Mock AI service (ready for integration with PlantNet API or Google Vision)
- **Disease Detection**: Confidence scoring and severity assessment
- **Treatment Recommendations**: Structured advice including immediate actions, treatment options, and prevention tips

### Results Display
- **Confidence Indicators**: Visual confidence scores for both plant ID and disease detection
- **Severity Levels**: Color-coded severity indicators (low, moderate, high, critical)
- **Actionable Insights**: Categorized recommendations for plant care

### UI/UX Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode**: CSS variable-based theming system
- **Loading States**: Smooth transitions and progress indicators
- **Error Handling**: User-friendly error messages and recovery options

## Data Flow

1. **Image Capture**: User captures/uploads plant image through the frontend
2. **Image Processing**: Frontend converts image to base64, backend processes with Sharp
3. **AI Analysis**: Image is sent to mock AI service (ready for real AI integration)
4. **Data Storage**: Analysis results are stored in PostgreSQL database
5. **Results Display**: Structured analysis data is presented to the user
6. **Historical Access**: Previous analyses can be retrieved and viewed

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM with excellent PostgreSQL support
- **@tanstack/react-query**: Powerful data synchronization for React
- **@radix-ui/***: Accessible, unstyled UI primitives
- **sharp**: High-performance image processing
- **multer**: Multipart form data handling

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing pipeline

### Future AI Integration Points
- **PlantNet API**: For real plant identification
- **Google Vision API**: Alternative for plant/disease recognition
- **Custom ML Models**: Potential for domain-specific plant disease models

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API
- **Hot Reload**: Full-stack hot reloading with Vite middleware
- **Database**: Development database with Drizzle push for schema updates

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: ESBuild bundling for Node.js deployment
- **Assets**: Static file serving with proper caching headers
- **Database**: Migration-based schema management

### Environment Configuration
- **Environment Variables**: Database URL, API keys, session secrets
- **Database Migrations**: Drizzle Kit for production schema changes
- **Static Assets**: Optimized serving through Express static middleware

### Scalability Considerations
- **Database**: Serverless PostgreSQL for automatic scaling
- **Image Storage**: Ready for cloud storage integration (S3, Cloudinary)
- **API Rate Limiting**: Prepared for external AI service quotas
- **Caching**: Query caching through TanStack Query