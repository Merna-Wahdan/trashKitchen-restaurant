const express = require("express");
const app = express();
const hbs = require("hbs");

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials

// Make everything inside of public/ available
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("My first app listening on port 3000")
})

//app.get 

//Contact
app.get("/contact", (request, response, next) => {
    response.render("contact")
})

//Home page
app.get('/', (request, response, next) => {
    response.render("homepage")
})

//Creating new Routes for types of pizzas
app.get("/pizzas/margarita", (request, response, next) => {
    const dataMargarita = {
        title: "Pizza Margarita",
        amount: 10,
        imageFile: "/images/margarita.jpg",
        ingredients: [
            {
                ingredientName: "mozzarella",
                calories: 400
            },
            {
                ingredientName: "tomato sauce",
                calories: 200
            },
            {
                ingredientName: "basilicum",
                calories: 30
            },
          ],
    }
    response.render("product", dataMargarita)
})

app.get("/pizzas/veggie", (request, response, next) => {
    const dataVeggie = {
        title: "Pizza Veggie",
        amount: 12,
        imageFile: "/images/veggie.jpg",
        ingredients: [
            {
                ingredientName: "cherry tomatoes",
                calories: 80
            },
            {
                ingredientName: "basilicum",
                calories: 30
            },
            {
                ingredientName: "olives",
                calories: 300
            },
          ],
    }
    response.render("product", dataVeggie)
})

app.get("/pizzas/seafood", (request, response, next) => {
    const dataSea = {
        title: "Pizza Seafood",
        // amount: 15,
        imageFile: "/images/seafood.jpg",
        // ingredients: ['tomato sauce', 'garlic', 'prawn'],
    }
    response.render("product", dataSea)
})