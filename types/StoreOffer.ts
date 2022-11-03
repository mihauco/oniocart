import Product from '~/types/Product'

interface StoreOffer {
  id: string,
  storeName: string,
  storeImage: {
    default: string
  },
  currency: 'PLN',
  totalPrice: number,
  products: Product[]
}

export default StoreOffer
