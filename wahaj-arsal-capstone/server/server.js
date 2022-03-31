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

//******** API THAT GETS ALL Mens Items ******** */
app.get("/mens", (req, res) => {
  const content = fs.readFileSync("./data/mens/items.json");
  res.send(JSON.parse(content));
});

//******** API THAT GETS One Mens Items ******** */
app.get("/mens/:mensId", (req, res) => {
  const mensSingleItemId = req.params.mensId;
  const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));

  for (let i = 0; i < fileContent.length; i++) {
    if (fileContent[i].id == mensSingleItemId) {
      res.status(200).send(fileContent[i]);
    }
  }
});
