import axios from 'axios'
import Product from '~/types/Product'
// import ProductOffer from '~/types/ProductOffer'
import BaseController from '~/classes/BaseController'

class AllegroController extends BaseController {
  private searchUrlTemplate: string = 'https://allegro.pl/listing?string={searchQuery}'

  private scrapSearchResults(html: string): Product[] {
    const allegroSearchDOM = this.getJSDOM(html)
    const productRows = (Array.from(allegroSearchDOM.window.document.querySelectorAll('article:not([data-analytics-view-custom-context="SPONSORED"])')) as HTMLElement[])
      .filter(productRow => !productRow.getAttribute('data-analytics-view-custom-product-offer-url')?.match('allegrolokalnie'))
      .splice(0, 10) as HTMLElement[]

    return productRows.map(productRow => {
      const firstLink = productRow.querySelector('a')
      const firstImage = firstLink?.querySelector('img') || null
      const headline2 = productRow.querySelector('h2')
      const price = productRow.querySelector('span[aria-label$="aktualna cena"]')?.textContent.replace(/\szł/, '') || '0'
      return {
        from: 'allegro',
        image: {
          default: firstImage?.src || ''
        },
        name: headline2?.textContent || '',
        id: productRow.getAttribute('data-analytics-view-value'),
        priceMin: Number(price.replace(',', '.')),
        currency: 'PLN',
        productUrl: firstLink?.href || ''
      }
    })
  }

  search(query: string): Promise<Product[]> {
    const requestUrl = this.searchUrlTemplate.replace('{searchQuery}', encodeURI(query))

    return axios.get(requestUrl, {headers: {'accept': 'text/html'}})
      .then(response => {
        return this.scrapSearchResults(response.data)
      })
      .catch((error) => {
        console.log(error)
        return []
      })
  }
}

export default AllegroController