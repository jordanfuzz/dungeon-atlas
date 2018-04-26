import store from '../store'
import { addAreaToMap, getMapsForUser } from '../ducks/reducer'
import { request } from 'graphql-request'

const apiUrl = 'http://localhost:3002/graphql'

export function dispatchAddAreaToMap(area, mapIndex) {
  store.dispatch(addAreaToMap(area, mapIndex))
}

export function dispatchGetMapsForUser(userId) {
  const mapQuery = `{
    user(id:${userId}) {
      maps {
        mapName
        imageUrl
        areas {
          area
        }
      }
    }
  }`

  let promise = request(apiUrl, mapQuery)
  store.dispatch(getMapsForUser(promise))
}