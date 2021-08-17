console.log('hello from foreach!');

// Previous way to iterate over an array
const arr = [2, 5, 3, 7];

// Print function
function printThing(element, index, array) {
	console.log(`The element at index ${index} is ${element} in array ${array}`);
	// console.log(element);
	// console.log(index);
	// console.log(array);
}

function sayHello() {
	console.log('hello world');
}

// Can iterate with a for loop
// for (let i = 0; i < arr.length; i++) {
// 	printThing(arr[i]);
// }

// Can iterate with the built-in .forEach method
// Pass in an externally defined function
// arr.forEach(printThing);
// arr.forEach(sayHello);

// Can also write an anonymous function directly in the clappers
// arr.forEach(function (element) {
// 	console.log(element);
// });

// Can also write more concisely using single-line arrow notation
// arr.forEach()
arr.forEach((element) => console.log(element));

// .forEach is a higher order function that takes a callback function as an argument

// You do:
// Make an array called breakoutRoom with the names of your teammates as strings
// Use the forEach method to print the names of each person in the breakout room!
const brArray = ['Matt', 'Benjamin', 'Hayden', 'Brandon'];

function printOut(elem, index, array) {
	console.log(`${elem} is at index ${index}`);
}

brArray.forEach(printOut);
// brArray.forEach((name) => console.log(name));

// .forEach does NOT have a return value
// It just manipulates outside data
// Performing a side effect

const words = ['hello', 'this', 'is', 'fun'];

words.forEach((word, index, arr) => {
	arr[index] = word.toUpperCase();
});

// console.log(words); // ["HELLO", "THIS", "IS", "FUN"]
