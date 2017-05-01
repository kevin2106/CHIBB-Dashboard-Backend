'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://kevin2106.eu.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'http://backend.chibb.nl',
    issuer: 'https://kevin2106.eu.auth0.com/',
    algorithms: ['RS256']
});

app.get('/api/sensors/temperature', authCheck, (req,res) => {
  let temperatureSensor = [
  {
    id: 88881,
    temperature: 19.2
  },
  {
    id: 88882,
    temperature: 20.1
  },
  {
    id: 88883,
    temperature: 18.5
  },
  {
    id: 88884,
    temperature: 19.5
  },
  {
    id: 88885,
    temperature: 19.9
  },
  {
    id: 88886,
    temperature: 20.2
  }
  ];
  res.json(temperatureSensor);
})

app.listen(3333);
console.log('Listening on localhost:3333');
