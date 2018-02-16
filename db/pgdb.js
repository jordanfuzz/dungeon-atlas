module.exports = pgPool => {
  return {
    getUser(user_id) {
      return pgPool.query(`
        select * from users
        where user_id = $1
      `, [user_id]).then(res => {
        return res.rows[0]
      })
    }
  }
}