export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  thumbnail: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductsQueryParams {
  q?: string
  limit: number
  skip: number
}
