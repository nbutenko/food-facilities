import { FoodFacilityStatus } from "@prisma/client"

export interface FoodFacility {
  id: number
  location_id: number | null
  applicant: string
  facility_type: string | null
  cnn: number
  location_description: string | null
  address: string | null
  blocklot: string | null
  block: string | null
  lot: string | null
  permit: string | null
  status: FoodFacilityStatus
  food_items: string | null
  x: number
  y: number
  latitude: number
  longitude: string
  schedule: string | null
  days_hours: string | null
  noi_sent: string | null
  approved: number | null
  received: number | null
  prior_permit: boolean | null
  expiration_date: number | null
  location: string | null
  fire_prevention_districts: number | null
  police_districts: number | null
  supervisor_districts: number | null
  zip_codes: number | null
  neighborhoods_old: number | null
}
