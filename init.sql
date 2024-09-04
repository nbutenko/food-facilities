-- create ENUM type for status
CREATE TYPE "food_facility_status" AS ENUM (
    'REQUESTED',
    'ISSUED',
    'APPROVED',
    'SUSPEND',
    'EXPIRED'
);

-- create `food_facility` table
CREATE TABLE
    "food_facility" (
        "id" SERIAL NOT NULL,
        "location_id" INTEGER,
        "applicant" TEXT,
        "facility_type" TEXT,
        "cnn" INTEGER,
        "location_description" TEXT,
        "address" TEXT,
        "blocklot" TEXT,
        "block" TEXT,
        "lot" TEXT,
        "permit" TEXT,
        "status" "food_facility_status" NOT NULL,
        "food_items" TEXT,
        "x" DECIMAL(65, 30),
        "y" DECIMAL(65, 30),
        "latitude" DECIMAL(65, 30),
        "longitude" TEXT,
        "schedule" TEXT,
        "days_hours" TEXT,
        "noi_sent" TEXT,
        "approved" TIMESTAMP(3),
        "received" INTEGER,
        "prior_permit" BOOLEAN,
        "expiration_date" TIMESTAMP(3),
        "location" TEXT,
        "fire_prevention_districts" DECIMAL(65, 30),
        "police_districts" DECIMAL(65, 30),
        "supervisor_districts" DECIMAL(65, 30),
        "zip_codes" DECIMAL(65, 30),
        "neighborhoods_old" DECIMAL(65, 30),
        CONSTRAINT "food_facility_pkey" PRIMARY KEY ("id")
    );

-- copy data into `food_facility`
COPY food_facility (
    location_id,
    applicant,
    facility_type,
    cnn,
    location_description,
    address,
    blocklot,
    block,
    lot,
    permit,
    status,
    food_items,
    x,
    y,
    latitude,
    longitude,
    schedule,
    days_hours,
    noi_sent,
    approved,
    received,
    prior_permit,
    expiration_date,
    location,
    fire_prevention_districts,
    police_districts,
    supervisor_districts,
    zip_codes,
    neighborhoods_old
)
FROM
    '/docker-entrypoint-initdb.d/data/Mobile_Food_Facility_Permit.csv' DELIMITER ',' CSV HEADER QUOTE '"';