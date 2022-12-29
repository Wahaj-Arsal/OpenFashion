/** @format */

"use strict";

const dotenv = require("dotenv");
if (process.env.NODE_ENV) {
  dotenv.config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
  });
} else {
  dotenv.config();
}
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { randomUUID } = require("crypto");
const { uniqueNamesGenerator, names } = require("unique-names-generator");

const app = express();
const PORT = process.env.PORT;
const STRIPE_TOKEN = process.env.STRIPE_SECURE_TOKEN;
const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_KEY;
const stripe = require("stripe")(`${STRIPE_TOKEN}`);
const CLIENT_PHONE_NUMBER = process.env.CLIENT_PHONE_NUMBER;
// console.log(PORT);

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

app.listen(PORT, () => {
  console.log("Server Is Running " + `${PORT}`);
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${CLIENT_TOKEN}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.static(__dirname + "public"));

//******** API THAT GETS Random Id ******** */
app.get(
  "/randomId",
  (req, res) => {
    const randomIdGenerator = randomUUID();
    res.send(randomIdGenerator);
  },
  () => {
    console.log("RandomID Crash");
  }
);

//******** API THAT Generated Random Name ******** */
app.get(
  "/randomname",
  (req, res) => {
    const randomNameGenerator = {
      name: uniqueNamesGenerator({
        dictionaries: [names],
      }),
    };
    res.send(randomNameGenerator);
  },
  () => {
    console.log("Random Name Crash");
  }
);

//******** API THAT GETS ALL Home Page Items ******** */
// app.get(
//   "/",
//   (req, res) => {
//     // const content = fs.readFileSync("./data/home/home.json");
//     // res.send(JSON.parse(content));
//     res.send("<h1>Hello World</h1>");
//   },
//   () => {
//     console.log("Get / Crash");
//   }
// );

//******** API THAT GETS ALL Mens Items ******** */
app.get(
  "/mens",
  (req, res) => {
    const content = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    res.send(content);
  },
  () => {
    console.log("Get Mens Crash");
  }
);

app.get(
  "/womens",
  (req, res) => {
    const content = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    res.send(content);
  },
  () => {
    console.log("Get Mens Crash");
  }
);

//******** API THAT GETS Mens Featured Items ******** */
app.get(
  "/mensLatest",
  (req, res) => {
    const content = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    const featuredItems = content.filter((items) => items.featured === "Yes");
    res.send(featuredItems);
  },
  () => {
    console.log("Get Mens Crash");
  }
);

// //******** API THAT GETS Mens Featured Items ******** */
app.post(
  "/newsletter",
  (req, res) => {
    const { name, email } = req.body;
    console.log(name);
    console.log(email);
    const content = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    const featuredItems = content.filter((items) => items.featured === "Yes");
    res.send(featuredItems);
  },
  () => {
    console.log("Get Mens Crash");
  }
);

//******** API THAT GETS One Mens Items ******** */
app.get(
  "/mens/:mensId",
  (req, res) => {
    const mensSingleItemId = req.params.mensId;
    const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i].id == mensSingleItemId) {
        res.status(200).send(fileContent[i]);
      }
    }
  },
  () => {
    console.log("Mens Item ID crash");
  }
);

//******** API THAT GETS One Womens Items ******** */
app.get(
  "/womens/:mensId",
  (req, res) => {
    const mensSingleItemId = req.params.mensId;
    const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i].id == mensSingleItemId) {
        res.status(200).send(fileContent[i]);
      }
    }
  },
  () => {
    console.log("Mens Item ID crash");
  }
);

//******** API THAT GETS ALL Store Locator ******** */
app.get(
  "/storelocator",
  (req, res) => {
    const locations = fs.readFileSync(
      "./data/storeLocations/StoreLocations.json"
    );
    res.send(JSON.parse(locations));
  },
  () => {
    console.log("Store Locator Crash");
  }
);

//******** API FOR CHECK OUT SESSION ******** */
app.post(
  "/create-checkout-session",
  async (req, res) => {
    const cartResponse = req.body.cartItem;
    const session = await stripe.checkout.sessions.create({
      line_items: cartResponse,
      mode: "payment",
      success_url: `${CLIENT_TOKEN}/paymentsuccess`,
      cancel_url: `${CLIENT_TOKEN}/paymentcancelled`,
    });
    res.json({ url: session.url });
  },
  () => {
    console.log("Create Checkout Session Crash");
  }
);

//******** API FOR POSTING REVIEWS ******** */
app.post(
  "/mens/:id/reviews",
  (req, res) => {
    const id = req.params.id;
    const newComment = {
      name: req.body.name,
      review: req.body.comment,
      likes: 0,
      timestamp: Date.parse(new Date()),
    };
    const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));

    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i].id == id) {
        const selectedItem = fileContent[i].reviews;
        selectedItem.push(newComment);
        fs.writeFileSync("./data/mens/items.json", JSON.stringify(fileContent));
        res.status(200).json(newComment);
      }
    }
    res.status(404).json("Review Not Found");
  },
  () => {
    console.log("Mens Review Post Crash");
  }
);

//******** API FOR GETTING COMMENTS ******** */
app.get(
  "/mens/:id/reviews",
  (req, res) => {
    const id = req.params.id;
    const fileContent = JSON.parse(fs.readFileSync("./data/mens/items.json"));
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i].id == id) {
        const selectedItem = fileContent[i].reviews;
        res.status(200).json(selectedItem);
      }
    }
  },
  () => {
    console.log("Mens Reviews Get Crash");
  }
);

//******** API FOR SENDING TEXT ******** */
// app.post("/sendtext", (req, res) => {
//   const name = req.body.name;
//   const question = req.body.question;
//   const message = `${name} has a question: ${question}`;
//   client.messages
//     .create({
//       body: message,
//       from: "+17655629095",
//       to: CLIENT_PHONE_NUMBER,
//     })
//     .then((message) => console.log(message.sid));
//   res.send("Message Sent");
// });
