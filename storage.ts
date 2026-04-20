import { plantAnalyses, type PlantAnalysis, type InsertPlantAnalysis } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAnalysis(id: number): Promise<PlantAnalysis | undefined>;
  createAnalysis(analysis: InsertPlantAnalysis): Promise<PlantAnalysis>;
  getAllAnalyses(): Promise<PlantAnalysis[]>;
}

export class DatabaseStorage implements IStorage {
  async getAnalysis(id: number): Promise<PlantAnalysis | undefined> {
    const [analysis] = await db.select().from(plantAnalyses).where(eq(plantAnalyses.id, id));
    return analysis || undefined;
  }

  async createAnalysis(insertAnalysis: InsertPlantAnalysis): Promise<PlantAnalysis> {
    const [analysis] = await db
      .insert(plantAnalyses)
      .values(insertAnalysis)
      .returning();
    return analysis;
  }

  async getAllAnalyses(): Promise<PlantAnalysis[]> {
    const analyses = await db.select().from(plantAnalyses);
    return analyses;
  }
}

export const storage = new DatabaseStorage();
