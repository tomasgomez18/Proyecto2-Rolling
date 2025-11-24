import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const FECHA_MINIMA = new Date(1945, 0, 1);
export const FECHA_MAXIMA = new Date(2006, 11, 31);

const PAISES_VALIDOS = [
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

const PAISES_POR_REGION = {
  "América del Sur": [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Paraguay",
    "Perú",
    "Uruguay",
    "Venezuela",
  ],
  "América Central": [
    "Costa Rica",
    "Cuba",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "Nicaragua",
    "Panamá",
  ],
  "América del Norte": ["Estados Unidos", "México"],
  Caribe: ["Puerto Rico", "República Dominicana"],
  Europa: ["España"],
};

// zod una libreria de validacion de datos tipo "nivel backend pero frontend"
const ValidacionesForm = z
  .object({
    nombreDeUsuario: z
      .string()
      .min(5, "El nombre de usuario debe tener mínimo 5 caracteres")
      .max(20, "El nombre de usuario no puede superar 20 caracteres")
      .regex(
        /^(?!_)(?!.*\s)[a-zA-Z0-9_]+$/,
        "Solo letras, números y guión bajo"
      )
      .transform((val) => val.normalize("NFKC")), //Normaliza los caracteres Unicode (los que se ven igual pero tecnicamente son diferentes)

    email: z
      .string()
      .email("Debe ingresar un email válido")
      .regex(
        /^[^\s<>()\[\]\\.,;:"%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email inválido"
      ),

    // Nuevo campo: País
    pais: z
      .string()
      .min(1, "El país es requerido")
      .refine(
        (pais) => PAISES_VALIDOS.includes(pais),
        "Por favor selecciona un país válido de la lista"
      ),

    fechaNacimiento: z
      .string()
      .min(1, "La fecha de nacimiento es requerida")
      .refine((fecha) => {
        const fechaNac = new Date(fecha);
        return fechaNac >= FECHA_MINIMA && fechaNac <= FECHA_MAXIMA;
      }, "Debes tener entre 18 y 68 años (nacido entre 1955-2006)"),

    contraseña: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña no puede superar 20 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s∞π√∆∑∏∫∂µ∧∨∩∪∈∉⊂⊃⊆⊇≠≤≥≈≡∋∀∃∄¬∧∨⊕⊗⊥⊤⌈⌉⌊⌋〈〉]).+$/,
        "Debe tener mayúscula, minúscula, número y un símbolo (excepto caracteres matemáticos)"
      )
      .transform((val) => val.normalize("NFKC")),

    confirmarContraseña: z.string(),
  })
  // .refine permite crear validaciones personalizadas
  .refine(
    (data) => data.contraseña === data.confirmarContraseña, //  conficion de true o false
    {
      //objeto de configuracion
      message: "Las contraseñas no coinciden", //mensaje si falla
      path: ["confirmarContraseña"], // donde mostrar el error
    }
  );

export default ValidacionesForm;
export { FECHA_MINIMA, FECHA_MAXIMA,PAISES_VALIDOS,PAISES_POR_REGION };
