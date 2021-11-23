console.log('hello from filter!');

const numbers = [
	15, 18, 3921, 327, 88, 1235, 1, 55855, 34, 5, 9, 9019, 156, 874, 76, 444,
	12346,
];

// Filter needs a callback function that will test whether each element meets a certain condition
// Callback function should return TRUE if we want to keep the element, FALSE if we want to discard the element
function isGreaterThan100(element) {
	return element > 100;
}

// Filter also returns a transformed array, but with the values that pass the test condition
const bigNumbers = numbers.filter(isGreaterThan100);
// const bigNumbers = numbers.filter(num => num > 100);
console.log(bigNumbers);
