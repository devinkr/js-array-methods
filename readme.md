# Higher-Order Functions

## Learning Objectives

- Define higher-order functions
- Use higher-order functions to iterate over arrays
- Describe the uses of `forEach`, `map`, `filter`, and `reduce`
- Define `every` and `some`
- Describe a closure

## Review

### What is a function? (10 minutes / 00:10)
- Defined block of code that can be called by later code
- Functions are defined with zero or more **parameters**
  - **Parameters** are the variables within a function that refer to its inputs
  - **Arguments** are the values passed in to the function when it is called

```js
function sum (a, b) { // function "sum" defined with parameters a and b
  return a + b
}

sum(3, 4) // function "sum" called with arguments a and b
// => 7
```

- Functions always return a value
  - Either explicitly using a **return** statement
  - Or, implicitly by returning `undefined`

```js
// in a repl
console.log('hello!')
// 'hello!'
// => undefined
```

### Functions are regular values (5 minutes / 00:15)
- Functions are values just like numbers, strings, booleans, arrays, objects, `undefined`, and `null`
- Functions can be assigned to variables and put into arrays and objects
- Most importantly, functions can be given to other functions as arguments and/or returned from functions as output

### JavaScript Collections (5 minutes / 00:20)

Numbers, Strings, and Booleans are our basic building block of data but on their own, they don't express much. We use collections, most commonly Objects and Arrays to build up data to describe more complex entities.

**Arrays** hold their elements in sequence and are generally used to store collections of related things.

**Objects** hold their elements in key-value pairs and are generally used either to "map" between values (like word to definitions in a dictionary) or to describe something with various attributes.

## Higher-Order Functions

Functions that take other functions as arguments or return them as output are called **higher-order functions**. JavaScript provides a number of useful array methods that fit this definition that provide a level of abstraction to simplify array traversal (going through each element in an array and performing some operation).

### Passing Functions to Functions (5 minutes / 00:25)

In order to explore some of the higher-order functions JavaScript provides, let's set up a simple development environment:

- Create a directory called `js-higher-order-functions` in your `sandbox` directory
- Inside of it create an `index.html` file and a `script.js` file
- Add boilerplate to `index.html`, link the script, and add a `console.log` to the script to make sure everything is wired up properly

We'll use the following array for the next few examples...

```js
const wdiInstructors = [
  {
    name: {
      first: 'Andrew',
      last: 'Whitley'
    },
    cohort: 19
  },
  {
    name: {
      first: 'Perry',
      last: 'Fustero'
    },
    cohort: 19
  },
  {
    name: {
      first: 'Zakk',
      last: 'Fleischmann'
    },
    cohort: 19
  },
  {
    name: {
      first: 'Ali',
      last: 'Spittel'
    },
    cohort: 18
  },
  {
    name: {
      first: 'Mike',
      last: 'Nabil'
    },
    cohort: 18
  },
  {
    name: {
      first: 'James',
      last: 'Reichard'
    },
    cohort: 18
  }
]
```
#### .forEach() (10 minutes / 00:35)

Very frequently, we will want to go through an array and do something for every element in the array.

As an example, we'll loop through the above array printing the line `'<Instructor name> is an instructor for WDI<cohort number>'` to the console for each instructor.

In languages without higher-order functions, we would need to use a loop to perform this task (and we can do so in JS)...

```js
for (let i = 0; i < wdiInstructors.length; i++) {
  let instructor = wdiInstructors[i]
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
}
```

If we want, we can write a function that encapsulates the operation taken on each instructor object...

```js
function printInstructorGreeting (instructor) {
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
}
```

And then rewrite the loop to call this function and pass in each instructor object as an argument...

```js
for (let i = 0; i < wdiInstructors.length; i++) {
  printInstructorGreeting(wdiInstructors[i])
}
```

This process of iterating through an array is so common that JavaScript provides an array method for it called `forEach`. Methods are functions attached to an object (in this case, attached to the Array). Let's update our code to `forEach` in place of a `for` loop.

```js
wdiInstructors.forEach(printInstructorGreeting)
```
> Note that here we are *referencing* the `printInstructorGreeting` function, not invoking it

This will go through each object in the `wdiInstructors` array and execute the `printInstructorGreeting` function for each object in it, passing each object into the function as an argument.

Commonly, we might write this using an *anonymous function* (unnamed) instead of a *named function* (as we did above). If we changed the above code to use an anonymous function, it would look like this:

```js
wdiInstructors.forEach(function (instructor) {
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
})
```
> Note that this is functionally no different than the above code snippet, only here we are defining an anonymous function and passing it in instead of defining one externally and referencing it as an argument.

We could rewrite this to use ES6 arrow functions as well:

```js
wdiInstructors.forEach((instructor) => {
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
})
```

##### Return Value
When using any function or method, it is important to keep in mind the return value that it will output. With `forEach`, the return value is `undefined`. As such, we should use `forEach` when we want to *use* each item in an array to produce some *side effect*, but **not** to produce a new version of the array. For example, this would be a misuse of `forEach`:

```js
let letters = ['a', 'b', 'c']
let capLetters = letters.forEach((letter) => letter.toUpperCase())
console.log(capLetters)
// => undefined
```

If we wanted to create a new, modified version of an array, we would use `map`...

#### .map() (10 minutes / 00:45)

We've discussed functions that were called for their **side effect** versus functions that are called for their **return value** or **output**. In the previous example, we used `forEach` to produce some *side effect*.

Frequently, however, rather than do **something with each** item in an array, we want to do **something to each** item, applying some transformation and producing a new, modified version of the array.

`forEach` has a closely related sibling `map` that instead of calling a passed function for its effect, it calls a passed function for its return value and creates a new array of the return values.

Let's write a loop to create an array called `instructorNames` that will be an array of 6 strings, the instructor names.

```js
const instructorNames = []
for (let i = 0; i > wdiInstructors.length; i++) {
  let instructor = wdiInstructors[i]
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  instructorNames.push(instructorName)
}
```

Similar to the process before, let's abstract the block of code in the `for` loop into a function and call it `getFullName`

```js
function getFullName (instructor){
  return instructor.name.first + ' ' + instructor.name.last
}
```

Next we'll write a loop that calls this function on each instructor in the array and stores the results in the `instructorNames` array.

```js
const instructorNames = []
for (let i = 0; i > wdiInstructors.length; i++) {
  let fullName = getFullName(wdiInstructors[i])
  instructorNames.push(fullName)
}
```

Now, instead of using a `for` loop to populate an external array (side effect), let's use the `map` array method to create a new array using `map`'s **return value**:

```js
const instructorNames = wdiInstructors.map(getFullName)
```

We can also use an anonymous function instead of a named one:

```js
const instructorNames = wdiInstructors.map((instructor) => {
  return instructor.name.first + ' ' + instructor.name.last
})
```

#### Return Value
`map` will return an array that is composed of the **return values** of the function given when called with each item of the array passed in as an argument.

#### Filter (10 minutes / 00:55)

Another common procedure is to filter elements from an array based on some custom condition.

The condition will take the form of a function that will return `true` or `false` when given an element from the collection.

First we'll write the filter function (the custom condition)...

```js
function teaches17(instructor) {
  return instructor.cohort === 17
}
```

We can write a loop that uses this function...

```js
const wdi17 = []
for (let i = 0;  i > wdiInstructors.length; i++) {
  if (teaches17(wdiInstructors[i])) {
    wdi17.push(wdiInstructors[i])
  }
}
```

Like the others, `filter` is available directly on arrays...

```js
const wdi17two = wdiInstructors.filter(teaches17)
```
Or using an anonymous function..
```js
const wdi17three = wdiInstructors.filter((instructor) => {
  return instructor.cohort === 17
})
```

#### Return Value
`filter` will return a new, modified array composed of items for which the passed in function **returns true** when called on each item.

#### Practice (10 minutes / 1:05)
(7 minutes working / 3 minutes discussing)

Use either your `script.js` file you've been working in or open [repl.it](https://repl.it/languages/javascript).

- Declare a variable `states`.
- Assign to it the array of objects from `capitals.json`.
- Using the array traversal methods we were just looking at, create the following values (keep track of your answers)

1. Create an array of strings for each capital with the city and state name (e.g. `'Austin, Texas'`)
2. Filter all the states with capitals that start with the letter `A`.
3. List all the sates with two words in their name.
4. How many capitals are north of Annapolis?


## Break (10 minutes / 01:15)

#### [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) (15 minutes / 01:30)

The most generic list comprehension function is called `reduce`.
Both map and filter build up arrays as they go through the list.
Reduce gives you custom control of the value you build as you go through the list.

Taking the sum of an array of numbers...

```js
const total = [1, 3, 5, 7].reduce((sum, num) => sum + num, 0)
```

Mapping with reduce...

```js
const instructorNames5 = wdiInstructors.reduce((names, instructor) => {
  return names.push(instructor.name.first + ' ' + instructor.name.last)
}, [])
```

Filtering even numbers...

```js
const odds = [1, 2, 3, 4, 5, 6, 7].reduce((odds, num) => {
  if (num % 2) { // false if num % 2 === 0
    odds.push(num)
  }
  return odds
}, [])
```

Or count even numbers...

```js
const numEvens = [1, 2, 3, 4, 5, 6, 7].reduce((count, num) => {
  if (!(num % 2)) { // false if num % 2 !== 0
    count++
  }
  return count
}, 0)
```

Reduce can be hard to grasp at first; don't stress about this. It is definitely not something you need to have mastered, it is just good to have an awareness. It takes some practice to use `.reduce` intuitively when solving problems.

For a step by step of how the mechanics work, check out [this section on the MDN page for reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#How_reduce_works)

#### Exercise: Defining Some and Every (30 minutes / 02:00)

(20 minutes small groups / 10 minutes class discussion)

- There are two related methods, `some` and `every` that each take a test function (like filter) and applies it to each element of an array.
- `some` will return true if the test function returns true given **any** of the items in the array and false otherwise.
- `every` will return true if the test function returns true for **every** one of the items in the array and false otherwise.
- Working with a partner at your table define functions `some` and `every` that take an array and a function and work as described.


#### Sort (10 minutes / 2:10)

The `sort` method is another higher-order function which gets a test function but the sort test is slightly more complicated.

The test function for `sort` is called with two arguments `a` and `b` which represent any two elements being sorted.

Rather than returning `true` or `false` as in the case of the other test functions we've looked at, the compare function should...
- return a negative number if `a` should come before `b`
- return 0 if `a` and `b` are equal
- return a positive number if `a` should come after `b`

By default, `sort` uses a compare function that converts `a` and `b` to strings and sorts based on **unicode** values (alphabetized but with all uppercase characters before all lower case characters).

This leads to the odd behavior of `10` being sorted in front of `2`.

```js
[1, 2, 10, 20, 3, -1, 12].sort()
// => [-1, 1, 10, 12, 2, 20, 3]
```

To write a compare function that works as expected...

```js
function compareNumbers(a,b) {
  return a - b
}

// with a named function
[1, 2, 10, 20, 3, -1, 12].sort(compareNumbers)
// => [-1, 1, 2, 3, 10, 12, 20]

// with an anonymous function
[1, 2, 10, 20, 3, -1, 12].sort((a, b) => a - b)
// => [-1, 1, 2, 3, 10, 12, 20]
```

How would we write a compare function to sort our capitals from most northern to most southern?

### Looking Forward: Callbacks (5 minutes / 2:15)

While array traversal methods are a very common example of higher-order functions, an even more common time that we want to pass functions as arguments to other functions is called a callback.

These are ideas we'll cover in depth in a couple of classes but consider the following at a high level as a primer.

Callbacks passed to another function to be called at some later time.

All the examples that we have looked at use the function being passed as an argument immediately (and repeatedly).

Callbacks are generally called at some time in the future.
What types of things might we want to trigger a function call on?

### Returning Functions from Functions

We can also build functions with other functions.

```js
function multiplyBy (num) {
  return (anotherNum) => num * anotherNum
}

const multiplyBy2 = multiplyBy(2)
const multiplyBy5 = multiplyBy(5)

console.log(multiplyBy2(4))
console.log(multiplyBy5(4))
```

#### Closures (5 minutes / 2:20)

Notice that even though `num` in not defined within the function being returned, it is still remembered by the function through what is called the function's **closure**.

We can right some really neat code taking advantage of **closures**.

```js
function Locker(password){
  let locked = true
  let content

  return {
    toggle (pwd) {
      if (pwd === password){
        locked = !locked
      }
      return locked
    },
    read () {
      if (locked) {
        return "unlock to read"
      } else {
        return content
      }
    },
    write (newContent) {
      if (locked) {
        return "unlock to write"
      } else {
        content = newContent
        return content
      }
    }
  }
}
```

Eloquent JavaScript has a really great [explanation of closures](http://eloquentjavascript.net/03_functions.html#h_hOd+yVxaku).

### Review and Questions (10 minutes / 2:30)

- Check out the [Coding Meetup Kata's](http://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe) for lots more practice
- [Node School Workshoppers](https://nodeschool.io/#workshoppers)
- [Eloquent JS Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)

#### Review
- What is the difference between output and a side effect?
- What is the difference between an argument and a parameter?
- What is the difference between referencing and invoking a function?
