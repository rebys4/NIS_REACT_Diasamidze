import { baseApi } from '../../../shared/api/baseApi'
import type { Product, ProductsQueryParams, ProductsResponse } from '../model/types'

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, ProductsQueryParams>({
      query: ({ q, limit, skip }) => ({
        url: q ? '/products/search' : '/products',
        params: {
          q,
          limit,
          skip,
        },
      }),
      providesTags: ['Products'],
    }),
    getProductById: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi
