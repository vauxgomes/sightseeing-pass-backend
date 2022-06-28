const knex = require("../database");

// User Controller
module.exports = {
    // GET Index
    async index(req, res) {
        const users = await knex.select("title", "email").from("locations");
        return res.status(200).send(users);
    },

    // GET Show
    async show(req, res) {
        return res.status(200).send({
            success: true,
            msg: "user.show.ok",
        });
    },

    // POST Create
    async create(req, res) {
        try {
            const { name, email, password } = req.body;

            const [id] = await knex("users").insert({
                name,
                email,
                password,
            });

            return res.status(200).send({
                success: true,
                msg: "user.create.ok",
                id,
            });
        } catch (err) {
            return res.status(400).send({
                success: false,
                msg: "user.create.nok",
            });
        }
    },

    // PUT Update
    async update(req, res) {
        return res.status(200).send({
            success: true,
            msg: "user.update.ok",
        });
    },

    // DELETE Delete
    async delete(req, res) {
        return res.status(200).send({
            success: true,
            msg: "user.delete.ok",
        });
    },
};