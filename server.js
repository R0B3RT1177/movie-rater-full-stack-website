// initializations
var express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const crypto = require('crypto');
const session = require('express-session');
var app = express();
const ejs = require("ejs");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'bingchilling',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const data = require("./src/data.json");
const db = require("./src/" + data.database);

app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------------------------------

// middleware to check if user is logged in. If they aren't, redirect them to the login page
function isLoggedIn (req, res, next){
  if (req.session.user){
    next();
  }else{
    res.render("login_signup_error", {type: "review"});
  }
};

// login page route handler
app.get("/login", function (req, res) {
  res.sendFile("login.html", { root: "public/html" });
});

// signup page route handler
app.get("/signup", function (req, res) {
  res.sendFile("signup.html", { root: "public/html" });
});

// home page route handler
app.get("/", async function (req, res) {
  var reviews = await db.checkReviews();
  var users = await db.checkUsers();
  
  // to avoid an error, we replace an "empty" response from the database with an empty array
  if (!reviews) {
    reviews = []
  }

  res.render("home", {reviews: reviews});
});

// review page route handler
app.get("/review", isLoggedIn, function(req, res) {
  res.sendFile("review.html", { root: "public/html" });
});

// this handles the signup stuff in the backend
app.post("/createuser", async function(req, res) {
  var existing_users = await db.checkUsers();

  if (!existing_users){
    existing_users = [];
  };
  
  var duplicated_username = false;
  
// pass the password through a hashing function for security
  var hashed_pass = crypto.createHash('md5').update(req.body.password).digest('hex');
  var input_user = String(req.body.username);
  
//   check if the username already exists, if it doesn't enter it into the database and create a session
  duplicated_username = existing_users.some(user => user.Username == input_user);
  
  if(duplicated_username){
    var user_info = {username: input_user, password: req.body.password}
    res.render("login_signup_error", {type: "signup", user_info: user_info});
  }else{
    await db.createUser({
      username: input_user,
      password: hashed_pass
    });
    
    req.session.user = {username: input_user};
    res.redirect("/review");
  }
});

// this handles all of the login stuff on the backend
app.post("/userhandler", async function(req, res) {
// use correct_info because if we use req.session.user, an already logged in user can just put any info and get redirected
  let correct_info = false;
  
  var users = await db.checkUsers();
  
  if (!users){
    users = [];
  };

  var input_user = String(req.body.username);
  var hashed_pass = crypto.createHash('md5').update(req.body.password).digest('hex');
  
//   loop through each user in the database, if the login form info matches one of the entries, make a session
  users.forEach(function(user) {
    
    var database_user = String(user.Username);
    var database_pass = String(user.Password);
    var database_id = String(user.id);
    
    if (input_user == database_user && hashed_pass == database_pass){
      req.session.user = {username: database_user};
      correct_info = true
    }
  });
  
  if (correct_info) {
    res.redirect('/review');
  }else {
    var user_info = {username: input_user, password: req.body.password};
    res.render("login_signup_error", {type: "login", user_info: user_info});
  }
});

// this handles the review stuff in the backend
app.post("/reviewhandler", async function(req, res) {
  var date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date_parsed = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  
  await db.createReview({
    reviewerName: req.session.user.username,
    date: date_parsed,
    movieName: req.body.movieName,
    rating: req.body.rating,
    textualReview: req.body.textualReview
  });
  
  res.redirect('/');
});

// for handling post requests for searches. It simply redirects them to a url with a route parameter with their search term
app.post("/searchhandler", function(req, res) {
  var search_term = req.body.search;
  if (search_term == null) {
    search_term = "";
  };
  res.redirect(`/search/${search_term}`);
});

// handles searching for reviews. Loop through each review and see if any of its data have the search term inside of them. If they do, dispaly that review.
app.get("/search/:search_term", async function(req, res){
  var valid_reviews = [];
  var reviews = await db.checkReviews();
  reviews.forEach(function(review){
    var reviewer_name = review.ReviewerName.toLowerCase();
    var date = review.Date.toLowerCase();
    var movie_name = review.MovieName.toLowerCase();
    var rating = String(review.Rating).toLowerCase();
    var textual_review = review.TextualReview.toLowerCase();
    var search_term = req.params.search_term.toLowerCase();

    if (reviewer_name.includes(search_term) || date.includes(search_term) || movie_name.includes(search_term) || rating.includes(search_term) || textual_review.includes(search_term)){
      valid_reviews.push(review);
    };
  });
  
  res.render("home", {reviews: valid_reviews});
});

// This line actually starts the server doing its listening job
app.listen(process.env.PORT);
