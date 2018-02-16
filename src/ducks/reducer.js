import image from '../media/solarsystem.png'

let initialState = {
  maps: [
    { name: 'Solar System', areas: [{ shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94] }], image },
    { name: 'Map Two', areas: [{ shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94] }], image }
  ]
}

const ADD_AREA_TO_MAP = "ADD_AREA_TO_MAP"

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_AREA_TO_MAP:
      // do I need to be more immutable here?
      state.maps[action.payload.mapIndex].areas.push(action.payload.area)
      return state
    default: return state
  }

}

export function addAreaToMap(area, mapIndex) {
  return {
    type: ADD_AREA_TO_MAP,
    payload: { area, mapIndex }
  }
}