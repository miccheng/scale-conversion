const input = document.getElementById("input");
const output = document.getElementById("output");
let multiplier = 0;
// var numQty = require("numeric-quantity");

console.log(numQty("1 1/4") === 1.25);
// func to split the recipe by line break and join again to an array
// regex to turn each item into an object
// convert using formula
// display output

const ingredientsCupsToGrams = {
  water: ["water", 236],
  butter: ["butter", 226],
  margarine: ["margarine", 230],
  // flour: ["flour", 120],
  APflour: ["flour", 120],
  cakeFlour: ["cake flour", 114],
  salt: ["salt", 292],
  brownSugar: ["brown sugar", 195],
  whiteSugar: ["white sugar", 200],
  powderedSugar: ["powdered sugar", 120],
  honey: ["honey", 336],
  molasses: ["molasses", 336],
  syrup: ["syrup", 336],
  buttermilk: ["buttermilk", 245],
  milk: ["milks", 245],
  oats: ["oats", 102],
  bakingSoda: ["baking soda", 220],
  bakingPowder: ["baking powder", 220],
  oil: ["oil", 218],
  vanillaExtract: ["vanilla extract", 208],
  activeDryYeast: ["active dry yeast", 224],
};

const tablespoon = ["tablespoon", "tablespoons", "tbs", "tbs."];
const teaspoon = ["teaspoon", "teaspoons", "tsp", "tsp."];
const cup = ["cup", "cups", "c."];
const gram = ["gram", "grams", "g."];

form.addEventListener("submit", convert);

function convert(event) {
  event.preventDefault();

  let original = input.value;
  let originalArray = original.split("\n");
  let parsedItemArray = [];

  //   regex to make each item into an object using group
  for (let i = 0; i < originalArray.length; i++) {
    // let regex = /(?<qty>\d+) (?<scale>[tablespoon|gram|cup|tsp]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;
    let regex = /(?<qty>[^s]+) (?<scale>[tablespoon|gram|cup|tsp]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;
    parsedItemArray.push(originalArray[i].match(regex).groups);
  }

  // let regex = /(?<qty>[^s]+) (?<scale>[tablespoon|gram|cup|tsp]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;
  console.log(parsedItemArray);
  for (let i = 0; i < parsedItemArray.length; i++) {
    //   get multipler of ingredient for conversion formula
    for (let ing = 0; ing < Object.keys(ingredientsCupsToGrams).length; ing++) {
      // let keys = Object.keys(ingredientsCupsToGrams);
      let values = Object.values(ingredientsCupsToGrams);
      if (parsedItemArray[i].ingredient.includes(values[ing][0])) {
        // console.log(
        //   parsedItemArray[i].ingredient,
        //   values[ing][0],
        //   values[ing][1]
        // );
        multiplier = values[ing][1];
      }
    }

    // check that ingredient is in our ingredient whitelist
    // if (parsedItemArray[i].ingredient in ingredientsCupsToGrams) {
    if (multiplier) {
      // conversion formula
      // cups to grams
      for (let j = 0; j < cup.length; j++) {
        if (parsedItemArray[i].scale == cup[j]) {
          let newConversion = Math.round(parsedItemArray[i].qty * multiplier);
          originalArray[i] = originalArray[i].concat(
            ` (${newConversion} grams)`
          );
          multiplier = 0;
        }
      }

      // tablespoons to grams
      for (let j = 0; j < tablespoon.length; j++) {
        if (parsedItemArray[i].scale === tablespoon[j]) {
          let newConversion = Math.round(
            (parsedItemArray[i].qty * multiplier) / 16
          );
          // console.log(parsedItemArray[i].scale);
          originalArray[i] = originalArray[i].concat(
            ` (${newConversion} grams)`
          );
          multiplier = 0;
        }
      }

      // teaspoon to grams
      for (let j = 0; j < teaspoon.length; j++) {
        if (parsedItemArray[i].scale == teaspoon[j]) {
          let newConversion = (
            Math.round(parsedItemArray[i].qty * multiplier) /
            16 /
            3
          ).toFixed(2);
          originalArray[i] = originalArray[i].concat(
            ` (${newConversion} grams)`
          );
          multiplier = 0;
        }
      }

      // grams to cups
      // & parsedItemArray[i].qty < 50
      // for (let j = 0; j < gram.length; j++) {
      //   if (parsedItemArray[i].scale === gram[j]) {
      //     let newConversion = (parsedItemArray[i].qty / multiplier).toFixed(2);
      //     originalArray[i] = originalArray[i].concat(
      //       ` (${newConversion} cups)`
      //     );
      //     multiplier = 0;
      //   }
      // }

      // grams to cups
      // & parsedItemArray[i].qty < 50
      for (let j = 0; j < gram.length; j++) {
        if (parsedItemArray[i].scale === gram[j]) {
          let newConversion = (parsedItemArray[i].qty / multiplier).toFixed(2);
          originalArray[i] = originalArray[i].concat(
            ` (${newConversion} cups)`
          );
          multiplier = 0;
        }
      }
    }

    output.textContent = originalArray.join("\n");
  }
}
