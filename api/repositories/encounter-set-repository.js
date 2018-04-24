const humps = require('humps')
const { getSortedResults } = require('../utils')

module.exports = pgPool => {

  return {
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

    addNewEncounterSet({ userId, title }) {
      return pgPool.query(`
      insert into encounter_sets(user_id, title)
      values ($1, $2)
      returning *
      `, [userId, title]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    }
  }
}

