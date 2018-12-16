const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//Express Session
app.use(
  session({
    secret: 'whatever',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 100000 }
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Express Messages
app.use(flash());

//Express Validator
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      var namespace = param.split('.');
      var root = namespace.shift();
      var formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

//Local varaibles
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
});

//Using Public Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
