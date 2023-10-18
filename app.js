const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model');
const bodyParser = require('body-parser');
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});




//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (request, response) => {
    try {
        const newRecipe = await Recipe.create(request.body)
        console.log(request.body);
        response.status(201).json({recipe : newRecipe})
    } catch (error) {
        console.log(error)
        response.status(500).json({error})
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (request, response) => {
    try {
        const newRecipe = await Recipe.find(request.body)
        console.log(request.body);
        response.status(201).json({recipe : newRecipe})
    } catch (error) {
        console.log(error)
        response.status(500).json({error})
    }
})



//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (request, response) => {
    const {id} = request.params;
    if (mongoose.isValidObjectId(id)) {
    try {
        const oneRecipe = await Recipe.findById(id)
        if (oneRecipe) {      
        console.log(request.body);
        response.status(201).json({recipe : oneRecipe})
        } else {
            response.status(404).json({message: 'user not found'})
    } 

    } catch (error) {
        console.log(error)
        response.status(400).json({error})
    }
}
else {
    response.status(500).json({message: 'id seems wrong'})
}
})



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (request, response) => {
    const {id} = request.params;
    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(id, request.body, {new: true})      
        console.log(request.body);
        response.status(200).json({recipe : updateRecipe})
    } catch (error) {
        console.log(error)
        response.status(500).json({error})
    }
})



//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (request, response) => {
    const {id} = request.params;
    try {
        await Recipe.findByIdAndDelete(id)      
        response.status(204).json({message: 'recipe deleted'})
        
    } catch (error) {
        response.status(500).json({error})
    }
})


// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;