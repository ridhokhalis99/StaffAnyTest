# Staffany Take Home Test - Frontend

This repo was generated with Create React App

## Stacks

- Framework: ReactJS
- UI Library: Material UI
- State management: Redux

## How to Install

0. Clone this repo
1. `cd <cloned_dir>`
2. `npm i`
3. `cp env.example .env`
4. fill your .env settings with these.

```
PORT=8080
REACT_APP_API_BASE_URL="http://localhost:3000/api/v1"
```

## How to run

1. `npm start`

## Requirements Checklist

- [x] User should be able to see a list of shifts
- [x] User should be able to see the name, date, start time, end time of each shift
- [x] User should be able to create & update shifts via form
- [x] User should be able to delete shifts
- [x] User should be able to see a week selector. And shifts should be displayed according to the selected week.
- [x] User should not be able to create or edit a shift such that is clashing with an existing shift
- [x] User should be able to "publish" an entire week's worth of shifts at a time
- [x] User should not be able to edit or delete a shift after it's been "published"
- [x] User should not be able to create shifts in a "week" that is "published"
