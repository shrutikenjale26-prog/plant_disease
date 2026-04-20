# Plant Disease Detection Website - Complete Code

This is a complete AI-powered plant disease detection web application built with React, TypeScript, Express.js, and PostgreSQL.

## Project Structure

```
├── client/src/
│   ├── components/
│   │   ├── camera-modal.tsx
│   │   ├── image-capture.tsx
│   │   ├── processing-state.tsx
│   │   └── results-display.tsx
│   ├── hooks/
│   │   ├── use-camera.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── analysis.tsx
│   │   ├── history.tsx
│   │   ├── home.tsx
│   │   └── not-found.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server/
│   ├── db.ts
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Key Features

1. **Camera Integration** - Native browser camera API with mobile support
2. **File Upload** - Drag-and-drop and click-to-upload functionality
3. **AI Disease Detection** - Mock AI service (ready for real API integration)
4. **Plant Identification** - Species identification with confidence scoring
5. **Treatment Recommendations** - Detailed care instructions and prevention tips
6. **Report Saving** - PostgreSQL database storage with history access
7. **Responsive Design** - Mobile-first approach with dark mode support

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: TanStack Query
- **Image Processing**: Sharp
- **File Upload**: Multer

## Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Database Setup**
```bash
npm run db:push
```

3. **Start Development Server**
```bash
npm run dev
```

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGUSER` - Database user
- `PGPASSWORD` - Database password
- `PGDATABASE` - Database name

## API Integration Points

The app is designed to easily integrate with real AI services:

1. **Plant Identification**: Replace mock service in `server/routes.ts` with PlantNet API or Google Vision
2. **Disease Detection**: Integrate with specialized plant disease ML models
3. **Image Storage**: Ready for cloud storage integration (AWS S3, Cloudinary)

## Database Schema

The app uses a comprehensive schema for plant analysis storage:

```typescript
export const plantAnalyses = pgTable("plant_analyses", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  plantName: text("plant_name"),
  plantScientificName: text("plant_scientific_name"),
  plantConfidence: integer("plant_confidence"), // 0-100%
  plantDescription: text("plant_description"),
  diseaseDetected: text("disease_detected"),
  diseaseScientificName: text("disease_scientific_name"),
  diseaseSeverity: text("disease_severity"), // low, moderate, high, critical
  diseaseDescription: text("disease_description"),
  diseaseConfidence: integer("disease_confidence"), // 0-100%
  immediateActions: jsonb("immediate_actions").$type<string[]>(),
  treatmentOptions: jsonb("treatment_options").$type<string[]>(),
  preventionTips: jsonb("prevention_tips").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Disease Detection Coverage

The app currently detects:
- **Fungal Diseases**: Early Blight, Powdery Mildew
- **Viral Infections**: Tobacco Mosaic Virus (TMV)
- **Bacterial Infections**: Bacterial Leaf Spot

## Customization

### Adding New Diseases
Add new disease types in `server/routes.ts` in the `detectDisease` function.

### Styling
Customize colors and themes in `client/src/index.css` using CSS variables.

### UI Components
The app uses shadcn/ui components which can be customized in the components folder.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Set up production database with proper migrations
3. Configure environment variables
4. Deploy to your preferred hosting platform (Replit, Vercel, etc.)

## Future Enhancements

- Real AI API integration
- User authentication
- Plant care reminders
- Community features
- Advanced analytics
- Mobile app version

This codebase provides a solid foundation for a professional plant disease detection service.