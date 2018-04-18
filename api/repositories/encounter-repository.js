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
  }
}



