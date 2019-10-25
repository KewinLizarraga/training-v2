const Joi = require('@hapi/joi');

const userSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	username: Joi.string().min(2).max(20).required(),
	password: Joi.string().min(2).max(50).required()
});

const validateUser = (req ,res ,next) => {
	const validation = userSchema.validate(req.body);

	if (validation.error) {
		return res.status(403).send('Verifica tus datos')
	}
	next();
}

module.exports = validateUser;