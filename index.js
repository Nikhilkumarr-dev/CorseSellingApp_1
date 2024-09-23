const express = require('express');
const {createUserRoute} = require("./routes/user")

const app = express();
const jwt = require('jsonwebtoken');

createUserRoute(app)
createCourseRoute(app)

app.listen(3000);