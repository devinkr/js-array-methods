console.log('hello from some and every!');

// Much like filter, some and every to let us know whether array elements meet a certain condition
// Unlike filter, some and every return BOOLEANS

// Use .every() to see if every element in an array passes a given test.

const numbers = [
	15, 18, 3921, 327, 88, 1235, 1, 55855, 34, 5, 9, 9019, 156, 874, 76, 444,
	12346,
];

function checkIfOdd(element) {
	// returns true if the number is odd
	if (element % 2 === 1) {
		return true;
	} else {
		// return false if the number is even
		return false;
	}
}

const areAllOdd = numbers.every(checkIfOdd);
console.log(areAllOdd);

const someStates = [
	'Texas',
	'California',
	'New Jersey',
	'Oregon',
	'Virginia',
	'North Dakota',
];

// You Do: Use .every to see if every element in the states array is greater than 8 characters

// Step 1: Define your callback function that returns true if the element's length is greater than 8 and false if not

// Drew's code!
function moreThanEight(elem) {
	// returns true if elements length greater than 8
	if (elem.length > 8) {
		// return true if longer than 8
		return true;
	} else {
		// return false if length is less than 8
		return false;
	}
}

// Step 2: Use the .every method on the someStates array and pass the callback function reference

const longStates = someStates.every(moreThanEight);
console.log(longStates);

// .some is used when we want to know if AT LEAST one of the elements in an array passes the test condition

const areThereLongStates = someStates.some(moreThanEight);
console.log(areThereLongStates);

const nachoIngredients = [
	'chips',
	'salsa',
	'guacamole',
	'cheese',
	'jalapenos',
	'sour cream',
];
const containLetterC = nachoIngredients.some((ingredient) =>
	ingredient.includes('c')
);
// containLetterC returns true
