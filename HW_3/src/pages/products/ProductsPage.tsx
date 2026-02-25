import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGetProductsQuery } from '../../entities/product/api/productsApi'
import { ProductCard } from '../../entities/product/ui/ProductCard'
import { useAppSelector } from '../../shared/lib/hooks'
import { selectPageSize } from '../../features/settings/model/settingsSlice'
import { EmptyState, ErrorState } from '../../shared/ui/States'
import { FullPageLoader } from '../../shared/ui/FullPageLoader'

const ProductsPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageSize = useAppSelector(selectPageSize)

  const q = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page
  const skip = (safePage - 1) * pageSize

  const [searchValue, setSearchValue] = useState(q)

  const { data, isLoading, isError } = useGetProductsQuery({
    q: q || undefined,
    limit: pageSize,
    skip,
  })

  const totalPages = useMemo(() => {
    if (!data?.total) {
      return 1
    }
    return Math.max(1, Math.ceil(data.total / pageSize))
  }, [data?.total, pageSize])

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (searchValue.trim()) {
      next.set('q', searchValue.trim())
    } else {
      next.delete('q')
    }
    next.set('page', '1')
    setSearchParams(next)
  }

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  return (
    <section>
      <h1>{t('products.title')}</h1>

      <form className="toolbar" onSubmit={submitSearch}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={t('products.search')}
        />
        <button type="submit">{t('products.searchButton')}</button>
      </form>

      {isLoading ? <FullPageLoader /> : null}
      {isError ? <ErrorState /> : null}

      {!isLoading && !isError && data?.products.length === 0 ? <EmptyState text={t('products.noProducts')} /> : null}

      <div className="products-grid">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button type="button" onClick={() => setPage(safePage - 1)} disabled={safePage <= 1}>
          {t('products.prev')}
        </button>
        <span>
          {t('products.page')}: {safePage}/{totalPages}
        </span>
        <button type="button" onClick={() => setPage(safePage + 1)} disabled={safePage >= totalPages}>
          {t('products.next')}
        </button>
      </div>
    </section>
  )
}

export default ProductsPage
