import joi from 'joi'

const foodFacilitySchema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().required(),
    type: joi.string().allow(null, ''),
    address: joi.string().required(),
    foodItems: joi.string().required().allow(null, ''),
    locationUrl: joi.string().required()
})

export const foodFacilitiesResponseSchema = joi.array().items(foodFacilitySchema)
