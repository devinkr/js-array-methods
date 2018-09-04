# Array Iteration Methods & Higher-Order Functions

## Learning Objectives

- Define higher-order functions
- Use higher-order functions to iterate over arrays
- Describe the uses of `forEach`, `map`, `filter`, and `reduce`
- Define `every` and `some`

## Framing & Review (15 min / 0:15)

Today we will cover some array methods which are used to transform arrays. This
could be as simple as multiplying each number in an array of numbers by
a certain factor, or adding them all together to obtain their sum.

There are certainly ways to perform these tasks using `for` or `while` loops,
bot those solutions have the disadvantage of being complex to read and reason
about (we have to do a lot of thinking to understand the code).

Today, we're going to learn about some Array methods that make transforming data
in arrays easier. These methods are also a lot more flexible and powerful than
using a loop, with the additional benefit that they are generally considered
easier to read.

Before we get in to these methods, however, we want to do a quick review of
JavaScript functions and introduce a new topic, Higher-Order Functions.

### Review JavaScript Collections

Numbers, Strings, and Booleans are our basic building blocks of data but on
their own, they don't express much. We use collections, most commonly Objects
and Arrays, to build up data to describe more complex entities.

**Arrays** hold their elements in sequence and are generally used to store
collections of related things.

**Objects** hold their elements in key-value pairs and are generally used either
to store & look up values (like word definitions in a dictionary), or to
describe some thing or entity with various attributes.

### Review JavaScript Functions

What is a function?

- Defined block of code that can be called by later code
- Functions are defined with zero or more **parameters**
  - **Parameters** are the variables for the function inputs upon definition
  - **Arguments** are the values passed in to the function when it is called

<details>
  <summary> What is a method? </summary>
  A method is a function that is defined on an object or class. Methods begin with a <code>.</code>, since they are object-properties. For example, <code>.push()</code> and <code>.reverse()</code> are methods, specifically <code>Array</code> methods.
</details>

#### Function Declaration

```js
function sum (a, b) { // function "sum" defined with parameters a and b
  return a + b
}
```

#### Function Expression

```js
// ES5 Style
var sum = function (a, b) { 
  return a + b
}

// ES6 Style, with Arrow Functions
const sum = (a, b) => a + b
```

#### Function Invocation (calling a function)

```js
sum(3, 4) // function "sum" called with arguments a and b
// => 7
```

Functions always return a value, either...
  1. whatever follows a function's **return** statement
  2. or if there is no return statement, the function returns the value `undefined`.

```js
// in a repl
console.log('hello!')
// 'hello!'
// => undefined
//// console.log() returns `undefined`, which appears below the console-logged message
```

### CodeWars Sign Up

For our in-class exercises today, you will need an account on
[CodeWars](https://www.codewars.com). You'll have to pass one small challenge
before you can create your account, but the good news is that we just covered
it. If you already have a CodeWars account, then you've already completed this
step.

### Functions as Values (5 minutes / 0:20)

One of the things that makes JavaScript so powerful is that we can reference
functions and treat them like values stored in a variable.

The impact of this is we can:

* add functions to arrays and objects, just like any other value
* pass functions as arguments to another function
* return a function from a function

> Open up a [repl.it](https://repl.it/languages/javascript) and see for
> yourself!

> 1. Create an array and add a function to it. How do you invoke it?
> 1. Create a function that takes a function as an argument. How do you invoke it?
> 1. Create a function that returns another function. How do you invoke them?

Taking functions as arguments and returning functions is a little advanced, so
we're just going to touch on it today. But the significance is: a function that
takes a function as an argument is called a *higher-order function.*

## Higher-Order Functions

Functions that take other functions as arguments or return them as output are
called **higher-order functions**. The array methods that we're going to learn
today all fit this definition: they are functions (methods of the Array object)
that take a function as an argument and use it to transform an array of data.
The purpose is to provide a level of abstraction and simplify array iteration
(going through each element in an array and performing some operation).

### Passing Functions to Functions (5 minutes / 0:25)

In order to explore some of the higher-order functions JavaScript provides,
let's set up a simple development environment:

1. Create a directory called `js-higher-order-functions` in your `sandbox` directory.
1. Inside of it create an `index.html` file and a `script.js` file.
1. Add boilerplate to `index.html`, link the script, then add a `console.log` to the script to make sure everything is wired up properly.

We'll use the following array for the next few examples:

```js
const wdiInstructors = [
  {
    name: {
      first: 'Meg',
      last: 'MacIver'
    },
    cohort: 21
  },
  {
    name: {
      first: 'Perry',
      last: 'Fustero'
    },
    cohort: 21
  },
  {
    name: {
      first: 'Zakk',
      last: 'Fleischmann'
    },
    cohort: 21
  },
  {
    name: {
      first: 'Ali',
      last: 'Spittel'
    },
    cohort: 20
  },
  {
    name: {
      first: 'Mike',
      last: 'Nabil'
    },
    cohort: 20
  },
  {
    name: {
      first: 'Max',
      last: 'Oppenheimer'
    },
    cohort: 20
  },
  {
    name: {
      first: 'James',
      last: 'Reichard'
    },
    cohort: 20
  }
]
```

### .forEach() (10 minutes / :35)

Very frequently, we will want to go through an array and do something for every
element in the array.

As an example, we'll loop through the above array printing the line
`'<Instructor name> is an instructor for WDI<cohort number>'` to the console for
each instructor.

Without higher-order functions, we would need to use a loop to perform this task
(and we can do so in JS)...

```js
for (let i = 0; i < wdiInstructors.length; i++) {
  let instructor = wdiInstructors[i]
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
}
```

If we want, we can write a function that encapsulates the operation taken on
each instructor object:

```js
function printInstructorGreeting (instructor) {
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
}
```

And then rewrite the loop to call this function and pass in each instructor
object as an argument...

```js
for (let i = 0; i < wdiInstructors.length; i++) {
  printInstructorGreeting(wdiInstructors[i])
}
```

This process of iterating through an array is so common that JavaScript provides
an array method for it called `forEach`. Methods are functions attached to an
object (in this case, attached to the Array). Let's update our code to `forEach`
in place of a `for` loop.

```js
wdiInstructors.forEach(printInstructorGreeting)
```
> Note that here we are *referencing* the `printInstructorGreeting` function, not invoking it

This will go through each object in the `wdiInstructors` array and execute the
`printInstructorGreeting` function for each object in it, passing each object
into the function as an argument.

Commonly, we might write this using an *anonymous function* (unnamed) instead of
a *named function* (as we did above). If we changed the above code to use an
anonymous function, it would look like this:

```js
wdiInstructors.forEach(function (instructor) {
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
})
```

> Note that this is functionally no different than the above code snippet, only
> here we are defining an anonymous function and passing it in instead of
> defining one externally and referencing it as an argument.

We could rewrite this to use ES6 arrow functions as well:

```js
wdiInstructors.forEach((instructor) => {
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  let instructorGreeting = `Hi, I'm ${instructorName}! I'm an instructor for WDI${instructor.cohort}`
  console.log(instructorGreeting)
})
```

#### You Do: `.forEach`

In your `script.js`, create an array of programming languages you know of. Use
`.forEach` to print the message `"${programmingLanguage} is a programming
language!"`, replacing `programmingLanguage` with one of the languages in your
array.

#### Return Value

When using any function or method, it is important to keep in mind the return
value that it will output. With `forEach`, the return value is `undefined`. As
such, we should use `forEach` when we want to *use* each item in an array to
produce some *side effect*, but **not** to produce a new version of the array.

For example, this would be a misuse of `forEach`:

```js
let letters = ['a', 'b', 'c']
let capLetters = letters.forEach((letter) => {
  return letter.toUpperCase() //this return is pointless
})
console.log(capLetters)
// => undefined
```

If we wanted to create a new, modified version of an array, we would use
`map`.

#### .map() (10 minutes / 0:45)

We've discussed functions that were called for their **side effect** versus
functions that are called for their **return value** or **output**. In the
previous example, we used `forEach` to produce some *side effect*.

Frequently, however, rather than do **something with each** item in an array, we
want to do **something to each** item, applying some transformation and
producing a new, modified version of the array.

`forEach` has a closely related sibling `map` that instead of calling a passed
function for its effect, it calls a passed function for its return value and
creates a new array of the return values.

Let's write a loop to create an array called `instructorNames` that will be an
array of 6 strings, the instructor names.

```js
const instructorNames = []
for (let i = 0; i < wdiInstructors.length; i++) {
  let instructor = wdiInstructors[i]
  let instructorName = instructor.name.first + ' ' + instructor.name.last
  instructorNames.push(instructorName)
}
```

Similar to the process before, let's abstract the block of code in the `for`
loop into a function, and call it `getFullName`:

```js
function getFullName (instructor) {
  return instructor.name.first + ' ' + instructor.name.last
}
```

Next, we'll write a loop that calls this function on each instructor in the
array and stores the results in the `instructorNames` array:

```js
const instructorNames = []
for (let i = 0; i < wdiInstructors.length; i++) {
  let fullName = getFullName(wdiInstructors[i])
  instructorNames.push(fullName)
}
```

Now, instead of using a `for` loop to populate an external array (side effect),
let's use the `map` array method to create a new array using `map`'s **return
value**:

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

`map` will return an array that is composed of the **return values** of the
function given when called with each item of the array passed in as an argument.

#### Practicing with Map (15 min, 1:00)

(10 min, 5 Review)

[CodeWars](https://www.codewars.com/kata/coding-meetup-number-2-higher-order-functions-series-greet-developers)

## Break (10 min / 1:10)

### Filter (10 minutes / 1:20)

Another common procedure is to filter elements from an array based on some
custom condition.

The condition will take the form of a function that will return `true` or
`false` when given an element from the collection.

First we'll write the filter function (the custom condition):

```js
function teachesWDI21(instructor) {
  return instructor.cohort === 21
}
```

We can write a loop that uses this function:

```js
const wdi21 = []
for (let i = 0;  i < wdiInstructors.length; i++) {
  if (teachesWDI21(wdiInstructors[i])) {
    wdi21.push(wdiInstructors[i])
  }
}
```

Like `.map()` and `.forEach()`, `.filter()` is available directly on arrays:

```js
const wdi21two = wdiInstructors.filter(teachesWDI21)
```

Or using an anonymous function:

```js
const wdi21three = wdiInstructors.filter((instructor) => {
  return instructor.cohort === 21
})
```

#### Return Value

`filter` will return a new array composed of items for which the
passed in function **returns true** when called on each item.

#### Practice (15 minutes / 1:35)
> (10 minutes working / 5 minutes discussing)

Use either your `script.js` file you've been working in or open
[repl.it](https://repl.it/languages/javascript).

- Declare a variable `states`.
- Assign to it the array of objects from `capitals.json` in this repo.
   > ⌘+A: Select All, copy & paste
- Using the array iteration methods we were just looking at, create the following values (keep track of your answers)

1. Create an array of strings for each capital with the city and state name (e.g. `'Austin, Texas'`)
2. Filter all the states with capitals that start with the letter `A`.
3. List all the states with two words in their name.

#### Code Challenge (10 minutes / 1:45)

[Codewars](http://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe)

## Break (10 minutes / 01:55)

### [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) (15 minutes / 02:10)

The most flexible array method function is called `reduce`. Reduce, as the name
implies, can take an array and reduce it to fewer things. However, since it is
the most flexible of the array iteration methods, it can implement the
functionality of `map`, `filter`, `forEach`, etc.

Reduce is usually difficult to grasp at first; don't stress about this. It is
definitely not something you need to have mastered, it is just good to have an
early awareness. It takes a fair amount of practice to intuitively use
`.reduce()` when solving problems.

#### Example

We can take the sum of an array of numbers (i.e. reduce the set of numbers to
a sum):

```js
const total = [1, 3, 5, 7].reduce((sum, num) => sum + num, 0)
```

Mapping with reduce:

```js
const instructorNames5 = wdiInstructors.reduce((names, instructor) => {
  names.push(instructor.name.first + ' ' + instructor.name.last)
  return names
}, [])
```

Filtering even numbers:

```js
const odds = [1, 2, 3, 4, 5, 6, 7].reduce((odds, num) => {
  if (num % 2) { // false if num % 2 === 0
    odds.push(num)
  }
  return odds
}, [])
```

Or count even numbers:

```js
const numEvens = [1, 2, 3, 4, 5, 6, 7].reduce((count, num) => {
  if (!(num % 2)) { // false if num % 2 !== 0
    count++
  }
  return count
}, 0)
```

#### Histogram

For a step by step of how the mechanics work, check out [this section on the MDN
page for reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#How_reduce_works).

```js
const names = ['Tabitha', 'Jimothy', 'Toad', 'Tabitha', 'Bertha']

const histogramObject = names.reduce((histogram, name) => { 
  if (histogram[name]) {
    histogram[name]++
  } else {
    histogram[name] = 1
  }
  return histogram
}, {})
// histogramObject is:
// { 'Tabitha': 2, 'Jimothy': 1, 'Toad': 1, 'Bertha': 1 }
```

#### Sort (10 minutes / 2:20)

The `sort` method is another higher-order function.

If no input function is supplied, values are sorted as strings by default.

```js
['chips', 'salsa', 'guacamole', 'cheese', 'jalapenos', 'sour cream'].sort()
// => [ 'cheese', 'chips', 'guacamole', 'jalapenos', 'salsa', 'sour cream' ]
```

If the elements are not strings, it converts them to strings and sorts based on
**unicode** values (alphabetized but with all uppercase characters before all
lower case characters).

This leads to the odd behavior of `10` being sorted in front of `2`...

```js
[111, 2, 10, 20, 3, -1, 12].sort()
// => [-1, 10, 111, 12, 2, 20, 3]
```

To make the sort method work as expected, you can write a compare function. It
takes two arguments `a` and `b`, which represent any two elements being sorted.

Rather than returning `true` or `false` as in the case of the other test
functions we've looked at, the elements are sorted according to the return value
of the compare function:

- return a negative number if `a` should come before `b`
- return 0 if `a` and `b` are equal
- return a positive number if `a` should come after `b`

```js
function compareNumbers(a,b) {
  return a - b
}

// with a named function
[111, 2, 10, 20, 3, -1, 12].sort(compareNumbers)
// => [-1, 1, 2, 3, 10, 12, 20]

// with an anonymous function
[111, 2, 10, 20, 3, -1, 12].sort((a, b) => a - b)
// => [-1, 1, 2, 3, 10, 12, 20]
```

How would we write a compare function to sort our capitals from most northern to
most southern?

### Looking Forward: Callbacks (5 minutes / 2:25)

While array iteration methods are a very common example of higher-order
functions, an even more common time that we want to pass functions as arguments
to other functions is called a callback.

These are ideas we'll cover in depth in a couple of classes but consider the
following at a high level as a primer.

Callbacks passed to another function to be called at some later time.

All the examples that we have looked at use the function being passed as an
argument immediately (and repeatedly).

Callbacks are generally called at some time in the future.  What types of things
might we want to trigger a function call on?

### Review and Questions (5 minutes / 2:30)

- Check out the [Coding Meetup Kata's](http://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe) for lots more practice
- [Node School Workshoppers](https://nodeschool.io/#workshoppers) (Functional JavaScript elective)
- [Eloquent JS Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)

#### Review

- What is the difference between output and a side effect?
- What is the difference between an argument and a parameter?
- What is the difference between referencing and invoking a function?
