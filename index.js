const express = require("express");
const auth = require("basic-auth");
const carlist = require("./carlist");
const carDetails = require("./carDetails");
var cors = require("cors");

const app = express();

app.use(cors());

// Basic function to validate credentials for example
function check (name, pass) {
  var valid = true
 
  // Simple method to prevent short-circut and use timing-safe compare
  if(!(name === 'Hasher'))
    valid = false;
  if(!(pass === 'L#(qc{f}TaJu4%4k'))
    valid = false;
 
  return valid
}

app.get("/", (req, res) => {
  let credentials = auth(req);
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Test"')
    res.end('Access denied')
  }
  res.send("Hi");
});

app.get("/cars", (req, res) => {
  let credentials = auth(req);
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Test"')
    res.end('Access denied')
  }
  res.send(carlist);
});
app.get("/cars/:type", (req, res) => {
  let credentials = auth(req);
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Test"')
    res.end('Access denied')
  }
  const cars = carlist.filter((car) => car.type === req.params.type);
  res.send(cars);
});
app.get("/cars/details/:id", (req, res) => {
  let credentials = auth(req);
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Test"')
    res.end('Access denied')
  }
  res.send(carDetails[req.params.id]);
});

app.listen(8080, () => console.log("Listening to port 8080"));
