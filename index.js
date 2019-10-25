const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const passport = require('passport');
const authJWT = require('passport-jwt');

const jwtOptions = {
  secretOrKey: 'SECRET_KEY',
  jwtFromRequest: authJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

let jwtStrategy = new authJWT.Strategy({ ...jwtOptions }, (jwtPayload, next)=> {
  // usuarioDelPayLoad
  console.log(jwtPayload);
  next(null, {
    id: jwtPayload.id
  });
});

passport.use(jwtStrategy);

const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');

const logger = require('./resources/lib/logger');

const app = express();

app.use(bodyParser.json());
app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

/************************** */
// READ
app.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  console.log(req.user);
  res.status(200).send('Hola papu');
});

// CREATE
app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

// UPDATE
app.put('/', () => {})

// DESTROY
app.delete('/', () => {})

// CRUD
// Create
// Read
// Update
// Destroy


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Nuestra app esta escuchando el puerto ${PORT}`);
});