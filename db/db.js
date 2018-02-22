const humps = require('humps')

module.exports = pgPool => {
  return {
    getUser(user_id) {
      return pgPool.query(`
        select * from users
        where user_id = $1
      `, [user_id]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    }
  }
}