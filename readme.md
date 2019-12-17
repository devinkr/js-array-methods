# Array Iteration Methods & Higher-Order Functions

## Learning Objectives

-   Define higher-order functions
-   Use higher-order functions to iterate over arrays
-   Describe the uses of `forEach`, `map`, `filter`, and `reduce`
-   Define `every` and `some`

## Framing & Review

Today we will cover some array methods which are used to transform arrays. This
could be as simple as multiplying each number in an array of numbers by a
certain factor, or adding them all together to obtain their sum.

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

-   Defined block of code that can be called by later code
-   Functions are defined with zero or more **parameters**
    -   **Parameters** are the variables for the function inputs upon definition
    -   **Arguments** are the values passed in to the function when it is called

<details>
  <summary> What is a method? </summary>
  A method is a function that is defined on an object or class. Methods begin with a <code>.</code>, since they are object-properties. For example, <code>.push()</code> and <code>.reverse()</code> are methods, specifically <code>Array</code> methods.
</details>

#### Function Declaration

```js
function sum(a, b) {
	// function "sum" defined with parameters a and b
	return a + b;
}
```

#### Function Expression

```js
// ES5 Style
var sum = function(a, b) {
	return a + b;
};

// ES6 Style, with Arrow Functions
const sum = (a, b) => a + b;
```

#### Function Invocation (calling a function)

```js
sum(3, 4); // function "sum" called with arguments a and b
// => 7
```

Functions always return a value, either...

1. whatever follows a function's **return** statement
2. or if there is no return statement, the function returns the value
   `undefined`.

```js
// in a repl, like the chrome console
console.log('hello!');
// 'hello!'
// => undefined
//// console.log() returns `undefined`, which appears below the console-logged message
```

### Functions as Values

One of the things that makes JavaScript so powerful is that we can reference
functions and treat them like values stored in a variable.

The impact of this is we can:

-   add functions to arrays and objects, just like any other value
-   pass functions as arguments to another function
-   return a function from a function

> Open up a [repl.it](https://repl.it/languages/javascript) and see for
> yourself!

> 1. Create an array and add a function to it in the first index. How do you
>    invoke it?

> 1. Create a function that takes a function as an argument. How do you invoke
>    it?

> 1. Create a function that returns another function. How do you invoke them?

Taking functions as arguments and returning functions is a little advanced, so
we're just going to touch on it today. But the significance is: a function that
takes a function as an argument is called a _higher-order function._

## Higher-Order Functions

![What if I told you](morpheus.png)

Functions that take other functions as arguments or return them as output are
called **higher-order functions**. The array methods that we're going to learn
today all fit this definition: they are functions (methods of the Array object)
that take a function as an argument and use it to transform an array of data.
The purpose is to provide a level of abstraction and simplify array iteration
(going through each element in an array and performing some operation).

### Passing Functions to Functions

In order to explore some of the higher-order functions JavaScript provides,
let's set up a simple development environment:

1. Create a directory called `js-higher-order-functions` in your `sandbox`
   directory.
1. Inside of it create an `index.html` file and a `script.js` file.
1. Add boilerplate to `index.html`, link the script, then add a `console.log` to
   the script to make sure everything is wired up properly.

We'll use the following array for the next few examples:

```js
const words = [
	'hello',
	'this',
	'is',
	'a',
	'stickup',
	'gimme',
	'your',
	'wallet'
];
```

### .forEach()

Very frequently, we will want to go through an array and do something for every
element in the array.

As an example, we'll loop through the above array printing each value one at a
time.

Without higher-order functions, we would need to use a loop to perform this task
(and we can do so in JS)...

```js
for (let i = 0; i < words.length; i++) {
	console.log(words[i]);
}
```

If we want, we can write a function that encapsulates the operation taken on
each instructor object:

```js
function printWord(word) {
	console.log(word);
}
```

And then rewrite the loop to call this function and pass in each instructor
object as an argument...

```js
function printWord(word) {
	console.log(word);
}

for (let i = 0; i < words.length; i++) {
	printWord(words[i]);
}
```

This process of iterating through an array is so common that JavaScript provides
an array method for it called `forEach`. Methods are functions attached to an
object (in this case, attached to the Array). Let's get rid of the `for` loop
and replace it with a `forEach`.

```js
function printWord(word) {
	console.log(word);
}

words.forEach(printWord);
```

> Note that here we are _referencing_ the `printWord` function, not invoking it.
> Don't write this: `words.forEach(printWord())`

This will go through each object in the `words` array and execute the
`printWord` function for each object in it, passing each object into the
function as an argument.

Commonly, we might write this using an _anonymous function_ (unnamed) instead of
a _named function_ (as we did above). An anonymous function is simply a function
without a name, that we declare **inline**, or in place of a function argument.

If we changed the above code to use an anonymous function, it would look like
this:

```js
words.forEach(function(word) {
	console.log(word);
});
```

> Note that this is functionally no different than the above code snippet, only
> here we are defining an anonymous function in place, instead of defining one
> externally and referencing it as an argument.

We could rewrite this to use ES6 arrow functions as well. This is the most
common form you'll see of these functions:

```js
words.forEach(word => {
	console.log(word);
});
```

#### You Do: `.forEach`

In your `script.js`, create an array of programming languages you've heard of.
Use `.forEach` to print the message
`"${programmingLanguage} is a programming language!"`, replacing
`${programmingLanguage}` with one of the languages in your array.

#### Return Value

When using any function or method, it is important to keep in mind the return
value that it will output. With `forEach`, the return value is `undefined`. As
such, we should use `forEach` when we want to _use_ each item in an array to
produce some _side effect_, but **not** to produce a new version of the array.

For example, this would be a misuse of `forEach`:

```js
let letters = ['a', 'b', 'c'];
let capLetters = letters.forEach(letter => {
	return letter.toUpperCase(); //this return is pointless
});
console.log(capLetters);
// => undefined
console.log(letters);
// ["A", "B", "C"]
```

Let's step up the `.forEach` example a bit.

Using the same list of words, let's create a new list of uppercased words.

```js
let newWords = [];
words.forEach(word => {
	let uppercased = word.toUpperCase();
	newWords.push(uppercased);
});

console.log(newWords);
// ​​​​​[ 'HELLO', 'THIS', 'IS', 'A', 'STICKUP', 'GIMME', 'YOUR', 'WALLET' ]​​​​​
```

Cool, so we can iterate through a list of words and create a new list from it,
but the example is still a bit rough. We don't like creating functions that have
**side effects** because it's bad practice.

> When a function changes or affects something outside of itself, it's
> considered a side-effect.

There's a much cleaner way. We can create a new, modified version of an array,
without affecting the old array.

Enter the `map` function.

## Break

#### .map()

We've discussed functions that were called for their **side effect** versus
functions that are called for their **return value** or **output**. In the
previous example, we used `forEach` to produce some _side effect_.

Frequently, however, rather than do **something with each** item in an array, we
want to do **something to each** item, applying some transformation and
producing a new, modified version of the array.

`forEach` has a closely related sibling called `map`. The only difference
between the two is that you **must always return something from map**. In
`forEach`, returning anything is pointless.

Using the same `words` array from before, let's do the same transformation (by
capitalizing each word). Only this time, we'll do it better.

We'll start by writing them separately.

```js
function makeUpperCase(word) {
	let upper = word.toUpperCase();
	return upper;
}

const uppercaseWords = words.map(makeUpperCase);

console.log(uppercaseWords);
// ​​​​​[ 'HELLO', 'THIS', 'IS', 'A', 'STICKUP', 'GIMME', 'YOUR', 'WALLET' ]
```

Lovely! So let's refactor it now.

```js
const uppercaseWords = words.map(function(word) {
	let upper = word.toUpperCase();
	return upper;
});
```

We can condense it even further, by making it into an arrow function and moving
the logic all into one line.

```js
const uppercaseWords = words.map(word => {
	return word.toUpperCase();
});
```

Finally, let's rely on the implicit return of arrow functions for some truly
beautiful code.

```js
const uppercaseWords = words.map(word => word.toUpperCase());
```

Map is truly the greatest.

### You do: mapping the numbers

Using the array of numbers provided below, write a map function that squares
each number (multiplies it by itself). You should end up with another array of
equal length.

```js
const numbers = [
	15,
	18,
	3921,
	327,
	88,
	1235,
	1,
	55855,
	34,
	5,
	9,
	9019,
	156,
	874,
	76,
	444,
	12346
];
```

### Break

### Filter

Another common procedure is to filter elements from an array based on some
custom condition.

The condition must return true or false. If it returns true, the element is kept
and stored in the new array. If false, it's skipped.

Use the numbers array above for this exercise.

First we'll write the filter function (the custom condition):

```js
function greaterThan100(num) {
	return num > 100;
}
```

We can write a loop that uses this function:

```js
const bigNums = [];
for (let i = 0; i < numbers.length; i++) {
	if (greaterThan100(numbers[i])) {
		bigNums.push(numbers[i]);
	}
}
```

Like `.map()` and `.forEach()`, `.filter()` is available directly on arrays:

```js
const bigNums = numbers.filter(greaterThan100);
```

Or using an anonymous function:

```js
const bigNums = numbers.filter(num => {
	return num > 100;
});
```

#### Return Value

`filter` will return a new array composed of items for which the passed in
function **returns true** when called on each item.

#### Practice with Arrays of Objects

Use either your `script.js` file you've been working in or open
[repl.it](https://repl.it/languages/javascript).

-   Declare a variable `states`.
-   Assign to it the array of objects from `capitals.json` in this repo.
    > ⌘+A: Select All, copy & paste
-   Using the array iteration methods we were just looking at, create the
    following values (keep track of your answers)

1. Create an array of strings for each capital with the city and state name
   (e.g. `'Austin, Texas'`)
2. Filter all the states with capitals that start with the letter `A`.
3. List all the states with two words in their name.

### [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

The most flexible array method function is called `reduce`. Reduce, as the name
implies, can take an array and reduce it to a single value. However, since it is
the most flexible of the array iteration methods, it can implement the
functionality of `map`, `filter`, `forEach`, etc.

Reduce is usually difficult to grasp at first; don't stress about this. It is
definitely not something you need to have mastered, it is just good to have an
early awareness. It takes a fair amount of practice to intuitively use
`.reduce()` when solving problems.

#### Example

We can take the sum of an array of numbers (i.e. reduce the set of numbers to a
sum):

```js
const total = [1, 3, 5, 7].reduce((sum, num) => sum + num, 0);
```

Mapping with reduce:

```js
const stickup = words.reduce((instructions, word) => {
	instructions.push(word.toUpperCase());
	return instructions;
}, []);
```

Filtering even numbers:

```js
const odds = [1, 2, 3, 4, 5, 6, 7].reduce((odds, num) => {
	if (num % 2) {
		// false if num % 2 === 0
		odds.push(num);
	}
	return odds;
}, []);
```

Or count even numbers:

```js
const numEvens = [1, 2, 3, 4, 5, 6, 7].reduce((count, num) => {
	if (!(num % 2)) {
		// false if num % 2 !== 0
		count++;
	}
	return count;
}, 0);
```

For a step by step of how the mechanics work, check out
[this section on the MDN page for reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#How_reduce_works).

#### Bonus: Sort

The `sort` method is another higher-order function.

If no input function is supplied, values are sorted as strings by default.

```js
['chips', 'salsa', 'guacamole', 'cheese', 'jalapenos', 'sour cream'].sort();
// => [ 'cheese', 'chips', 'guacamole', 'jalapenos', 'salsa', 'sour cream' ]
```

If the elements are not strings, it converts them to strings and sorts based on
**unicode** values (alphabetized but with all uppercase characters before all
lower case characters).

This leads to the odd behavior of `10` being sorted in front of `2`...

```js
[111, 2, 10, 20, 3, -1, 12].sort();
// => [-1, 10, 111, 12, 2, 20, 3]
```

To make the sort method work as expected, you can write a compare function. It
takes two arguments `a` and `b`, which represent any two elements being sorted.

Rather than returning `true` or `false` as in the case of the other test
functions we've looked at, the elements are sorted according to the return value
of the compare function:

-   return a negative number if `a` should come before `b`
-   return 0 if `a` and `b` are equal
-   return a positive number if `a` should come after `b`

```js
function compareNumbers(a, b) {
	return a - b;
}

let array = [111, 2, 10, 20, 3, -1, 12];

// with a named function
array.sort(compareNumbers);
// => [-1, 1, 2, 3, 10, 12, 20]

// with an anonymous function
array.sort((a, b) => a - b);
// => [-1, 1, 2, 3, 10, 12, 20]
```

How would we write a compare function to sort our capitals from most northern to
most southern?

### Looking Forward: Callbacks

While array iteration methods are a very common example of higher-order
functions, an even more common time that we want to pass functions as arguments
to other functions is called a callback.

These are ideas we'll cover in depth in a couple of classes but consider the
following at a high level as a primer.

Callbacks passed to another function to be called at some later time.

All the examples that we have looked at use the function being passed as an
argument immediately (and repeatedly).

Callbacks are generally called at some time in the future. What types of things
might we want to trigger a function call on?

### Practice On Your Own:

-   Minions Callback Array Methods [Lab](https://git.generalassemb.ly/seir-129/callback-array-methods-lab)

-   Need a challenge? Try this [CodeWars](https://www.codewars.com/kata/coding-meetup-number-2-higher-order-functions-series-greet-developers) kata that covers array methods that use higher-order functions.

-   Also check out the rest of the
    [Coding Meetup Katas](http://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe)
    for lots more practice
-   [Node School Workshoppers](https://nodeschool.io/#workshoppers) (Functional
    JavaScript elective)
-   [Eloquent JS Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)
