/** @format */

import "./SendText.scss";

import { useState } from "react";
import axios from "axios";

function SendText({ SERVER_KEY_URL }) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");

  const sendTextToServer = async () => {
    const newText = {
      name: name,
      question: question,
    };
    await axios
      .post(`${SERVER_KEY_URL}/sendtext`, newText)
      .then((response) => {});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else {
      setQuestion(value);
    }
  };

  return (
    <>
      <h3 className="text__title">Send us a text</h3>
      <section className="text">
        <div className="text__name">
          <p className="text__label">Name:</p>
          <input
            className="text__input"
            name="name"
            placeholder="e.g. Larry"
            onChange={handleChange}
          ></input>
        </div>
        <div className="text__question">
          <p className="text__label">Question:</p>
          <textarea
            className="text__input text__input--question"
            name="question"
            placeholder="e.g. How do I get home if the 360's aren't for turning around?"
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="text__button" onClick={sendTextToServer}>
          Send Text
        </button>
      </section>
    </>
  );
}

export default SendText;
