const knex = require('../database')

// User Controller
module.exports = {
  // GET Index
  async index(req, res) {
    const locations = await knex
      .select([
        'title',
        'description',
        'address',
        'latitude',
        'longitude',
        'num_likes',
        'num_comments',
        'users.id as user_id',
        'users.name'
      ])
      .from('locations')
      .innerJoin('users', 'locations.user_id', 'users.id')
      .orderBy('locations.created_at', 'asc')

    return res.status(200).send(locations)
  },

  // GET Show
  async show(req, res) {
    const { id } = req.params

    const location = await knex
      .select([
        'title',
        'description',
        'address',
        'latitude',
        'longitude',
        'num_likes',
        'num_comments',
        'users.id as user_id',
        'users.name'
      ])
      .from('locations')
      .innerJoin('users', 'locations.user_id', 'users.id')
      .where({ 'locations.id': id })
      .first()

    return res.status(200).send(location)
  },

  // POST Create
  async create(req, res) {
    const { title, description, address, latitude, longitude, user_id } =
      req.body

    try {
      const [id] = await knex('locations').insert({
        title,
        description,
        address,
        latitude,
        longitude,
        user_id
      })

      return res.status(200).send({
        id,
        success: true,
        msg: 'location.create.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'location.create.nok'
      })
    }
  },

  // PUT Update
  async update(req, res) {
    const { id } = req.params
    const { title, description, address, latitude, longitude } = req.body

    try {
      await knex('locations')
        .update({ title, description, address, latitude, longitude })
        .where({ id })

      return res.status(200).send({
        success: true,
        msg: 'location.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        msg: 'location.update.nok'
      })
    }
  },

  // DELETE Delete
  async delete(req, res) {
    const { id } = req.params

    try {
      await knex('locations').where({ id }).del()

      return res.status(200).send({
        success: true,
        msg: 'location.delete.ok'
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        msg: 'location.delete.nok'
      })
    }
  }
}
