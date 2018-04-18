const humps = require('humps')

module.exports = pgPool => {
  return {
    getEncounters(encounterSetIds) {
      return pgPool.query(`
        select * from encounters
        where encounter_set_id = ANY($1)
      `, [encounterSetIds]).then(res => {
        return getSortedResults(res.rows, encounterSetIds, 'encounterSetId', false)
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
    }
  }
}



