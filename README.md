# Full Stack App Example

In this app, I showcase all of the elements that make up a "full stack" app: frontend and backend (including both a server and a database). 

### A word about databases

Most of the time, databases are entire servers themselves (different from the actual server running your website) running somewhere other than _inside_ of the main server running the website. However, this raises the complexity considerably, because you need to then create all the connections, manage security, etc. In this app, I use a version of a SQL database called _SQLite_, which is actually just a file that acts like a database. It's too small for most real-world applications, but it works perfectly for us.

### Lessons and Files

Different files, or even sections within files, correspond to different lessons I teach in my CSC450 class. Here, I break down the lessons and call attention to the different files. Please also pay attention to the comments present throughout the files of the form `/* LESSON 1: ... /*`.

* **Lesson 1: Sending HTML files and CSS files using express**. The main purpose of this lesson is to learn how to send HTML and CSS files from an express server, so that you don't need to send the HTML directly in the relevant express route (_i.e., using something like _`res.send(<p> my html!</p>`). Files/folders to look at:
  * `public` folder and all of its contents
  * `server.js`

* **Lesson 2: POST requests and forms**. One of the easiest and most ubiquitous ways to get a great deal of information from the user is through the use of a form. Files to look at:
  * `public/form_example.html`
  * `server.js`
  
* **Lesson 3: Templating with EJS**. There are many "templating engines" or "render engines", which seek to solve the problem in Lesson 2 of being forced to put the HTML code directly into my express route handler code. With a template engine, we can do many things, such as including data from the database or user directly into our HTML files, or using "HTML Snippets" from other files, for example for similar HTML pieces like a header, navigation bar, or footer. This isn't strictly necessary to do the rest, but it's _much_ nicer with it than without it. Files to look at:
  * `views/card.ejs`
  * `views/navigation.ejs`
  * `views/new_home.ejs`
  * `server.js`
  * `package.json` _(to see the installed `ejs` library.)_

* **Lesson 4: Database queries using the browser navigation**. The traditional way of connecting user actions to a database incolves using the "browser's navigation", i.e., using form navigation for submission and refreshing to get new content. This is done without the use of front-end JavaScript. Files to look at:
  * `views/add_new.ejs`
  * `views/gallery.ejs`
  * `src/sqlite.js`
  * `server.js`
  
* **Lesson 5: Database queries using `fetch`**. A more modern approach (while still being quite basic) would be to use the `fetch` command in the front-end JavaScript code to push and pull information from the database. Files to look at:
  * TBD

* **Lesson 6: More HTTP verbs**. To finish off the experience, we use the verbs `PUT`, `PATCH`, and `DELETE` to create a more fleshed out REST API, which allows the user more control over their data on the app.

### Prerequisites

You can create a simple Express app, and know basic HTML and CSS. You may not have ever put the two together, except for the use case of putting HTML directly into the `res.send` command of your Express servers. 

### Not Covered

While many, many concepts are not covered in this example, most glaringly absent among the is the ideas of users, sessions/cookies, logging in and out, security, and privacy. This is simply a demo app to show the absolute basics.# Movie
