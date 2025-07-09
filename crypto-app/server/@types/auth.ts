import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Неверный формат email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть минимум 6 символов" }),
});

export const refreshCookieSchema = z.object({
  refresh_token: z.string().min(10, "Refresh token обязателен"),
});

export const verifCodeSchema = z.object({
  email: z.string().email({ message: "Неверный формат email" }),
  code: z
    .string()
    .length(6)
    .regex(/^\d{6}$/, "Код должен состоять из 6 цифр"),
});

export type UserInput = z.infer<typeof userSchema>;
export type RefreshInput = z.infer<typeof refreshCookieSchema>;
export type VerifCodeInput = z.infer<typeof verifCodeSchema>;
