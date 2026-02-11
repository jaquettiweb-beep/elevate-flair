import { z } from "zod";

// Max file size: 5MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name}: arquivo muito grande (máx. 5MB)`;
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return `${file.name}: tipo não permitido (use JPG, PNG, WebP ou GIF)`;
  }
  return null;
}

export const modalitySchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter ao menos 2 caracteres").max(100, "Nome muito longo (máx. 100)"),
  description: z.string().trim().max(500, "Descrição muito longa (máx. 500)").default(""),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter ao menos 2 caracteres").max(100, "Nome muito longo (máx. 100)"),
  text: z.string().trim().min(10, "Depoimento deve ter ao menos 10 caracteres").max(500, "Depoimento muito longo (máx. 500)"),
  modality: z.string().trim().max(50, "Modalidade muito longa (máx. 50)").default(""),
  rating: z.number().int().min(1, "Mínimo 1 estrela").max(5, "Máximo 5 estrelas"),
});

export const notificationSchema = z.object({
  title: z.string().trim().min(2, "Título deve ter ao menos 2 caracteres").max(150, "Título muito longo (máx. 150)"),
  message: z.string().trim().min(5, "Mensagem deve ter ao menos 5 caracteres").max(500, "Mensagem muito longa (máx. 500)"),
  type: z.enum(["info", "success", "warning", "error"]),
});

export const scheduleSchema = z.object({
  time_slot: z.string().trim().regex(/^\d{2}:\d{2}$/, "Formato de horário inválido (use HH:MM)"),
  day_of_week: z.string().min(1),
  class_name: z.string().trim().min(2, "Nome da aula deve ter ao menos 2 caracteres").max(100, "Nome muito longo (máx. 100)"),
  instructor: z.string().trim().max(100, "Nome muito longo (máx. 100)").optional(),
});

export const seoSchema = z.object({
  title: z.string().trim().max(70, "Título muito longo (máx. 70)"),
  description: z.string().trim().max(200, "Descrição muito longa (máx. 200)"),
  keywords: z.string().trim().max(300, "Keywords muito longas (máx. 300)"),
});

export const settingsFieldSchema = z.string().trim().max(500, "Valor muito longo (máx. 500)");

export function getValidationError(schema: z.ZodType, data: unknown): string | null {
  const result = schema.safeParse(data);
  if (result.success) return null;
  return result.error.errors[0]?.message ?? "Dados inválidos";
}
