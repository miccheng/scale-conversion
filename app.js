const input = document.getElementById("input");
const output = document.getElementById("output");
let multiplier = 0;

// func to split the recipe by line break and join again to an array
// regex to turn each item into an object
// convert using formula
// display output

const ingredientsCupsToGrams = {
  water: 236,
  butter: 226,
  flour: 120,
  salt: 292,
  brownSugar: 195,
  whiteSugar: 200,
  powderedSugar: 120,
  honey: 336,
  buttermilk: 245,
  milk: 245,
  oats: 102,
  bakingSoda: 220,
  bakingPowder: 220,
  oil: 218,
  vanillaExtract: 208,
  adYeast: 224,
};

form.addEventListener("submit", convert);

function convert(event) {
  event.preventDefault();

  let original = input.value;
  let originalArray = original.split("\n");
  let parsedItemArray = [];

  //   regex to make each item into an object using group
  for (let i = 0; i < originalArray.length; i++) {
    let regex = /(?<qty>\d+) (?<scale>[tablespoon|gram|cup|tsp]+)(\sof\s|\s)(?<ingredient>[\s\S]+)/;
    parsedItemArray.push(originalArray[i].match(regex).groups);
  }

  for (let i = 0; i < parsedItemArray.length; i++) {
    //   get multipler of ingredient for conversion formula
    for (let ing = 0; ing < Object.keys(ingredientsCupsToGrams).length; ing++) {
      let keys = Object.keys(ingredientsCupsToGrams);
      let values = Object.values(ingredientsCupsToGrams);
      if (parsedItemArray[i].ingredient === keys[ing]) {
        multiplier = values[ing];
      }
    }

    // check that ingredient is in our ingredient whitelist
    if (parsedItemArray[i].ingredient in ingredientsCupsToGrams) {
      // conversion formula
      if (parsedItemArray[i].scale === "cups") {
        let newConversion = Math.round(parsedItemArray[i].qty * multiplier);
        originalArray[i] = originalArray[i].concat(` (${newConversion} grams)`);
      }

      // tablespoons to grams
      if (parsedItemArray[i].scale === "tablespoon") {
        let newConversion = Math.round(
          (parsedItemArray[i].qty * multiplier) / 16
        );
        originalArray[i] = originalArray[i].concat(` (${newConversion} grams)`);
      }

      // grams to cups
      if (parsedItemArray[i].scale === "grams") {
        let newConversion = (parsedItemArray[i].qty / multiplier).toFixed(2);
        originalArray[i] = originalArray[i].concat(` (${newConversion} cups)`);
      }
    }

    output.textContent = originalArray.join("\n");
  }
}
