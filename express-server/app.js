var express = require('express');
var cors = require('cors');
var app = express();
app.use(express.json());
app.listen(3000, () => console.log('Server running on port 3000'));

var ciudades = [
  'paris', 'Barcelona', 'Barranquilla', 'Montevideo', 'Santiago de Chile', 'Mexico DF', 'Nueva York'
];

app.get('/url', (req, res, next) => {
  const search = req.query.q.toString().toLocaleLowerCase();
  res,json(ciudades.filter((c) => c.toLocaleLowerCase().indexOf(search) > -1));
});

var misDestinos = [];
app.get('/my', (req, res, next) => res.json(misDestinos));

app.post('/my', (req, res, next) => {
  console.log(req.body);
  // misDestinos = req.body;
  misDestinos.push(req.body.nuevo);
  res.json(misDestinos);
});

app.get('/api/translation', (req, res, next) => res.json([
  { lang: req.query.lang, key: 'HOLA', value: 'HOLA ' + req.query.lang },
  { lang: req.query.lang, key: 'MUNDO', value: 'MUNDO ' + req.query.lang }
]));