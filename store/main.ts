import { defineStore } from 'pinia'
import Product from '~/types/Product'
import ProductOffer from '~/types/ProductOffer'
import ProductSet from '~/types/ProductSet'
import StoreOffer from '~/types/StoreOffer'
import { $fetch } from 'ohmyfetch'
import generateRandomId from '~/helpers/generateRandomId'
import { off } from 'process'

export type MainState = {
  view: 'SEARCH' | 'SELECT_PRODUCT' | 'COMPARISON'
  searchResults: Product[],
  cartSets: ProductSet[],
  lastSearchQuery: string,
  searchPending: boolean,
  addToCartPending: boolean,
  showAddedToCartDialog: boolean,
  bestOffers: StoreOffer[]
}

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    view: 'SEARCH',
    searchResults: [],
    cartSets: [],
    lastSearchQuery: '',
    searchPending: false,
    addToCartPending: false,
    showAddedToCartDialog: false,
    bestOffers: []
  } as MainState),
  actions: {
    async searchProduct(searchQuery: string) {
      this.searchPending = true
      this.lastSearchQuery = searchQuery
      this.searchResults = await $fetch(`/api/search-product?searchQuery=${searchQuery}`) as Product[]
      this.searchPending = false

      if (this.searchResults.length) {
        this.view = 'SELECT_PRODUCT'
      }
    },
    async addSetToCart(name: string, productIds: string[]) {
      this.addToCartPending = true

      const productSet: ProductSet = {
        id: generateRandomId(),
        name: name,
        products: []
      }

      const offersSet = await Promise.all(productIds.map(productId => $fetch(`/api/offers?productId=${productId}`))) as ProductOffer[][]

      for (let index in productIds) {
        const productWithOffers: {data: Product, offers: ProductOffer[]} = {
          data: this.searchResults.find(product => product.id === productIds[index]),
          offers: []
        }

        if (productWithOffers.data) {
          productWithOffers.offers = offersSet[index]
          productSet.products.push(productWithOffers)
        }
      }

      this.cartSets.push(productSet)
      this.showAddedToCartDialog = true
    },
    removeSetFromCart(setId: string) {
      const setIndex = this.cartSets.findIndex((set: Product) => set.id === setId)

      if (setIndex >= 0) {
        this.cartSets.splice(setIndex, 1)
      }
    },
    goBackToSearch() {
      this.addToCartPending = false
      this.showAddedToCartDialog = false
      this.view = 'SEARCH'
    },
    compareProducts() {
      this.addToCartPending = false
      this.showAddedToCartDialog = false
      this.findBestOffers()
    },
    findBestOffers() {
      if (this.cartSets.length < 2) return

      const constructOffers = (partialOffer: StoreOffer | null, currentSetIndex: number, offers: StoreOffer[]) => {
        if (!partialOffer) {
          for (const product of this.cartSets[currentSetIndex].products as {data: Product, offers: ProductOffer[]}[]) {
            for (const offer of product.offers) {
              const productClone: Product = JSON.parse(JSON.stringify(product.data))
              productClone.priceMin = offer.productPrice
              productClone.productUrl = offer.productUrl

              partialOffer = {
                id: generateRandomId(),
                storeName: offer.storeName,
                storeImage: offer.storeImage,
                currency: 'PLN',
                totalPrice: offer.productPrice,
                products: [
                  productClone
                ]
              }

              constructOffers(partialOffer, currentSetIndex + 1, offers)
            }
          }
        } else {
          for (const product of this.cartSets[currentSetIndex].products as {data: Product, offers: ProductOffer[]}[]) {
            const sameStoreOffer = product.offers.find(offer => offer.storeName === partialOffer.storeName)

            if (!sameStoreOffer) return

            const partialOfferClone: StoreOffer = JSON.parse(JSON.stringify(partialOffer))
            const proudctClone: Product = JSON.parse(JSON.stringify(product.data))
            proudctClone.priceMin = sameStoreOffer.productPrice
            proudctClone.productUrl = sameStoreOffer.productUrl
            partialOfferClone.totalPrice += sameStoreOffer.productPrice
            partialOfferClone.products.push(proudctClone)
            partialOfferClone.id = generateRandomId()

            if (this.cartSets[currentSetIndex + 1]) {
              constructOffers(partialOfferClone, currentSetIndex + 1, offers)
            } else {
              offers.push(partialOfferClone)
            }
          }
        }
      }

      const notSortedBestOffers: StoreOffer[] = []

      constructOffers(null, 0, notSortedBestOffers)

      this.bestOffers = notSortedBestOffers.sort((offer1, offer2) => offer1.totalPrice < offer2.totalPrice ? -1 : 1)
      this.view = 'COMPARISON'
    },
    resetCart() {
      this.view = 'SEARCH'
      this.bestOffers = []
      this.cartSets = []
    }
  }
})