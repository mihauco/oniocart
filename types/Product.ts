import ProductOffer from '~/types/ProductOffer'

interface Product {
  from: 'ceneo' | 'allegro',
  image: {
    default: string
  },
  name: string,
  id: string
  priceMin: number,
  currency: string, 
  productUrl?: string
}

export default Product