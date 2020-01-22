console.log("No script.js");

var firstName = 'John';
var lastName = 'Smith';
var age = 15;
var fullAge = false;
var job; //undefined
job = 'Student';

console.log(`${firstName + lastName}`);
console.log(firstName,lastName);

/*Variable mutation and type coercion*/
console.log(firstName + ' ' + age); //convert number into string

var isMarried, sport;
isMarried = false;
sport = 'tennis';

alert(firstName + ' plays ' + sport + 
'. Is he married? ' + (isMarried ? 'Yes' : 'No'));

lastName = prompt('What is his last name?');
console.log(firstName,lastName);

age = 'fifteen'; //variable mutation
console.log(age);

var ageMark = 22;

//Logical operators
console.log((ageMark < age));

//typeof operator
console.log(typeof ageMark);

