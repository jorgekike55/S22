import 'dotenv/config'
import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'

const { MONGODB_URI, PORT = '3000', CLIENT_ORIGIN = 'http://localhost:5173' } = process.env

if (!MONGODB_URI) {
  console.error('Falta MONGODB_URI. Agrega la URL de conexión en el archivo .env.')
  process.exit(1)
}

try {
  await connectDatabase(MONGODB_URI)

  const allowedOrigins = CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
  const app = createApp(allowedOrigins)

  app.listen(PORT, () => {
    console.info(`API de Dulce Horno disponible en http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('No se pudo iniciar la API:', error.message)
  process.exit(1)
}
