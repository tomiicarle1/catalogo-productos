# Catálogo de productos

**Alumno:** Tomás Carle

Proyecto de React (Vite) con React Router y Ant Design que muestra un catálogo de productos traído de una API pública.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Luego abrir la URL que muestra la terminal (por defecto http://localhost:5173).

## API utilizada

**Fake Store API** (gratuita, sin API key): https://fakestoreapi.com/docs

## Endpoints consumidos

| Endpoint | Uso |
| --- | --- |
| `GET https://fakestoreapi.com/products` | Listado del catálogo (`/catalogo`) |
| `GET https://fakestoreapi.com/products/:id` | Detalle de un producto (`/catalogo/:id`) |

> La API no permite buscar por nombre en el servidor, por lo que el buscador (`?buscar=texto`) filtra del lado del cliente por título, manteniendo el término en la URL con `useSearchParams`.

## Rutas

- `/` Home
- `/catalogo` listado + buscador
- `/catalogo/:id` detalle
- `*` 404
