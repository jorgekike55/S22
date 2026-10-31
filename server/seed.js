import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDatabase } from './config/database.js'
import Product from './models/Product.js'

const sampleProducts = [
  {
    nombre: 'Torta de chocolate',
    descripcion: 'Bizcocho húmedo, relleno de ganache y un toque de cacao.',
    precio: 45000,
    disponible: true,
    emoji: '🍰',
    color: 'crema',
  },
  {
    nombre: 'Galletas de avena',
    descripcion: 'Caja x 12, con avena, chips de chocolate y mucho cariño.',
    precio: 18000,
    disponible: true,
    emoji: '🍪',
    color: 'verde',
  },
  {
    nombre: 'Cupcakes de vainilla',
    descripcion: 'Caja x 6, con crema suave y decoraciones de temporada.',
    precio: 30000,
    disponible: true,
    emoji: '🧁',
    color: 'rosa',
  },
]

async function seedProducts() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Falta MONGODB_URI. Agrega la URL de conexión en el archivo .env.')
  }

  await connectDatabase(process.env.MONGODB_URI)
  const productCount = await Product.countDocuments()

  if (productCount > 0) {
    console.info(`La colección ya tiene ${productCount} producto(s); no se agregaron datos.`)
    return
  }

  await Product.insertMany(sampleProducts)
  console.info(`Se agregaron ${sampleProducts.length} productos de ejemplo.`)
}

try {
  await seedProducts()
} catch (error) {
  console.error('No se pudieron cargar los productos de ejemplo:', error.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
