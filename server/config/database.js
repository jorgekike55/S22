import mongoose from 'mongoose'

export async function connectDatabase(connectionString) {
  await mongoose.connect(connectionString)
  console.info('Conexión con MongoDB establecida.')
}
