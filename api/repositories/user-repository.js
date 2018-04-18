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
    }
  }
}

