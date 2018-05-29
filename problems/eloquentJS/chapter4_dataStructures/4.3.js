// A list
// Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data structure is the list (not to be confused with array). A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.
// The resulting objects form a chain, like this:

// A linked list
// A nice thing about lists is that they can share parts of their structure. For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the binding defined earlier), they are both independent lists, but they share the structure that makes up their last three elements. The original list is also still a valid three-element list.

// Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. Also write a listToArray function that produces an array from a list. Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

// If you haven’t already, also write a recursive version of nth.


// Your code here.

class Node {
  constructor(val, next = null, prev = null) {
    this.val = val
    this.next = next
    this.prev = prev
  }
  setNext (val) {
    this.next = new Node(val, null, this)
    return this.getNext()
  }
  setPrevious (val) {
    this.prev = new Node(val, this)
    return this.getPrevious()
  }
  getNext () {
    return this.next
  }
  getPrevious () {
    return this.prev
  }
  getValue () {
    return this.val
  }
}

class List {
  constructor (seed = []) {
    this.head = null
    this.tail = null
    if(Array.isArray(seed)) {
      seed.forEach(item => this.append(item))
    } else {
      this.append(seed)
    }
  }
  prepend (val) {
    this.head = this.head.setPrevious(val)
    return this
  }
  append (val) {
    if(!this.head) {
      this.head = this.tail = new Node(val)
    } else {
      this.tail = this.tail.setNext(val)
    }
    return this
  }
  nth (target) {
    const MIN_INDEX = 0
    if(!target || typeof target !== 'number' || target < MIN_INDEX) {
      target = MIN_INDEX
    }
    
    const recursiveNth = (node, i = 0) => i !== target ? recursiveNth(node.getNext(), i + 1) : node
    
    return recursiveNth(this.head).getValue()
  }
  toArray () {
    const output = []
    for(let current = this.head; current !== null; current = current.getNext()) {
      output.push(current.getValue())
    }
    return output
  }
}

console.log(new List([10, 20]))
console.log(new List([10, 20, 30]).toArray())
// → [10, 20, 30]
console.log(new List(null).prepend(20).prepend(10))
// → {value: 10, rest: {value: 20, rest: null}}
console.log(new List([10, 20, 30]).nth(1))
// → 20