// Source - https://stackoverflow.com/a/67109150
// Posted by chety, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-07, License - CC BY-SA 4.0

import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

const StarRating = (props) => {
  console.log(props);
  return (
    <View>
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <TouchableOpacity key={idx} onPress={() => props.setRating(idx + 1)}>
            <FontAwesome 
              name="star" 
              size={32} 
              color={idx < props.ratingValue ? "#01af93" : "#bbb"} 
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export const RatingContainer = () => {
  const [estrellas, setEstrellas] = useState(3);

  return (
    <View>
      <StarRating setRating={setEstrellas} ratingValue={estrellas} />
    </View>
  );
};

