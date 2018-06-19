/*
Iterable groups
Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during iteration.
*/

// Your code here (and the code from the previous exercise)
class Group {
  constructor () {
    this.data = new Map()
  }
  static from(array) {
    const group = new Group()
    array.forEach(value => group.add(value))
    return group
  }
  has(value) {
    return Boolean(this.data.get(value))
  }
  add(value) {
    this.data.set(value, true)
  }
  delete(value) {
    this.data.delete(value)
  }
}

Group.prototype[Symbol.iterator] = function () {
  return this.data.keys()
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c