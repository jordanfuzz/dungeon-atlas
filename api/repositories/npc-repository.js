const { getSortedResults } = require('../utils')

module.exports = pgPool => {

  return {
    getNpcsForUser(userIds) {
      return pgPool.query(`
        select * from npcs
        where user_id = ANY($1)
      `, [userIds]).then(res => {
        return getSortedResults(res.rows, userIds, 'userId', false)
      })
    },
    
    getNpcsForMap(mapIds) {
      return pgPool.query(`
        select * from npcs
        join map_npcs
        on map_npcs.npc_id = npcs.npc_id
        where map_npcs.map_id = ANY($1)
      `, [mapIds]).then(res => {
        return getSortedResults(res.rows, mapIds, 'mapId', false)
      })
    }
  }
}
