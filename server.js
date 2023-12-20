// Importing the Express framework and the path module
const express = require('express');
const path = require('path');

// Creating an instance of the Express application
const app = express();

// Defining the port number for the server, using the provided environment variable or defaulting to 3000
const port = process.env.PORT || 3000;

// Serving static files (like CSS, images, or scripts) from the root directory
app.use(express.static(path.join(__dirname, '/')));

// Handling the root route ('/') with a callback function
app.get('/', (req, res) => {
  // Sending the 'index.html' file as a response
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  // Logging a message indicating that the server is running
  console.log(`Server is running on http://localhost:${port}`);
});