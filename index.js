const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');

const app = express();

app.use(bodyParser.json())
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

/************************** */
// READ
app.get('/', (req, res) => {
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
})


console.log('Hola Mundo!')
