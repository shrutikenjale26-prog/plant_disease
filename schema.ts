import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const plantAnalyses = pgTable("plant_analyses", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  plantName: text("plant_name"),
  plantScientificName: text("plant_scientific_name"),
  plantConfidence: integer("plant_confidence"), // percentage 0-100
  plantDescription: text("plant_description"),
  diseaseDetected: text("disease_detected"),
  diseaseScientificName: text("disease_scientific_name"),
  diseaseSeverity: text("disease_severity"), // "low", "moderate", "high", "critical"
  diseaseDescription: text("disease_description"),
  diseaseConfidence: integer("disease_confidence"), // percentage 0-100
  immediateActions: jsonb("immediate_actions").$type<string[]>(),
  treatmentOptions: jsonb("treatment_options").$type<string[]>(),
  preventionTips: jsonb("prevention_tips").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPlantAnalysisSchema = createInsertSchema(plantAnalyses).omit({
  id: true,
  createdAt: true,
});

export const analysisRequestSchema = z.object({
  imageData: z.string(), // base64 encoded image
});

export type InsertPlantAnalysis = z.infer<typeof insertPlantAnalysisSchema>;
export type PlantAnalysis = typeof plantAnalyses.$inferSelect;
export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;
