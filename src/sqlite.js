/* LESSON 4-6 Notes
  This file contains all the code to create and communicate with the database.
  It is quite complicated! In order to minimize the confusion, I've created
  the SQL queries as strings here at the top of the file. This allows you 
  to hopefully understand those (or whichever among those you need) and modify 
  them for your purposes.

  A lot of this code was written by the Glitch team when they made their 
  "Glitch Hello SQLite" example, which can be found by clicking on "new
  project" and selecting it. I modified it to be a little more clear what it's 
  doing.
*/

const create_table_sql_users = `CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Password TEXT);`
const create_table_sql_reviews = `CREATE TABLE Reviews (ReviewerName TEXT, Date TEXT, MovieName TEXT, Rating INTEGER, TextualReview TEXT);`

const dbFile = "./.data/users_and_reviews.db";  // Dr. Z note: you need to change this name each time you change your tables! Or, delete the file.


/* Dr. Z Note -- until the next "Dr. Z" note below, you can ignore the below 
   setup code.
*/

// Utilities we need
const fs = require("fs");
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");

// Initialize the database
let db;

/* 
We're using the sqlite wrapper so that we can make async / await connections
- https://www.npmjs.com/package/sqlite
*/
dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async (dBase) => {
    db = dBase;  // Assign db instance

    try {
      if (!exists) {
        // If database doesn't exist, create tables
        await db.run(create_table_sql_users);
        await db.run(create_table_sql_reviews);
        console.log("Creating the Users and Reviews tables...");
      } else {
        // If database exists, log the current tables
        console.log(await db.all("SELECT * FROM Users"));
        console.log(await db.all("SELECT * FROM Reviews"));
      }
    } catch (dbError) {
      console.error("Database error: ", dbError);
    }
  })
  .catch((error) => {
    console.error("Error opening the database: ", error);
  });

// Our server script will call these methods to connect to the db
module.exports = {
  
  /* Dr. Z Note -- This is the end of the "setup code". From now on, the code 
     is a collection of functions that interact with the database. They live 
     inside of this "module.exports" object because that is what allows us to 
     "require" it over in our server.js file.
     
     If you're writing your own database code, you'll need to edit these 
     functions, or define your own, by following along with these examples.
  */
  
  // make a user with values inputted in server.js
  createUser: async user => {
    try {
      
      await db.run("INSERT INTO Users (username, password) VALUES (?, ?)", 
          [user.username, user.password]
      );
      return;
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  // make a review with values inputted in server.js
  createReview: async review => {
    try {
      
      await db.run("INSERT INTO Reviews (reviewerName, date, movieName, rating, textualReview) VALUES (?, ?, ?, ?, ?)", 
          [review.reviewerName, review.date, review.movieName, review.rating, review.textualReview]
      );
      return;
    } catch (dbError) {
      console.error(dbError);
    }
  },  
  
  //   check users table
  checkUsers: async () => {
    try {      
      return await db.all("SELECT * FROM Users");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  //   check reviews table
  checkReviews: async () => {
    try {      
      return await db.all("SELECT * FROM Reviews");
    } catch (dbError) {
      console.error(dbError);
    }
  },
};