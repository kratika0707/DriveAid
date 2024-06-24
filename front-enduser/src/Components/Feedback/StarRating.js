// StarRating.js

import React, { useState } from 'react';
import './StarRating.css'; // Import CSS for styling stars (see Step 3)

const StarRating = ({ rating, onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState(rating); // State to manage current rating

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating); // Update local state
    onRatingChange(newRating); // Pass new rating to parent component
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingChange(ratingValue)}
            />
            <span className={ratingValue <= currentRating ? 'filled' : 'empty'}>&#9733;</span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
