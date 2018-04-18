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
  }
}

