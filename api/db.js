const humps = require('humps')
const { getSortedResults } = require('./utils')

module.exports = pgPool => {

  return {  
    addNewMap({ userId, mapName, imageUrl, isMaster}) {
      return pgPool.query(`
        insert into maps(user_id, map_name, image_url, is_master)
        values ($1, $2, $3, $4)
        returning *
      `, [userId, mapName, imageUrl, isMaster]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },

    addNewArea({ mapId, subMap, area}) {
      return pgPool.query(`
      insert into areas(map_id, sub_map, area)
      values ($1, $2, $3)
      returning *
      `, [mapId, subMap, area]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },

    addNewEncounterSet({ userId, title }) {
      return pgPool.query(`
      insert into encounter_sets(user_id, title)
      values ($1, $2)
      returning *
      `, [userId, title]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },

    addNewEncounter({encounterSetId, title, encounterWeight, details}) {
      return pgPool.query(`
      insert into encounters(encounter_set_id, title, encounter_weight, details)
      values ($1, $2, $3, $4)
      returning *
      `, [encounterSetId, title, encounterWeight, details]).then(res => {
        return humps.camelizeKeys(res.rows[0])
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