const PRODUCTS_URL = import.meta.env.VITE_API_URL || '/productos.json'

export async function getProducts() {
  let response

  try {
    response = await fetch(PRODUCTS_URL)
  } catch {
    throw new Error('No hay conexión con la fuente de productos.')
  }

  if (!response.ok) {
    throw new Error(`La solicitud falló (HTTP ${response.status}).`)
  }

  const products = await response.json()

  if (!Array.isArray(products)) {
    throw new Error('La respuesta del menú debe ser una lista de productos.')
  }

  return products
}
