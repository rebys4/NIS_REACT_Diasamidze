import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGetProductByIdQuery } from '../../entities/product/api/productsApi'
import { ErrorState } from '../../shared/ui/States'
import { FullPageLoader } from '../../shared/ui/FullPageLoader'

const ProductDetailsPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const productId = Number(id)

  const { data, isLoading, isError } = useGetProductByIdQuery(productId, {
    skip: Number.isNaN(productId),
  })

  if (isLoading) {
    return <FullPageLoader />
  }

  if (isError || !data) {
    return <ErrorState />
  }

  return (
    <section className="card">
      <h1>{data.title}</h1>
      <img className="details-image" src={data.thumbnail} alt={data.title} />
      <p>{data.description}</p>
      <p>
        {t('products.price')}: ${data.price}
      </p>
      <p>
        {t('products.rating')}: {data.rating}
      </p>
      <p>
        {t('products.category')}: {data.category}
      </p>
    </section>
  )
}

export default ProductDetailsPage
