import Product from '~/types/Product'
import ProductOffer from '~/types/ProductOffer'

interface ProductSet {
  id: string,
  name: string,
  products: {
    data: Product,
    offers: ProductOffer[]
  }[]
}

export default ProductSet