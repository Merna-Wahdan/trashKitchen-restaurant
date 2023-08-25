const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const hbs = require("hbs");
// const data = require("/bin/seeds.js")
const Pizza = require("./models/Pizza.model");
const { default: mongoose } = require("mongoose");

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials

// Make everything inside of public/ available
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, () => {
  console.log("My first app listening on port 3000");
});

// Connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/pizza-restaurant")
  .then((x) => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error("Error... ", err));

//app.get

//Home page
app.get("/", (request, response, next) => {
  response.render("homepage");
});

//Contact
app.get("/contact", (request, response, next) => {
  response.render("contact");
});



app.get("/pizzas/:pizzaName", (req, res, next) => {
  Pizza.findOne({ title: req.params.pizzaName })
    .then((pizzaDetails) => {
      res.render("product", pizzaDetails);
    })
    .catch((e) => console.log("Error getting pizza details from DB", e));
});


app.get("/pizzas", (req, res, next) => {
    let maxPrice = req.query.maxPrice
    maxPrice = Number (maxPrice)

    let filter = {};
    if(maxPrice) {
        filter = {price: {$lte: (maxPrice)}}
    }
    Pizza.find(filter)
        .then((pizzasArr) => {
            const data = {
                listOfPizzas: pizzasArr
            }
            res.render("product-list", data)

        })
        .catch(e =>  console.log("Error getting pizza details from DB", e));
})


app.post("/login", (req, res, next) => {
    const pwd = req.body.pwd
    console.log(req.body.pwd)

    if(pwd === "ilovepizza") {
        res.send("welcome")
    } else {
        res.send("sorry, we don't like you")
    }
res.send("checking your credentials")
})


//Creating new Routes for types of pizzas
// app.get("/pizzas/margarita", (request, response, next) => {

//    Pizza.findOne({title: "margarita"})
//    .then(pizzaDetails => {
//     console.log(pizzaDetails)
//     response.render("product", pizzaDetails)
//    })
//    .catch(e => console.log("Error getting pizza details from DB", e))

// })

// app.get("/pizzas/veggie", (request, response, next) => {
//    Pizza.findOne({title: "veggie"})
//    .then((pizzaDetails) => {
//     console.log(pizzaDetails)
//     response.render("product", pizzaDetails)
//    })
//    .catch(e => console.log("Error getting pizza details from DB", e))
// })

// app.get("/pizzas/seafood", (request, response, next) => {
//     Pizza.findOne({title: "seafood"})
//     .then((seafoodDetails) => {
//         console.log(seafoodDetails)
//         response.render("product", seafoodDetails)
//     })
//     .catch(e => console.log("Error getting pizza details from DB", e))
//     })
