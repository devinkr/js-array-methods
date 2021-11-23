# Array Iteration Methods

## Learning Objectives

- Use higher-order functions/methods to iterate over arrays
- Write callback functions to pass to our array iteration methods
- Describe the uses of `forEach`, `map`, `filter`
- Describe the uses of `every`, `some`, `sort`
- Learn to use documentation for the array iteration methods

## Instructions

A development environment has been set up for you in this repo:

1. Clone this directory to your machine.
2. The script files have been linked to the `index.html`. We will comment in the scripts that we're working with!
3. Open `lib/index.html` in the browser using LiveServer.

## Framing & Review

Today we will cover some higher-order array iteration methods which are used to iterate over arrays.
Of course we can do this with `for` or `while` loops,
but looping syntax can be difficult read and reason
about (we have to do a lot of thinking to understand the code).

Array methods are meant to make iterating over and/or transforming data
in arrays easier. These methods will add a powerful set of tools to our
developer toolkit. These methods can also be more powerful,
easier to read, and more intuitive to use than the various control flows that we learned.

## [.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

Iterating over an array and performing some action on every
element in the array is a very common programming task.

As an example, we'll loop through an array logging each value one at a
time using a `for` loop that we're familiar with:

```js
const arr = [2, 5, 3, 7]

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i));
}

```

The `.forEach()` method lets us do the same thing more succinctly:

```js
function print(num) {
	console.log(num);
}

arr.forEach(print); //logs each number to the console
```

We can be even more concise if we pass the callback function anonymously to `forEach`:

```js
arr.forEach(function (num) {
	console.log(num);
});
```

...and even more so if we convert this to the concise-body arrow syntax:

```js
arr.forEach((num) => console.log(num));
```

### How it works:

When using array iteration methods, we don't need to care about how many times the loop will run! The `.forEach()` runs the callback function exactly one time for each element in the array.

Each time the callback function is invoked, it is also passed three arguments: the current element from the array, the index of the current element and the entire array (we're only using the first one above).

The drawback of `.forEach`, however, is that you can't do an early return or break out of the loop early -- as previously stated, the method will run once for each array element.

### You Do: `.forEach`

In your `script.js`, create an array of programming languages you've heard of, such as:

```js
const programmingLanguages = [
	'JavaScript',
	'Python',
	'Rails',
	'Java',
	'C#',
	'C++',
];
```

Use `.forEach` to print the message
`"${programmingLanguage} is a programming language!"`, replacing
`${programmingLanguage}` with one of the languages in your array.

### Return Value

The `.forEach()` method expressly ignores the `return` keyword and instead returns `undefined`.

For example, this is an incorrect usage of `forEach`:

```js
const letters = ['a', 'b', 'c'];

const capLetters = letters.forEach((letter) => {
	return letter.toUpperCase(); //this return is pointless
});

console.log(capLetters);
// => undefined

// letters is unchanged:
console.log(letters);
// => ["a", "b", "c"]
```

We _**can transform the values in the array in place though with `.forEach()`**_ using the index and array arguments:

```js
const words = ['hello', 'this', 'is', 'fun'];

words.forEach((word, index, arr) => {
	arr[index] = word.toUpperCase();
});

console.log(words);
```

Alternatively, we can create a new array and push the updated values to it, leaving the original unchanged:

```js
const words = ['hello', 'this', 'is', 'fun'];

const newWords = [];

words.forEach((word) => {
	const uppercased = word.toUpperCase();
	newWords.push(uppercased);
});

console.log(newWords);
// [ 'HELLO', 'THIS', 'IS', 'FUN' ]
```

If we want to leave the original array unchanged there's a much cleaner to do that with the `.map()` method.

## [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

With `.forEach()`, we can modify the existing array. However, if we don't want to modify the existing array, and instead we want to produce a **new array of the same size** containing the transformed value, then `.map()` is the way to go.

The `.map()` is a closely related sibling to `.forEach()`. The only difference
between the useage of the two is that you **must always return something from map**.

Using the same `words` array from before, let's do the same transformation (by
capitalizing each word). Only this time, we'll do it better.

We'll start by writing them separately.

```js
function makeUpperCase(word) {
	const upper = word.toUpperCase();
	return upper;
}

const uppercaseWords = words.map(makeUpperCase);

console.log(uppercaseWords);
// [ 'HELLO', 'THIS', 'IS', 'FUN' ]
```

Lovely! So let's refactor it now using an arrow function and moving
the logic all into one line.

```js
// STEP 1: Convert it to an arrow function
const uppercaseWords = words.map((word) => {
	return word.toUpperCase();
});
```

```js
// STEP 2: Use the implied return to make it one line!
const uppercaseWords = words.map((word) => word.toUpperCase());
```

### How it works:

Once again, unlike a `for`, `while` or `doWhile` loop, we don't need to worry about how many times the `.map()` will run! It runs the callback function exactly one time for each element in the array.

And, just like with `.forEach()`, each time the `.map()` callback function is invoked, it is passed three arguments: the current element from the array, the index of the current element and the entire array (we're only using the first one above).

The `.map()` method **always** returns a new array of the _**same**_ length of the original array. Whatever value is returned from the callback is what is added to the new array for the current element. That means that if you forget the return in your callback, you'll get an array of the same length as the original containing all `undefined` values!

### You do: Map practice!

#### Prompt 1

Using the array of numbers provided below, write a map function that squares
each number (multiplies it by itself). You should end up with another array of
equal length.

```js
const numbers = [
	15, 18, 3921, 327, 88, 1235, 1, 55855, 34, 5, 9, 9019, 156, 874, 76, 444,
	12346,
];
```

#### Prompt 2

Taking the array of instructor objects below, create map functions that do the following:

```javascript
const instructors = [
	{
		name: 'Carlos',
		location: 'New Jersey',
		likes: ['Python', 'Bitcoin', 'software engineering'],
	},
	{
		name: 'Shaw',
		location: 'San Diego',
		likes: ['white peaches', 'running', 'software engineering'],
	},
	{
		name: 'Esin',
		location: 'Austin',
		likes: ['coffee', 'tacos', 'yoga'],
	},
];
```

- return an array called `greetings` that contains a personalized greeting: 'Hello `name`!'
- return an array called `likeBetter` that asks which they like better, their first or second like: 'Do you like `first like` or `second like` better?

**Challenge**: Can you use `.forEach()` to add a `greeting` property to each instructor object in the instructors array that greets them by their name?

## [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Another common procedure is to filter elements from an array based on some
custom condition.

Using `.filter()` allows us to do this easily. It will return a **new** array with
only the filtered results (so, it doesn't change the original array). That means that the new array might contain any number of elements from 0 to the length of the original array (assuming all of the elements in the original array passed our condition).

If the `.filter()` method's callback function it returns `true` (or _truthy_), the current element is added to the new array. If callback does not return `true` or truthy, the current element is skipped.

Use the numbers array above for this exercise.

First we'll write the filter function (the custom condition):

```js
function greaterThan100(num) {
	return num > 100;
}
```

We could write a loop that uses this function:

```js
const bigNums = [];
for (let i = 0; i < numbers.length; i++) {
	if (greaterThan100(numbers[i])) {
		bigNums.push(numbers[i]);
	}
}
```

The `.filter()` method is so much cleaner though:

```js
const bigNums = numbers.filter(greaterThan100);
```

Of course we can use an anonymous function as well:

```js
const bigNums = numbers.filter((num) => num > 100);
```

### How it works:

The `.filter()` runs a callback function exactly one time for each element in the array, just like the previous iteration methods we explored. Of course, this means, we don't have to worry about telling how many times to loop.

And, just like `.forEach()` and `.map()`, each time the `.filter()` callback function is invoked, it is passed three arguments: the current element from the array, the index of the current element and the entire array (we're only using the first one above).

The `.filter()` method **always** returns a new array. The elements will be all of the elements from the original array that pass the test in our callback function. If the callback function returns a truthy value, the current element is added to the new array, otherwise it is skipped.

It's important to remember that if you don't return anything from you callback, the callback will return `undefined` by default, which is treated as _falsy_ in JavaScript. That means, if you forget your return, the `.filter()` method will return an empty array!

### You Do: Practice with Arrays of Objects

In your `lib/js/states.js` file:

- Declare a variable `states`.
- Assign to it the array of objects from `capitals.json` in this repo.
  > ⌘+A: Select All, copy & paste
- Using the array iteration methods we were just looking at, create the
  following values (keep track of your answers)

1. Create an array of strings for each capital with the city and state name
   (e.g. `'Austin, Texas'`)
2. Filter all the states with capitals that start with the letter `A`.
3. List all the states with two words in their name.

## [.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) and [.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

Use `.every()` to see if every element in an array passes a given test.

```js
const numbers = [
	15, 18, 3921, 327, 88, 1235, 1, 55855, 34, 5, 9, 9019, 156, 874, 76, 444,
	12346,
];

const allOdd = numbers.every((num) => num % 2);
// allOdd returns false
```

Use `.some()` to see if some elements in an array pass a given test.

```
const nachoIngredients = ['chips', 'salsa', 'guacamole', 'cheese', 'jalapenos', 'sour cream'];
const containLetterC = nachoIngredients.some(ingredient => ingredient.includes('c'));
// containLetterC returns true

```

## [.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

The `.sort()` method is another higher-order function.

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

- return a negative number if `a` should come before `b`
- return 0 if `a` and `b` are equal
- return a positive number if `a` should come after `b`

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

## .reduce()

The most flexible array method function is called [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). Reduce, as the name
implies, can take an array and reduce it to a single value. However, since it is
the most flexible of the array iteration methods, it can implement the
functionality of `map`, `filter`, `forEach`, etc.

Reduce is usually difficult to grasp at first; don't stress about this. It is
definitely not something you need to have mastered, it is just good to have an
early awareness. It takes a fair amount of practice to intuitively use
`.reduce()` when solving problems.

### Example

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

We can even use `.reduce()` to iterate over an array of objects and generate a new object with counts of a property:

```javascript
const letterCounts = 'hello world'.split('').reduce((runningCounts, letter) => {
	if (runningCounts[letter]) {
		runningCounts[letter]++;
	} else {
		runningCounts[letter] = 1;
	}
	return runningCounts;
}, {});
```

For a step by step of how the mechanics work, check out
[this section on the MDN page for reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#How_reduce_works).

## Phew, that was a lot!

We covered some of the most commonly used array methods in class today, but there are more to learn, such as `findIndex`, `includes`, etc. That's why it's important to get comfortable reading documentation and figuring out how to use tools like Google and Stack Overflow to get the information that you need.

When you can use the tools at your disposal to teach yourself, you have the meta-skills to learn any new language or framework -- the sky is the limit!

## Practice On Your Own:

- Minions Callback Array Methods [Lab](../../../callback-array-methods-lab)

- Need a challenge? Try this [CodeWars](https://www.codewars.com/kata/coding-meetup-number-2-higher-order-functions-series-greet-developers) kata that covers array methods that use higher-order functions.

- Also check out the rest of the
  [Coding Meetup Katas](http://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe)
  for lots more practice
- [Node School Workshoppers](https://nodeschool.io/#workshoppers) (Functional
  JavaScript elective)
- [Eloquent JS Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)

### Even More Resources

- [Array Iteration Method Practice Problems](extra-practice.md)
- [Array Methods Explained: filter, map, reduce, & forEach](https://codeburst.io/array-methods-explained-filter-vs-map-vs-reduce-vs-foreach-ea3127c6d319)
- [A Guide To The Reduce Method In Javascript​](https://medium.freecodecamp.org/reduce-f47a7da511a9)
- [Array Method Explorer](https://sdras.github.io/array-explorer/)
- [W3Schools Array Iteration Methods](https://www.w3schools.com/js/js_array_iteration.asp)
- [How to use Array Iteration Methods | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods)
- [:movie_camera: JavaScript Array Methods Playlist - The Coding Train](https://www.youtube.com/watch?v=H4awPsyugS0&list=PLRqwX-V7Uu6aAEUqu96Newc-7qpuh-cxc)
- [:movie_camera: Array Iteration: Methods - freeCodeCamp](https://www.youtube.com/watch?v=Urwzk6ILvPQ)
