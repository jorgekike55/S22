import { useEffect, useState } from 'react'
import ProductCard from './components/ProductCard.jsx'
import { getProducts } from './services/productService.js'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [])

  return (
    <div className="storefront">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Dulce Horno, inicio">
          <span className="brand-mark" aria-hidden="true">DH</span>
          <span>Dulce Horno<small>REPOSTERÍA ARTESANAL</small></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#productos">Nuestros postres</a>
          <a className="header-link" href="#nosotros">Hecho con cariño</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">UN MOMENTO DULCE, HECHO PARA TI</p>
            <h1>Pequeños antojos,<br /><span>grandes sonrisas.</span></h1>
            <p className="hero-description">
              Horneamos cada día con ingredientes ricos y mucho amor. Encuentra tu
              próximo postre favorito.
            </p>
            <a className="primary-link" href="#productos">Explorar el menú <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-art" role="img" aria-label="Ilustración de una torta decorada">
            <span className="art-sparkle sparkle-one" aria-hidden="true">✳</span>
            <span className="art-sparkle sparkle-two" aria-hidden="true">✦</span>
            <div className="cake">
              <span className="cake-candle" />
              <span className="cake-top" />
              <span className="cake-icing" />
              <span className="cake-base" />
              <span className="cake-plate" />
            </div>
            <span className="hero-sticker">recién<br />horneado</span>
          </div>
        </section>

        <section className="menu-section" id="productos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NUESTRO MENÚ</p>
              <h2>Un capricho para cada día</h2>
            </div>
            <p className="section-note">Preparado artesanalmente en nuestra cocina.</p>
          </div>

          {isLoading && <p className="status-message" role="status">Cargando nuestros postres...</p>}
          {error && (
            <div className="error-message" role="alert">
              <strong>No pudimos cargar el menú.</strong>
              <p>{error}</p>
              <span>Revisa que la API esté activa o que public/productos.json exista.</span>
            </div>
          )}
          {!isLoading && !error && products.length === 0 && (
            <p className="status-message">Pronto agregaremos nuevos postres al menú.</p>
          )}
          {!isLoading && !error && products.length > 0 && (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="about-section" id="nosotros">
          <span className="about-icon" aria-hidden="true">♡</span>
          <div>
            <p className="eyebrow">DE NUESTRA COCINA A TU MESA</p>
            <h2>Lo simple sabe mejor cuando se hace con cariño.</h2>
          </div>
          <p>Recetas cuidadas, ingredientes frescos y una pizca de alegría en cada bocado.</p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark" aria-hidden="true">DH</span>
          <span>Dulce Horno<small>REPOSTERÍA ARTESANAL</small></span>
        </a>
        <p>Un poquito de dulzura hace grande cualquier día.</p>
        <span>© {new Date().getFullYear()} Dulce Horno</span>
      </footer>
    </div>
  )
}

export default App
