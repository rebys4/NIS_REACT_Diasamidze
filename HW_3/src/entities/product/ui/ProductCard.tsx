import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Product } from '../model/types'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation()

  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>
        {t('products.price')}: ${product.price}
      </p>
      <p>
        {t('products.rating')}: {product.rating}
      </p>
      <p>
        {t('products.category')}: {product.category}
      </p>
      <Link to={`/products/${product.id}`}>{t('products.details')}</Link>
    </article>
  )
}
