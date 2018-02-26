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

    getMaps(user) {
      return pgPool.query(`
        select * from maps
        where user_id = $1
      `, [user.userId]).then(res => {
        console.log(user.userId)
        return humps.camelizeKeys(res.rows)
      })
    }
  }
}