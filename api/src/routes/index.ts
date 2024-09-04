import { Router } from 'express'
import foodFacilitiesRouter from './food-facilities'

const apiRoutes = Router()

const routes = [
  {
    name: '/food-facilities',
    controller: foodFacilitiesRouter
  }
]

routes.forEach(({ name, controller }) => {
  Array.isArray(controller)
    ? controller.forEach((routeController) => {
        apiRoutes.use(name, routeController)
      })
    : apiRoutes.use(name, controller)
})

export default apiRoutes
