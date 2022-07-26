# Staffany Take Home Test - Backend

## Stacks
- Framework: Hapi JS
- ORM: TypeORM
- DB: PostgreSQL

## How to Install
0. Clone this repo
1. `cd <cloned_dir>`
2. `npm i`
3. `cp env.example .env`
4. fill your .env settings with these
```
PORT="3000"

DB_HOST="localhost"
DB_PORT="5432"
DB_USERNAME="<your postgres username>"
DB_PASSWORD="<your postgres password>"
DB_NAME="<your db name>"
```
5. Create a PostgreSQL database with name that you specifies in .env (which is, **DB_NAME**)

## How to run
1. `npm run dev`
2. `npm run test`

## Requirements Checklist
- [x] User should be able to see a list of shifts
- [x] User should be able to see the name, date, start time, end time of each shift
- [x] User should be able to create & update shifts via form
- [x] User should be able to delete shifts
- [ ] User should not be able to create or edit a shift such that is clashing with an existing shift
- [ ] User should be able to "publish" an entire week's worth of shifts at a time
- [ ] User should not be able to edit or delete a shift after it's been "published"
- [ ] User should not be able to create shifts in a "week" that is "published"

## Project Structures

* Database Entities are located inside `./src/database/default/entity/`. Entities contains the database schema.
* Database Repositories are located inside `./src/database/default/repository/`. Repositories contains CRUD Operations.
* Business Logics are located inside `./src/usecases/`
* API Endpoint routing are located inside `./src/routes/`