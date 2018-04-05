const humps = require('humps')
const R = require('ramda')

module.exports = pgPool => {
  function getSortedResults(rows, ids, field, isSingleObject) {
    const data = humps.camelizeKeys(rows)
    const groupByField = R.groupBy(function(row) {
      return row[field]
    })
    const groupedFields = groupByField(data)

    return ids.map(id =>  {
      const idArray = groupedFields[id]
      if(idArray) {
        return isSingleObject ? idArray[0] : idArray
      }
      return isSingleObject ? {} : []
    })
  }

  return {
    getUser(userId) {
      return pgPool.query(`
        select * from users
        where user_id = $1
      `, [userId]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },

    getMapForArea(subMapIds) {
      return pgPool.query(`
        select * from maps
        where map_id = ANY($1)
      `, [subMapIds]).then( res => {
        return getSortedResults(res.rows, subMapIds, 'mapId', true)
      })
    },

    getAreas(mapIds) {
      return pgPool.query(`
        select * from areas
        where map_id = ANY($1)
      `, [mapIds]).then(res => {
        return getSortedResults(res.rows, mapIds, 'mapId', false)
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
    
    getEncounterSetsForUser(userIds) {
      return pgPool.query(`
        select * from encounter_sets
        where user_id = ANY($1)
      `, [userIds]).then(res =>  {
        return getSortedResults(res.rows, userIds, 'userId', false)
      })
    },

    getEncounterSetsForMap(mapIds) {
      return pgPool.query(`
        select * from encounter_sets
        join map_encounter_sets 
        on map_encounter_sets.encounter_set_id = encounter_sets.encounter_set_id
        where map_encounter_sets.map_id = ANY($1)
      `, [mapIds]).then(res => {
        return getSortedResults(res.rows, mapIds, 'mapId', false)
      })
    },
  
    getEncounters(encounterSetIds) {
      return pgPool.query(`
        select * from encounters
        where encounter_set_id = ANY($1)
      `, [encounterSetIds]).then(res => {
        return getSortedResults(res.rows, encounterSetIds, 'encounterSetId', false)
      })
    },

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
    }
  }
}