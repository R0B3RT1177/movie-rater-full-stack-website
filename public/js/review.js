let currentRating = 0;

// update the rating if a user clicks on one of the stars
function setRating(rating) {
  currentRating = rating;
  updateStars();
}

// visually update the form and put the rating value into an invisible input field
function updateStars() {
  const stars = document.querySelectorAll('.star');
  
  stars.forEach(star => {
    const starValue = parseInt(star.getAttribute('data_value'));

    if (starValue <= currentRating) {
      star.src = 'https://cdn.glitch.global/faca5e19-8d78-45d8-9876-06ca89839f61/filled-star.png?1739544339299';
    } else {
      star.src = 'https://cdn.glitch.global/faca5e19-8d78-45d8-9876-06ca89839f61/empy-star.png?1739544362978';
    }
  });
  
  const ratingInput = document.getElementById('rating');
  ratingInput.value = currentRating;
}