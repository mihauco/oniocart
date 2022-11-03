interface ProductOffer {
  id: string,
  storeName: string,
  storeImage: {
    default: string
  },
  currency: string,
  productPrice: number,
  productUrl: string
}

export default ProductOffer