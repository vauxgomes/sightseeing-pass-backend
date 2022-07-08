// Imports
const express = require('express')
const routes = express.Router()

// Controllers
const UserController = require('./controllers/UserController')
const LocationController = require('./controllers/LocationController')

// System
routes.get('/sys', (req, res) => {
  return res.status(400).json({
    system: 'Passaporte Turístico',
    version: 'Beta',
    author: 'Vaux Gomes'
  })
})

// Users
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

// Locations
routes.get('/locations', LocationController.index)
routes.get('/locations/:id', LocationController.show)
routes.post('/locations', LocationController.create)
routes.put('/locations/:id', LocationController.update)
routes.delete('/locations/:id', LocationController.delete)

module.exports = routes
