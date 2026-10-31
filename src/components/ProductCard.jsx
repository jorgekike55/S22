import { useEffect, useState } from 'react'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0)
  const isAvailable = product.disponible !== false

  return (
    <article className={`product-card${isAvailable ? '' : ' product-card-unavailable'}`}>
      <div className={`product-art product-art-${product.color || 'crema'}`} aria-hidden="true">
        <span className="product-emoji">{product.emoji || '🧁'}</span>
        <span className="product-art-label">DULCE HORNO</span>
        {!isAvailable && <span className="sold-out-label">Agotado</span>}
      </div>
      <div className="product-info">
        <div className="product-title-row">
          <h3>{product.nombre}</h3>
          <span className="product-price">{currencyFormatter.format(product.precio)}</span>
        </div>
        <p className="product-description">{product.descripcion}</p>
        <div className="product-card-footer">
          <span className={isAvailable ? 'availability' : 'availability unavailable'}>
            <span aria-hidden="true">●</span> {isAvailable ? 'Disponible hoy' : 'No disponible'}
          </span>
          <button
            className="add-button"
            type="button"
            disabled={!isAvailable}
            onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
            aria-label={`Agregar ${product.nombre} al pedido`}
          >
            {quantity > 0 ? `Agregado · ${quantity}` : 'Agregar'} <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
