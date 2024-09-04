import { Router } from 'express'
import validateRequest from '../../middlewares/validate-request'
import validateResponse from '../../middlewares/validate-response'
import getFoodFacilities from './get-food-facilities'
import { foodFacilitiesResponseSchema } from './schema'

const foodFacilitiesRouter = Router()

foodFacilitiesRouter.get(
  '/',
  validateResponse(foodFacilitiesResponseSchema),
  getFoodFacilities
)


export default foodFacilitiesRouter
