import CeneoController from '~/classes/CeneoController'
const ceneoController  = new CeneoController()

export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { productId } = query as {productId: string}
  const result = await ceneoController.getOffersForProduct(productId)

  return result
})