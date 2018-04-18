const humps = require('humps')
const R = require('ramda')


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

module.exports = {
  getSortedResults
}