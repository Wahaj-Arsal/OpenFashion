/** @format */

"use strict";

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 8080;

app.listen(PORT);
app.use(cors());
app.use(express.json());

//******** API THAT GETS Random Id ******** */
app.get("/randomId", (req, res) => {
  const randomIdGenerator = randomUUID();
  res.send(randomIdGenerator);
});
