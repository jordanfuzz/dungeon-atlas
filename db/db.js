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

    getMapForArea(area) {
      return pgPool.query(`
        select * from maps
        where map_id = $1
      `, [area.subMap]).then( res => {
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
    },
    
    getEncounterSets(user) {
      return pgPool.query(`
        select * from encounter_sets
        where user_id = $1
      `, [user.userId]).then(res =>  {
        return humps.camelizeKeys(res.rows)
      })
    },

    getEncounterSetsByMap(map) {
      return pgPool.query(`
        select * from encounter_sets
        join map_encounter_sets 
        on map_encounter_sets.encounter_set_id = encounter_sets.encounter_set_id
        join maps
        on maps.map_id = map_encounter_sets.map_id
        where map_encounter_sets.map_id = $1
      `, [map.mapId]).then(res => {
        return humps.camelizeKeys(res.rows)
      })
    },
  
    getEncounters(encounterSet) {
      return pgPool.query(`
        select * from encounters
        where encounter_set_id = $1
      `, [encounterSet.encounterSetId]).then(res => {
        return humps.camelizeKeys(res.rows)
      })
    }
  }
}