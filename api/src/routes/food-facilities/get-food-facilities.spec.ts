import supertest from 'supertest'
import { appMock } from '../../test-utils/express-app-mock'
import { prismaMock } from '../../test-utils/db-mock'
import foodFacilitiesRouter from './index'
import { mockFoodFacilities } from '../../test-utils/food-facility-mocks'

const ROUTE = '/food-facilities'
appMock.use(ROUTE, foodFacilitiesRouter)

describe('get-food-facilities', () => {
  it('returns 500 when an internal server error happens', async () => {
    prismaMock.foodFacility.findMany.mockRejectedValue(new Error('error'))
    const response = await supertest(appMock).get(ROUTE)
    expect(response.statusCode).toBe(500)
  })

  it('returns 200 with empty array when there are no food facilities', async () => {
    prismaMock.foodFacility.findMany.mockResolvedValue([])
    const response = await supertest(appMock).get(ROUTE)
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([])
  })

  it('returns 200 with list of food facilities', async () => {
    prismaMock.foodFacility.findMany.mockResolvedValue(
      mockFoodFacilities as any
    )
    const response = await supertest(appMock).get(ROUTE)
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(
      mockFoodFacilities.map((el) => ({
        id: el.id,
        name: el.applicant,
        type: el.facility_type,
        address: `${el.address}, block ${el.block}, lot ${el.lot}`,
        foodItems: el.food_items,
        locationUrl: `https://www.google.com/maps?q=${el.latitude},${el.longitude}`
      }))
    )
  })
})
