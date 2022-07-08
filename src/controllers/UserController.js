const knex = require('../database')

// User Controller
module.exports = {
  // GET Index
  async index(req, res) {
    const users = await knex
      .select(['name', 'email', 'thumbnail'])
      .from('users')

    return res.status(200).send(users)
  },

  // GET Show
  async show(req, res) {
    const { id } = req.params

    const user = await knex
      .select(['name', 'email', 'thumbnail'])
      .from('users')
      .where({ id })
      .first()

    return res.status(200).send(user)
  },

  // POST Create
  async create(req, res) {
    const { name, email, password, thumbnail } = req.body

    try {
      const [id] = await knex('users').insert({
        name,
        email,
        password,
        thumbnail
      })

      return res.status(200).send({
        id,
        success: true,
        msg: 'user.create.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'user.create.nok'
      })
    }
  },

  // PUT Update
  async update(req, res) {
    const { id } = req.params
    const { name, email, password, thumbnail } = req.body

    try {
      await knex('users')
        .update({ name, email, password, thumbnail })
        .where({ id })

      return res.status(200).send({
        success: true,
        msg: 'user.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        msg: 'user.update.nok'
      })
    }
  },

  // DELETE Delete
  async delete(req, res) {
    const { id } = req.params

    try {
      await knex('users').where({ id }).del()

      return res.status(200).send({
        success: true,
        msg: 'user.delete.ok'
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        msg: 'user.delete.nok'
      })
    }
  }
}
