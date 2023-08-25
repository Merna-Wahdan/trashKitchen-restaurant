const {mongoose, Schema} = require("mongoose")

//Same pattern
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;


//Create Schema
const pizzaSchema = new Schema({
    title: {
      type: String,
      required: true,
    //   unique: true,
    },
    price: {
      type: Number,
      min: 1,
      max: 99,
    },
    isVeggie: {
      type: Boolean,
      default: false,
    },
    dough: {
      type: String,
      enum: ["classic", "extra thin", "with cheese", "with garlic"],
    },
    imageFile: String,
    ingredients: [String],
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
    },
    chef: {
      type: String,
    }
  });
  
  // Create Model
  const Pizza = mongoose.model("Pizza", pizzaSchema);
  
  module.exports = Pizza;