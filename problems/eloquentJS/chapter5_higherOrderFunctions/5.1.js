// Flattening
// Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

//your code here

//rewrote to extend the array object

Array.prototype.flatten = function () {
  return this.reduce((a, b) => a.concat(Array.isArray(b) ? b.flatten() : b), [])
}

console.log([[1, 2, 3], [4, 5], [6]].flatten())

// → [1, 2, 3, 4, 5, 6]