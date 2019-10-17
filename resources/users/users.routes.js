const express = require('express');
const uuidv4 = require('uuid');

const validateUsers = require('./users.validate');

let users = require('../../db').users;

const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
	res.json(users);
});

usersRoutes.post('/', validateUsers, (req, res) => {
	const newUser = { ...req.body, id: uuidv4() };
	users.push(newUser);
	res.json(newUser);
});

usersRoutes.put('/:id', (req, res) => {
	const filterUser = users.filter(user => user.id === req.params.id)[0];
	const updatedUser = { ...filterUser, ...req.body };
	res.json(updatedUser);
});

usersRoutes.delete('/:id', (req, res) => {
	const filterUser = users.filter(user => user.id === req.params.id)[0];
	const userWithoutSelected = users.filter(user =>user.id !== req.params.id)[0];
	users = userWithoutSelected;
	res.json(filterUser);
});

module.exports = usersRoutes;