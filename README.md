# Food Facilities

## Setup

### Step 1: Clone repo

- `git clone git@github.com:nbutenko/food-facilities.git`

### Step 2: DB and data setup

- Install [Docker](https://docs.docker.com/get-started/)
- Run `docker-compose up -d` from root - this will set up a Docker container for a postgreSQL DB, create a necessary `food_facility` table, and seed data using CSV

### Step 3: Prisma client setup

- Switch to the `api` folder `cd api`
- Run `npx prisma db pull`
- Run `npx prisma generate`

### Step 4: API setup

- Run `npm i` from `api` folder
- Run `npm start` - `Server running on port 3001` is a good sign!

### Step 5: UI setup

- Run `npm i` from `ui` folder
- Run `npm start` - `Compiled successfully` is a good sign!

### Step 6: Testing

- Run `npm test` from `ui` or `api` folders to run the corresponding tests

# Implementation Details

## Idea 

### Summary

The idea behind this application is simple yet practical: it provides a table listing various food facilities, along with their addresses, the types of food they offer, and links to their locations on a map. 

### Food Randomizer
One of the key features is the food randomizer, designed to help users make quick decisions about where to eat. We often spend too much time deciding on meals, and this feature aims to save that time by randomly selecting a food facility for the day, leaving you with more time to focus on other things.

## Routes
Currently, the application includes a single route:
- `GET /food-facilities` - returns an array containing the list of all food facilities. 
Future iterations may introduce additional routes, such as filtering by food type or location, server-side pagination, etc.

## Out of Scope
At this stage, the application focuses on providing a straightforward desktop experience. Mobile view has been deliberately left out of scope.


