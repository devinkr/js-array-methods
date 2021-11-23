console.log('hello from map!');

// Map, unlike forEach, has a RETURN value
// We use it when we want to RETURN a new array of transformed values
// Map ALSO takes a callback function, with one required argument: element, but can also take arguments for the index, and the array.

const words = ['hello', 'this', 'is', 'fun'];

// First define your external callback function
// This function is what will do the "transforming action" that we need our map to do
function makeUpperCase(word) {
	return word.toUpperCase();
}

// Then call the method on the array
// Pass the external function as a reference to .map
// Store the return value of transformed array elements in a variable
const upperCaseWords = words.map(makeUpperCase);
console.log(upperCaseWords);
// ["HELLO", "THIS", "IS", "FUN"]

// Alternatively, you can define callback anonymously
const moreUpperCaseWords = words.map((word) => word.toUpperCase());

// You do: https://git.generalassemb.ly/SEIR-809/js-array-methods#you-do-map-practice

// Prompt 1
// Using the array of numbers provided below, write a map function that squares each number (multiplies it by itself). You should end up with another array of equal length.

const numbers = [
	15, 18, 3921, 327, 88, 1235, 1, 55855, 34, 5, 9, 9019, 156, 874, 76, 444,
	12346,
];

function numSquared(numbers) {
	return Math.pow(numbers, 2);
}

const numbers2 = numbers.map(numSquared);
console.log(numbers2);

// Prompt 2
// Taking the array of instructor objects below, create map functions that do the following:

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

// return an array called greetings that contains a personalized greeting: 'Hello name!'

// ['Hello Carlos!', 'Hello Shaw!', 'Hello Esin!'];

function makeGreetings(element) {
	return `Hello ${element.name}!`;
	// return 'Hello ' + element['name'] + '!';
}

// const greetings = instructors.map(makeGreetings);
const greetings = instructors.map((element) => `Hello ${element.name}!`);
console.log(greetings);

// return an array called likeBetter that asks which they like better, their first or second like: 'Do you like first like or second like better?
function likeBetter(elem) {
	return `Do you like ${elem.likes[0]} or ${elem.likes[1]} better?`;
}

const likes = instructors.map(likeBetter);
console.log(likes);

// Challenge: Can you use .forEach() to add a greeting property to each instructor object in the instructors array that greets them by their name?
// Use forEach to perform a side effect of modifying the instructors array
instructors.forEach((instructor) => {
	instructor.greeting = `Hello, ${instructor.name}!`;
});

console.log(instructors);
