const express = require('express');
const uuidv4 = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateUsers = require('./users.validate');
let users = require('../../db').users;
const logger = require('../lib/logger');

const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
	logger.info('Se obtuvo los usuarios');
	res.json(users);
});

usersRoutes.post('/', validateUsers, (req, res) => {
	const hp = bcrypt.hashSync(req.body.password, 10);
	const newUser = { ...req.body, id: uuidv4(), password: hp };
	try {
		users.push(newUser);
		res.json(newUser);
	} catch (error) {
		logger.error('No se pudo obtener la DB');
	}
});

usersRoutes.put('/:id', (req, res) => {
	const filterUser = users.filter(user => user.id === req.params.id)[0];
	const updatedUser = { ...filterUser, ...req.body };
	logger.info('Se actualizo con exito al usuario');
	res.json(updatedUser);
});

usersRoutes.delete('/:id', (req, res) => {
	const filterUser = users.filter(user => user.id === req.params.id)[0];
	const userWithoutSelected = users.filter(user => user.id !== req.params.id)[0];
	users = userWithoutSelected;
	res.json({filterUser,message: `Se elimino a ${filterUser.name}`});
});

usersRoutes.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = users.filter(user => user.username === username)[0];
	const isAuthenticated = bcrypt.compareSync(password, user.password);

	if (isAuthenticated) {
		const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '10h' });
		res.json({ token });
	} else {
		res.status(401).send('Verifica tu password');
	}
});

module.exports = usersRoutes;