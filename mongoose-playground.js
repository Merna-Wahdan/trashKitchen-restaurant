const { mongoose, Schema } = require("mongoose");

const Pizza = require("./models/Pizza.model")

mongoose
  .connect("mongodb://127.0.0.1:27017/pizza-restaurant")
  .then((response) => {
    console.log(`Connected! DB Name: ${response.connections[0].name}`);

    //create a new documeht (a new pizza)
    const newPizza = {
      title: "margartia",
      price: 12,
      isVeggie: true,
      dough: "classic",
      ingredients: ["mozzarella", "tomato sauce", "basilicum"],
    };
    return Pizza.create(newPizza);
  })
  .then((pizzaFromDB) => {
    console.log(pizzaFromDB);

    const newPizzasArray = [
      { title: "Veggie", price: 15, isVeggie: true },
      { title: "Seafood", price: 18 },
    ];
    return Pizza.insertMany(newPizzasArray);
    // console.log(Pizza.length)
  })
  .then((pizzaCreated) => {
    console.log(`Number of pizzas are: ${pizzaCreated.length}`);

    return Pizza.find();
    // return Pizza.find({isVeggie: true});
  })
  .then( (pizzasFromDB) => {
    console.log(`Number of pizzas in our DB: ${pizzasFromDB.length}`)
    return Pizza.findOneAndUpdate({title: "margartia"}, {price: 13})
})
.then(() => {
    console.log(`your pizza's price is updated`)
    mongoose.connection.close()
    
})
  .catch((error) => {
    console.log("Error:", error);
  });


