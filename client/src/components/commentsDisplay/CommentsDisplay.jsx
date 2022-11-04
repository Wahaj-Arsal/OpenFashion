/** @format */

import "./CommentsDisplay.scss";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function CommentsDispaly({ reviews, newMoment }) {
  return (
    <>
      <div className="display-container">
        <div className="display">
          <div className="display__name">
            <h3 className="display__name-title">{reviews.name}</h3>
            <p className="display__name-timestamp">
              {newMoment(reviews.timestamp)}
            </p>
          </div>
          <div className="display__comment">
            <p className="display__text">{reviews.review}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default CommentsDispaly;
