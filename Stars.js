// Source - https://stackoverflow.com/a/67109150
// Posted by chety, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-07, License - CC BY-SA 4.0

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {
  console.log(props);
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name="rating"
              onChange={() => props.setRating(idx)}
              value={props.ratingValue}
              checked={idx === props.ratingValue}
            />
            <FaStar color={idx < 3 ? "#01af93" : "#bbb"} />
          </label>
        ))}
    </div>
  );
};

export const RatingContainer = () => {
  const [rate, setRate] = useState(3);

  return (
    <div>
      <StarRating setRating={(val) => setRate(val)} ratingValue={rate} />
    </div>
  );
};

