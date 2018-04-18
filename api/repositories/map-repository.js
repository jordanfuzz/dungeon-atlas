const humps = require('humps')

module.exports = pgPool => {

  return {
    getMapForArea(subMapIds) {
      return pgPool.query(`
        select * from maps
        where map_id = ANY($1)
      `, [subMapIds]).then( res => {
        return getSortedResults(res.rows, subMapIds, 'mapId', true)
      })
    },

    getMapsForUser(userIds) {
      return pgPool.query(`
        select * from maps
        where user_id = ANY($1)
      `, [userIds]).then(res => {
        return getSortedResults(res.rows, userIds, 'userId', false)
      })
    },

    addNewMap({ userId, mapName, imageUrl, isMaster}) {
      return pgPool.query(`
        insert into maps(user_id, map_name, image_url, is_master)
        values ($1, $2, $3, $4)
        returning *
      `, [userId, mapName, imageUrl, isMaster]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    }
    
  }
}