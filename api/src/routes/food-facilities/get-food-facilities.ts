import { Request, Response } from 'express'
import { FoodFacility, Prisma } from '@prisma/client'
import prisma from '../../db'

const getFoodFacilities = async (req: Request, res: Response) => {
  try {
    const foodFacilities: FoodFacility[] = await prisma.foodFacility.findMany({
      orderBy: [{ applicant: 'asc' }]
    })

    return res.status(200).json(
      foodFacilities.map((el) => ({
        id: el.id,
        name: el.applicant,
        type: el.facility_type,
        address: `${el.address}, block ${el.block}, lot ${el.lot}`,
        foodItems: el.food_items,
        locationUrl: `https://www.google.com/maps?q=${el.latitude},${el.longitude}`
      }))
    )
  } catch (error: Prisma.PrismaClientValidationError | any) {
    console.error('get-food-facilities', error)
    return res.status(500).json()
  }
}

export default getFoodFacilities
