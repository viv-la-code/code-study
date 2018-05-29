// The previous chapter introduced the standard function Math.min that returns its smallest argument. We can build something like that now. Write a function min that takes two arguments and returns their minimum.

//your code here

function chessboard (size) {
  const BLANK = ' '
  const FILL = '#'
  
  const checkSquare = (x, y) => (x + y) % 2 //true if odd
  
  let output = ''
  
  for(let y = 0; y < size; y++) {
    for(let x = 0; x < size; x++) {
      output += checkSquare(x, y) ? FILL : BLANK
    }
    output += '\n'
  }
  return output
}
console.log(chessboard(8))