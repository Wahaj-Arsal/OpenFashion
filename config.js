/** @format */

const dotenv = require("dotenv");
if (process.env.NODE_ENV) {
  dotenv.config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
  });
} else {
  dotenv.config();
}
module.exports = {
  PORT: process.env.PORT,
  STRIPE_TOKEN: process.env.STRIPE_SECURE_TOKEN,
  CLIENT_TOKEN: process.env.REACT_APP_CLIENT_KEY,
};
