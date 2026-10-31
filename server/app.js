import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routes/productRoutes.js'

export function createApp(clientOrigins) {
  const app = express()

  app.use(cors({ origin: clientOrigins }))
  app.use(express.json({ limit: '10kb' }))

  app.get('/api/health', (request, response) => {
    response.json({
      status: 'ok',
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    })
  })

  app.use('/api/productos', productRouter)

  app.use((request, response) => {
    response.status(404).json({ message: 'La ruta solicitada no existe.' })
  })

  app.use((error, request, response, next) => {
    if (response.headersSent) {
      next(error)
      return
    }

    console.error('Error en la API:', error.message)
    response.status(500).json({ message: 'Ocurrió un error al procesar la solicitud.' })
  })

  return app
}
