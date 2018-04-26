import image from '../media/solarsystem.png'
import { buildMapObject } from '../builder-functions'

let initialState = {
  maps: []
  // maps: [
  //   { name: 'Solar System', areas: [{ shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94] }], image },
  //   { name: 'Map Two', areas: [{ shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94] }], image }
  // ]
}

const ADD_AREA_TO_MAP = "ADD_AREA_TO_MAP"
const GET_MAPS_FOR_USER = "GET_MAPS_FOR_USER"

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_AREA_TO_MAP:
      // do I need to be more immutable here?
      state.maps[action.payload.mapIndex].areas.push(action.payload.area)
      return state
    case GET_MAPS_FOR_USER + "_PENDING":
      return state
    case GET_MAPS_FOR_USER + "_FULFILLED":
      let newMaps = buildMapObject(action.payload.user.maps)
      return Object.assign({}, state, {maps: newMaps})
    default: 
      return state
  }
}

export function addAreaToMap(area, mapIndex) {
  return {
    type: ADD_AREA_TO_MAP,
    payload: { area, mapIndex }
  }
}

export function getMapsForUser(promise) {
  return {
    type: GET_MAPS_FOR_USER,
    payload: promise
  }
}