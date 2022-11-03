import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'pl',
    messages: {
      en: {
        'step.search.name': 'Search for product',
        'step.search.description': 'Type in name of product you want to buy.',
        'step.searchresults.name': 'Search results',
        'step.searchresults.description': 'Select products that meets your search criteria.',
        'step.comparison.name': 'Best offers',
        'step.comparison.description.success': 'Here are stores with best total price',
        'step.comparison.description.fail': 'Couldn\'t find stores with all products from your cart.',
        'cart.title': 'Selected products',
        'searchProduct.inputPlaceholder': 'Product name',
        'searchProduct.emptyInputMessage': 'You have to type in some product name.',
        'productCard.priceFrom': 'from',
        'searchResults.setMinMessage': 'You need to select at least 1 product',
        'cart.productSuccessfullyAdded': 'Product set was successfully added to cart.',
        'footer.minProductInfo': 'You need to have at least 2 products in cart',
        'button.backToSearch': 'Back to search',
        'button.removeProduct': 'Remove',
        'button.addSetToCart': 'Add to cart',
        'button.compare': 'Compare',
        'button.searchProduct': 'Search for product',
        'button.resetCart': 'Reset cart',
        'button.goToProduct': 'Go to product',
        'langSelect.name': 'Language'
      },
      pl: {
        'step.search.name': 'Wyszukaj produkt',
        'step.search.description': 'Podaj nazwę produktu który chcesz kupić',
        'step.searchresults.name': 'Wyniki wyszukiwania',
        'step.searchresults.description': 'Wybierz produkty, które pasują do twojego wyszukiwania.',
        'step.comparison.name': 'Najlepsze oferty',
        'step.comparison.description.success': 'Oto sklepy z najlepszą cena sumaryczną',
        'step.comparison.description.fail': 'Nie udało się znaleźć sklepu mającego w ofercie wszystkie produkty z twojego koszyka.',
        'cart.title': 'Twoje produkty',
        'searchProduct.inputPlaceholder': 'Nazwa produktu',
        'searchProduct.emptyInputMessage': 'Musisz podać nazwę jakiegoś produktu.',
        'productCard.priceFrom': 'od',
        'searchResults.setMinMessage': 'Musisz wybrać przynajmniej 1 produkt',
        'cart.productSuccessfullyAdded': 'Zbiór produktów został pomyślnie dodany do koszyka',
        'footer.minProductInfo': 'Musisz mieć przynajmniej dwa produkty w koszyku',
        'button.backToSearch': 'Powrót do wyszukiwania',
        'button.removeProduct': 'Usuń',
        'button.addSetToCart': 'Dodaj do koszyka',
        'button.compare': 'Porównaj',
        'button.searchProduct': 'Szukaj produktu',
        'button.resetCart': 'Resetuj koszyk',
        'button.goToProduct': 'Idź do produktu',
        'langSelect.name': 'Język'
      }
    }
  })

  vueApp.use(i18n)
})