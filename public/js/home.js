function updateStars() {
// get all of the reviews and loop through them
  const reviews = document.querySelectorAll('.reviewContainer');
  reviews.forEach(review => {
// get the rating of the review through an attribute 'rating.' I used ByClassName instead of ById because for some reason ById doesn't work with review
    let starRating = review.getElementsByClassName('starRating');
    let currentRating = starRating[0].getAttribute("rating");
// change the image of stars from empty to filled depending on the aforementioned rating
    const stars = review.querySelectorAll('.star');
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= currentRating) {
        star.src = 'https://cdn.glitch.global/faca5e19-8d78-45d8-9876-06ca89839f61/filled-star.png?1739544339299';
      } else {
        star.src = 'https://cdn.glitch.global/faca5e19-8d78-45d8-9876-06ca89839f61/empy-star.png?1739544362978';
      }
    });
  });
}

// run the star update whenever the page loads
// https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load
window.onload = function() {
  updateStars();
};