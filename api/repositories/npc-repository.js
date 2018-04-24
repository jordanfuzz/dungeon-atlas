const humps = require('humps')
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
    },

    addNewNpc({userId, npcName, npcStatBlock, npcDescription, npcRace, npcInventory}) {
      return pgPool.query(`
      insert into npcs(user_id, npc_name, npc_stat_block, npc_description, npc_race, npc_inventory)
      values ($1, $2, $3, $4, $5, $6)
      returning *
      `, [userId, npcName, npcStatBlock, npcDescription, npcRace, npcInventory]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    }
  }
}
