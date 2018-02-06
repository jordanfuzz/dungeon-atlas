import store from '../store'
import { addAreaToMap } from '../ducks/reducer'

export function dispatchAddAreaToMap(area, mapIndex) {
  store.dispatch(addAreaToMap(area, mapIndex))
  console.log("Dispatched!!",area)
}