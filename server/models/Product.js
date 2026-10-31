import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio.'],
      trim: true,
      maxlength: [100, 'El nombre no puede superar los 100 caracteres.'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción del producto es obligatoria.'],
      trim: true,
      maxlength: [300, 'La descripción no puede superar los 300 caracteres.'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio.'],
      min: [0, 'El precio no puede ser negativo.'],
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    emoji: {
      type: String,
      default: '🧁',
      trim: true,
    },
    color: {
      type: String,
      enum: ['crema', 'rosa', 'verde', 'lavanda'],
      default: 'crema',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Product = mongoose.model('Product', productSchema)

export default Product
