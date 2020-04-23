const parseLine = (text) => {
  const scaleWordsRegex = /(tablespoon|teaspoon|gram|cup|tsp|tbs|medium)[\w]*\s/i
  const result = {
    qty: null,
    scale: null,
    ingredient: null,
    original: text
  }

  const containsScaleWord = text.match(scaleWordsRegex)
  // console.log(containsScaleWord)
  if (containsScaleWord) {
    result.scale = containsScaleWord[1] // Captures the exact scale word
    const scaleWordPos = containsScaleWord.index
    result.qty = text.slice(0, scaleWordPos).trim()
    result.ingredient = text.slice(scaleWordPos + containsScaleWord[0].length)

    const operatorWords = /(of)\s/i
    result.ingredient = result.ingredient.replace(operatorWords, '').trim()
  }

  return result
}

describe('Regex test cases', () => {
  test.each([
    ['4 cups of sugar', '4', 'cup', 'sugar'],
    ['1/2 cup of vegetable oil', '1/2', 'cup', 'vegetable oil'],
    ['1 1/2 tsp butter milk', '1 1/2', 'tsp', 'butter milk'],
    ['1 medium egg', '1', 'medium', 'egg'],
    ['2 teaspoons vanilla extract', '2', 'teaspoon', 'vanilla extract']
  ])('%s', (text, qty, scale, ingredient) => {
    const result = parseLine(text)
    expect(result.qty).toEqual(qty)
    expect(result.scale).toEqual(scale)
    expect(result.ingredient).toEqual(ingredient)
  })
})