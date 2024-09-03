#!/usr/bin/env node
const http = require('http');
const config = require('./config');

const city = config.city;
const apiKey = config.token;

const options = {
  hostname: 'api.weatherstack.com',
  port: 80,
  path: `/current?access_key=${apiKey}&query=${city}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    data = JSON.parse(data);
    console.log(`Город: ${data.location.name}, ${data.location.country}`);
    console.log(`Температура воздуха: ${data.current.temperature}`);
    console.log(`Сила ветра: ${data.current.wind_speed}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();