const humps = require('humps')

module.exports = pgPool => {

  return {
    getAreas(mapIds) {
      return pgPool.query(`
        select * from areas
        where map_id = ANY($1)
      `, [mapIds]).then(res => {
        return getSortedResults(res.rows, mapIds, 'mapId', false)
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

