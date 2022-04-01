/** @format */

"use strict";

// import items from "./data/items";
const path = require("path");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { randomUUID } = require("crypto");
const stripe = require("stripe")(
  "sk_test_51KjOyzIMx3ChqAD6Gdu3zJCmoqvCRr9Gw8uE8XqzjLnMK4VMRv2DbTe1NMxsNqBe7jaPF7mpS7blFwSlHcUzG6gS00cYrjeoaY"
);
const multer = require("multer");

// const mensItemsJSON = path.join(__dirname, "./data/mens/items.json");
// const items = require(mensItemsJSON);

const app = express();
const PORT = 8080;

app.listen(PORT);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

//******** API FOR CHECK OUT SESSION ******** */
app.post("/create-checkout-session", async (req, res) => {
  const cartResponse = req.body.cartItem;

  const session = await stripe.checkout.sessions.create({
    line_items: cartResponse,
    mode: "payment",
    success_url: `http://localhost:3000/paymentsuccess`,
    cancel_url: `http://example.com/cancel`,
  });
  res.json({ url: session.url });
});
