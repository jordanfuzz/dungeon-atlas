const humps = require('humps')

module.exports = pgPool => {
  return {
    getUser(userId) {
      return pgPool.query(`
        select * from users
        where user_id = $1
      `, [userId]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    }, 

    getMapForArea(mapId) {
      return pgPool.query(`
        select * from maps
        where map_id = $1
      `, [mapId]).then( res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },

    getAreas(map) {
      return pgPool.query(`
        select * from areas
        where map_id = $1
      `, [map.mapId]).then(res => {
        return humps.camelizeKeys(res.rows)
      })
    },

    getMaps(user) {
      return pgPool.query(`
        select * from maps
        where user_id = $1
      `, [user.userId]).then(res => {
        return humps.camelizeKeys(res.rows)
      })
    }
  }
}