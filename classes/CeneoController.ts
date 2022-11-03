import axios from 'axios'
import Product from '~/types/Product'
import ProductOffer from '~/types/ProductOffer'
import BaseController from '~/classes/BaseController'

class CeneoController extends BaseController {
  private searchUrlTemplate: string = 'https://www.ceneo.pl/;szukaj-{searchQuery};0115-1.htm'
  private productUrlTemplate: string = 'https://www.ceneo.pl/{productId}'
  private ceneoShopProductUrlTemplate: string = 'https://www.ceneo.pl/{urlPart}'

  private scrapSearchResults(html: string): Product[] {
    const ceneoSearchDOM = this.getJSDOM(html)
    const productRows = Array.from(ceneoSearchDOM.window.document.querySelectorAll('.cat-prod-row, .grid-row .grid-item, .cat-prod-box')).splice(0, 10) as HTMLElement[]

    return productRows.map(productRow => {
      const imageEl = productRow.querySelector('.cat-prod-row__foto img, .grid-item__thumb img, .cat-prod-box__picture img')

      return {
        from: 'ceneo',
        name: productRow.querySelector('.cat-prod-row__name span, .grid-item__name span, .cat-prod-box__name span')?.textContent || '',
        id: productRow.dataset.productid,
        priceMin: Number(productRow.querySelector('.cat-prod-row__price .price, .grid-item__offer .price, .cat-prod-box__price .price')?.textContent.replace(/\s+/, '').replace(',', '.') || '0'),
        currency: 'PLN',
        image: {
          default: imageEl?.getAttribute('data-original') || imageEl?.getAttribute('src') || ''
        },
        offers: []
      }
    })
  }

  private scrapProductPage(html: string): ProductOffer[] {
    const ceneoProducPageDOM = this.getJSDOM(html)
    const offerRows = Array.from(ceneoProducPageDOM.window.document.querySelectorAll('.product-offers__list__item')) as HTMLElement[]

    return offerRows.map(offerRow => {
      return {
        id: offerRow.querySelector('.product-offer__container')?.getAttribute('data-id') || '',
        storeName: offerRow.querySelector('.offer-shop-opinions a')?.textContent.replace('Dane i opinie o ', '').replace(/\n/g, '') || '',
        storeImage: {
          default: offerRow.querySelector('.store-logo img')?.getAttribute('data-original') || ''
        },
        currency: 'PLN',
        productPrice: Number(offerRow.querySelector('.product-price .price')?.textContent.replace(/\s+/, '').replace(',', '.') || '0'),
        productUrl: this.ceneoShopProductUrlTemplate.replace('{urlPart}', offerRow.querySelector('.product-offer__container')?.getAttribute('data-click-url') || '')
      }
    }).filter(offer => offer.storeName !== 'allegro.pl')
  }
  
  search(query: string): Promise<Product[]> {
    const formattedQuery = query.toLocaleLowerCase().replace(/[^a-z0-9_ ]/g, ' ').replace(/\s+/, '-')
    const requestUrl = this.searchUrlTemplate.replace('{searchQuery}', formattedQuery)
 
    return axios.get(requestUrl)
      .then(response => {
        return this.scrapSearchResults(response.data)
      })
      .catch(error => {
        console.log(error)
        return []
      })
  }

  getOffersForProduct(productId: string): Promise<ProductOffer[]> {
    const requestUrl = this.productUrlTemplate.replace('{productId}', productId)
    return axios.get(requestUrl)
      .then(response => {
        return this.scrapProductPage(response.data)
      })
      .catch(error => {
        console.log(error)
        return []
      })
  }
}

export default CeneoController