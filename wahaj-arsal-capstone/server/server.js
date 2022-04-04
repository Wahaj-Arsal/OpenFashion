/** @format */

"use strict";

require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { randomUUID } = require("crypto");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
} = require("unique-names-generator");
// import { uniqueNamesGenerator, name } from "unique-names-generator";

const app = express();
const PORT = process.env.PORT || 8080;
const STRIPE_TOKEN = process.env.STRIPE_SECURE_TOKEN;
const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_KEY;
const stripe = require("stripe")(`${STRIPE_TOKEN}`);
const CLIENT_PHONE_NUMBER = process.env.CLIENT_PHONE_NUMBER;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.listen(PORT);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//******** API THAT GETS Random Id ******** */
app.get("/randomId", (req, res) => {
  const randomIdGenerator = randomUUID();
  res.send(randomIdGenerator);
});

//******** API THAT Generated Random Name ******** */
app.get("/randomname", (req, res) => {
  const randomNameGenerator = {
    name: uniqueNamesGenerator({
      dictionaries: [names],
    }),
  };
  res.send(randomNameGenerator);
});

//******** API THAT GETS ALL Home Page Items ******** */
app.get("/", (req, res) => {
  const content = fs.readFileSync("./data/home/home.json");
  res.send(JSON.parse(content));
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

//******** API THAT GETS ALL Store Locator ******** */
app.get("/storelocator", (req, res) => {
  const locations = fs.readFileSync(
    "./data/storeLocations/StoreLocations.json"
  );
  res.send(JSON.parse(locations));
});

//******** API FOR CHECK OUT SESSION ******** */
app.post("/create-checkout-session", async (req, res) => {
  const cartResponse = req.body.cartItem;

  const session = await stripe.checkout.sessions.create({
    line_items: cartResponse,
    mode: "payment",
    success_url: `${CLIENT_TOKEN}/paymentsuccess`,
    cancel_url: `${CLIENT_TOKEN}/paymentcancelled`,
  });
  res.json({ url: session.url });
});

//******** API FOR POSTING REVIEWS ******** */
app.post("/mens/:id/reviews", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const newComment = {
    id: randomUUID(),
    name: req.body.name,
    review: req.body.comment,
    likes: 0,
    timestamp: Date.parse(new Date()),
  };
  console.log(newComment);
  const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));

  for (let i = 0; i < fileContent.length; i++) {
    if (fileContent[i].id == id) {
      const selectedItem = fileContent[i].reviews;
      console.log(selectedItem);
      selectedItem.push(newComment);
      fs.writeFileSync("./data/mens/items.json", JSON.stringify(fileContent));
      res.status(200).json(newComment);
    }
  }
  // res.status(404).json("Video Not Found");
});

//******** API FOR GETTING COMMENTS ******** */
app.get("/mens/:id/reviews", (req, res) => {
  const id = req.params.id;
  const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));
  for (let i = 0; i < fileContent.length; i++) {
    if (fileContent[i].id == id) {
      const selectedItem = fileContent[i].reviews;
      res.status(200).json(selectedItem);
    }
  }
});

//******** API FOR SENDING TEXT ******** */
app.post("/sendtext", (req, res) => {
  const name = req.body.name;
  const question = req.body.question;
  const message = `${name} has a question: ${question}`;
  // console.log(message);
  client.messages
    .create({
      body: message,
      // from: "+17655629095",
      // to: CLIENT_PHONE_NUMBER,
    })
    .then((message) => console.log(message.sid));
  res.send("Message Sent");
});
