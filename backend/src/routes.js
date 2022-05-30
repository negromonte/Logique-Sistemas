const express = require('express');

const UrlController = require('./controllers/UrlController');
const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const RedirectController = require('./controllers/RedirectController');
const routes = express.Router();

routes.get('/url/:code', RedirectController.index);

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);


routes.get('/urls', UrlController.index);
routes.post('/urls',UrlController.create);

module.exports = routes;