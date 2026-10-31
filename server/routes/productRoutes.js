import { Router } from 'express'
import Product from '../models/Product.js'

const productRouter = Router()

productRouter.get('/', async (request, response, next) => {
  try {
    const products = await Product.find().sort({ nombre: 1 }).lean()
    response.json(products)
  } catch (error) {
    next(error)
  }
})

export default productRouter
