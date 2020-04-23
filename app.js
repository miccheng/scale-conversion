const input = document.getElementById("input");
const output = document.getElementById("output");
let multiplier = 0;

console.log(numericQuantity("1"));
// func to split the recipe by line break and join again to an array
// regex to turn each item into an object
// convert using formula
// display output

const ingredientsCupsToGrams = {
  water: ["water", 236],
  butter: ["butter", 226],
  unsaltedButter: ["unsalted butter", 226],
  saltedButter: ["salted butter", 226],
  margarine: ["margarine", 230],
  flour: ["flour", 120],
  APflour: ["all purpose flour", 120],
  cakeFlour: ["cake flour", 114],
  cocoaPowder: ["cocoa powder", 100],
  salt: ["salt", 292],
  brownSugar: ["brown sugar", 195],
  granulatedSugar: ["granulated sugar", 200],
  granulatedWhiteSugar: ["granulated white sugar", 200],
  whiteSugar: ["white sugar", 200],
  powderedSugar: ["powdered sugar", 120],
  honey: ["honey", 336],
  molasses: ["molasses", 336],
  syrup: ["syrup", 336],
  buttermilk: ["buttermilk", 245],
  milk: ["milk", 245],
  oats: ["oats", 102],
  bakingSoda: ["baking soda", 220],
  bakingPowder: ["baking powder", 220],
  oil: ["oil", 218],
  vegetableOil: ["vegetable oil", 218],
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
  let originalArray = original.split("\n").filter(function (el) {
    return el != "";
  });
  let parsedItemArray = [];

  console.log("originalArray", originalArray);
  //   regex to make each item into an object using group
  for (let i = 0; i < originalArray.length; i++) {
    // Attempt 1
    // let regex = /(?<qty>\d+) (?<scale>[tablespoon|gram|cup|tsp]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;

    // Attempt 2
    // Incorrectly parses the scale for ingredients with two words. ex: 1/2 cup of vegetable oil
    let regex = /(?<qty>[^s]+) (?<scale>[\S|tablespoon|gram|cup|tsp|tbs]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;

    // Attempt 3
    // Doesn't capture the 1 in 1 1/2 cups butter milk
    // let regex = /(?<qty>[^s*|^\s]*) (?<scale>[\w|tablespoon|gram|cup|tsp|tbs]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;

    parsedItemArray.push(originalArray[i].match(regex).groups);
    console.log("parsed", parsedItemArray);
  }

  console.log(parsedItemArray);
  for (let i = 0; i < parsedItemArray.length; i++) {
    //   get multipler of ingredient for conversion formula
    for (let ing = 0; ing < Object.keys(ingredientsCupsToGrams).length; ing++) {
      let values = Object.values(ingredientsCupsToGrams);
      // if (parsedItemArray[i].ingredient.includes(values[ing][0])) {
      if (parsedItemArray[i].ingredient.includes(values[ing][0])) {
        multiplier = values[ing][1];
      }
    }

    // conversion formula
    if (multiplier) {
      // cups to grams
      for (let j = 0; j < cup.length; j++) {
        if (parsedItemArray[i].scale == cup[j]) {
          let newConversion = Math.round(
            numericQuantity(parsedItemArray[i].qty) * multiplier
          );
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
            (numericQuantity(parsedItemArray[i].qty) * multiplier) / 16
          );
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
            Math.round(numericQuantity(parsedItemArray[i].qty) * multiplier) /
            16 /
            3
          ).toFixed(2);
          originalArray[i] = originalArray[i].concat(
            ` (${newConversion} grams)`
          );
          multiplier = 0;
        }
      }

      // grams to CUPS
      for (let j = 0; j < gram.length; j++) {
        if (parsedItemArray[i].scale === gram[j]) {
          // grams to TBS
          if (parsedItemArray[i].qty < 40) {
            let newConversion = (
              (parsedItemArray[i].qty / multiplier) *
              16
            ).toFixed(2);
            originalArray[i] = originalArray[i].concat(
              ` (${newConversion} tablespoons)`
            );
            multiplier = 0;
            // grams to CUPS
          } else {
            if (parsedItemArray[i].scale === gram[j]) {
              let newConversion = (parsedItemArray[i].qty / multiplier).toFixed(
                2
              );
              originalArray[i] = originalArray[i].concat(
                ` (${newConversion} cups)`
              );
              multiplier = 0;
            }
          }
        }
      }
    }

    output.textContent = originalArray.join("\n");
  }
}
