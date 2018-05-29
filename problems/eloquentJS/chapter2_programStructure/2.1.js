// Write a loop that makes seven calls to console.log to output the following triangle:
// #
// ##
// ###
// ####
// #####
// ######
// #######

//your code here


function triangle (size) {
  let output = ''
  for(let str = '#'; str.length <= size; str += '#') {
    output += str + '\n'
  }
  return output
}
console.log(triangle(7))