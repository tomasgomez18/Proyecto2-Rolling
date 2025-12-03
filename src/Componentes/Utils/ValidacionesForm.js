import { z } from "zod";

export const PAISES_VALIDOS = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
].sort();

export const FECHA_MINIMA = new Date(1945, 0, 1);
export const FECHA_MAXIMA = new Date(2006, 11, 31);

export const registroSchema = z.object({
  nombreDeUsuario: z
    .string()
    .min(5, "El nombre de usuario debe tener mínimo 5 caracteres")
    .max(30, "El nombre de usuario no puede superar 30 caracteres")
    .regex(
      /^(?!_)(?!.*\s)[a-zA-Z0-9_]+$/,
      "Solo letras, números y guión bajo"
    ),

  email: z
    .string()
    .email("Debe ingresar un email válido"),

  pais: z
    .string()
    .min(1, "El país es requerido"),

  fechaNacimiento: z
    .string()
    .min(1, "La fecha de nacimiento es requerida")
    .refine((fecha) => {
      const fechaNac = new Date(fecha);
      return fechaNac >= FECHA_MINIMA && fechaNac <= FECHA_MAXIMA;
    }, "Debes tener entre 18 y 68 años"),

  contrasena: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(20, "La contraseña no puede superar 20 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
      "Debe tener mayúscula, minúscula, número y un símbolo especial"
    ),

  confirmarContrasena: z.string(),
})
.refine((data) => data.contrasena === data.confirmarContrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"],
});

export const loginSchema = z.object({
  credencial: z.string().min(1, "Ingresa tu usuario o email"),
  contrasena: z.string().min(1, "Ingresa tu contraseña"),
});

export default registroSchema;