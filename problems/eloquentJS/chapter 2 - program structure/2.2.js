// Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

// Passing this string to console.log should show something like this:
// (pipes added to preserve leading whitespace)
//  # # # #
// # # # # 
//  # # # #
// # # # # 
//  # # # #
// # # # # 
//  # # # #
// # # # #
// When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height.


//your code here

//overachiever solution, but shows how to use a curried function (isDivisibleBy)
function fizzBuzz (lowerLimit, upperLimit) {
  const FIZZ = "Fizz"
  const BUZZ = "Buzz"
  const FIZZ_VAL = 3
  const BUZZ_VAL = 5

  function isDivisibleBy (divisor, successStr) {
    return (x) => !(x % divisor) ? successStr : ''
  }

  const isFizz = isDivisibleBy(FIZZ_VAL, FIZZ)
  const isBuzz = isDivisibleBy(BUZZ_VAL, BUZZ)
  
  let output = ''
  
  for(let i = lowerLimit; i <= upperLimit; i++) {
    let line = isFizz(i) + isBuzz(i)
    output += line || i
  output += '\n'
  }
  return output
}

console.log(fizzBuzz(1, 100))