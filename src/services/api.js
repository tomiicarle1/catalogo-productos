import axios from "axios";

// Única capa que conoce las URLs de la API.
const http = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

/**
 * Trae el listado de productos.
 * Fake Store API no permite buscar por nombre en el servidor,
 * así que el filtro se aplica del lado del cliente sobre el título.
 */
export async function getItems(buscar = "") {
  const { data } = await http.get("/products");
  const texto = buscar.trim().toLowerCase();
  if (!texto) return data;
  return data.filter((p) => p.title.toLowerCase().includes(texto));
}

/**
 * Trae un producto por id.
 * Con un id inexistente, Fake Store API responde 200 con cuerpo vacío,
 * por eso se lo trata explícitamente como "no encontrado".
 */
export async function getItemById(id) {
  const { data } = await http.get(`/products/${id}`);
  if (!data || typeof data !== "object" || !data.id) {
    const error = new Error("Producto no encontrado");
    error.notFound = true;
    throw error;
  }
  return data;
}

export function esNoEncontrado(error) {
  return error?.notFound === true || error?.response?.status === 404;
}
