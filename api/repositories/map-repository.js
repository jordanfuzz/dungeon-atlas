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
    
  }
}