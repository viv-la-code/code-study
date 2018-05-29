//The previous chapter introduced the standard function Math.min that returns its smallest argument. We can build something like that now. Write a function min that takes two arguments and returns their minimum.

//your code here

function min (...args) {
  return args.reduce((a, b) => a > b ? b : a)
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
console.log(min(-5, 0, 100000, Infinity, -301,-302, 50, true, false, "Hello World!"))
// → -302