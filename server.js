const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();
const routes = require('./views/routes');

// Use CORS middleware to allow requests from specific origins
app.use(cors()); 

//The midleware converts the data to JSON format
app.use(express.json());

// Define the '/question' route
app.use('', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
