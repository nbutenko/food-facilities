import { FoodFacilityStatus } from "@prisma/client";
import { FoodFacility } from "../routes/types/FoodFacility";

export const mockFoodFacilities: FoodFacility[] = [
    {
      id: 1,
      location_id: 1795943,
      applicant: 'Antojitos la Patita',
      facility_type: 'Truck',
      cnn: 2842000,
      location_description: 'BEACH ST: TAYLOR ST to JONES ST (400 - 499)',
      address: '450 BEACH ST',
      blocklot: '0012003A',
      block: '0012',
      lot: '003A',
      permit: '24MFF-00007',
      status: FoodFacilityStatus.APPROVED,
      food_items: 'Guatemalan and Mexican FoodMFF - Do not approve without review',
      x: 6007991.1807,
      y: 2122137.01317,
      latitude: 37.80743449558139,
      longitude: '-122.41666095486075',
      schedule: 'http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=24MFF-00007&ExportPDF=1&Filename=24MFF-00007_schedule.pdf',
      days_hours: null,
      noi_sent: null,
      approved: null,
      received: 20240617,
      prior_permit: false,
      expiration_date: null,
      location: '(37.80743449558139, -122.41666095486075)',
      fire_prevention_districts: 5,
      police_districts: 1,
      supervisor_districts: 10,
      zip_codes: 308,
      neighborhoods_old: 23
    },
    {
      id: 2,
      location_id: 1799757,
      applicant: 'Antojitos la Patita',
      facility_type: 'Truck',
      cnn: 8840000,
      location_description: 'MASON ST: BEACH ST to JEFFERSON ST (2600 - 2699)',
      address: '2601 MASON ST',
      blocklot: '0013009',
      block: '0013',
      lot: '009',
      permit: '24MFF-00007',
      status: FoodFacilityStatus.EXPIRED,
      food_items: 'Guatemalan and Mexican FoodMFF - Do not approve without review',
      x: 6008661.386,
      y: 2122235.48514,
      latitude: 37.8077425455166,
      longitude: '-122.41434852163367',
      schedule: 'http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=24MFF-00007&ExportPDF=1&Filename=24MFF-00007_schedule.pdf',
      days_hours: null,
      noi_sent: null,
      approved: null,
      received: 20240617,
      prior_permit: false,
      expiration_date: null,
      location: '(37.8077425455166, -122.41434852163367)',
      fire_prevention_districts: 3,
      police_districts: 1,
      supervisor_districts: 10,
      zip_codes: 308,
      neighborhoods_old: 23
    },
    {
      id: 3,
      location_id: 773105,
      applicant: 'Athena SF Gyro',
      facility_type: 'Push Cart',
      cnn: 417000,
      location_description: '08TH ST: BRANNAN ST to TOWNSEND ST (600 - 699)',
      address: '699 08TH ST',
      blocklot: '3783009',
      block: '3783',
      lot: '009',
      permit: '15MFF-0145',
      status: FoodFacilityStatus.ISSUED,
      food_items: 'Gyro pita bread (Lamb or chicken): lamb over rice: chicken over rice: chicken biryani rice: soft drinks',
      x: 6011509.501,
      y: 2108803.834,
      latitude: 37.771021999243686,
      longitude: '-122.4035462541838',
      schedule: 'http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=15MFF-0145&ExportPDF=1&Filename=15MFF-0145_schedule.pdf',
      days_hours: 'Mo-We:6AM-6PM',
      noi_sent: null,
      approved: null,
      received: 20150901,
      prior_permit: false,
      expiration_date: null,
      location: '(37.771021999243686, -122.4035462541838)',
      fire_prevention_districts: 14,
      police_districts: 2,
      supervisor_districts: 9,
      zip_codes: 28853,
      neighborhoods_old: 34
    }
  ]
