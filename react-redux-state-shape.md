## AirBnb Store Shape:

```js
store = {
  session: {},
  spots: {
      allSpots: {   //When on home page(to get all Spots), use this slice
      [spotId]: {  //or on Manage user's spot(to get user's spot) use this slice
        spotData,
      },
    },
    optionalOrderedList: [],  // These optional ordered lists are for you to be able to store an order in which you want your data displayed.
    // Notice singleSpot has more data that the allSpots slice.
    singleSpot: { // When on Spot details page,  use this slice
      spotData,
      SpotImages: [imagesData],
      Owner: {
        ownerData,
      },
    },
    reviews:{ //Reviews of single spot.When on Spot details page, use this slice. Reviews of single spot
        [reviewId]: {
            reviewData
        },
    }
  },

  reviews: {// Reviews of current user. When on the user's reviews, use this slice.
    spot: {
      [reviewId]: {
        reviewData,
        User: {
          userData,
        },
        ReviewImages: [imagesData],
      },
      optionalOrderedList: [],
    },
};
