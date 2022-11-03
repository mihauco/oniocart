import CeneoController from '~/classes/CeneoController'
// import AllegroController from '~/classes/AllegroController'

const ceneoController  = new CeneoController()
// const allegroController = new AllegroController()

export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { searchQuery } = query as {searchQuery: string}
  const result = await ceneoController.search(searchQuery)
  // const allegroResult = await allegroController.search(searchQuery)

  return result
})