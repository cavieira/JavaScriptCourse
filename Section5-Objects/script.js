//Function constructor
var Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function () {
  console.log(2020 - this.yearOfBirth);
};

var john = new Person("John", 1990, "teacher"); //instantiation

john.calculateAge();

//Using Object.create
var personProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  },
};

var mary = Object.create(personProto);
mary.name = "Mary";
mary.yearOfBirth = 1980;
mary.job = "singer";
mary.calculateAge();
console.log(mary);

var jane = Object.create(personProto, {
  name: { value: "Jane" },
  yearOfBirth: { value: 1969 },
  job: { value: "designer" },
});

//Primitives vs objects
var a = 13;
var b = a;
a = 45;
console.log(a);
console.log(b);

var obj1 = {
  name: "John",
  age: 26,
};

var obj2 = obj1;
obj1.age = 15;
console.log(obj1);
console.log(obj2);

var age = 10;
var obj = {
  name: "Jonas",
  city: "Lisbon",
};

function change(a, b) {
  a = 30;
  b.city = "Miami";
}

change(age, obj);

console.log(age);
console.log(obj);

//Passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

var res = arrayCalc(years, calculateAge);
console.log(res);

//functions returning functions
function interviewQuestion(job) {
  if (job === "designer") {
    return function (name) {
      console.log(name + " can you explain what UX design is?");
    };
  } else {
    return function (name) {
      console.log("Hello " + name + ", what do you do?");
    };
  }
}

var teacherQuestion = interviewQuestion("teacher");
teacherQuestion("John");

//IIFE
(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);

//Closure
function retirement(retirementAge) {
  var a = " years left until retirement.";
  return function (yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

var retirementUS = retirement(65);
retirementUS(1990);

//Bind, call and apply

var phill = {
  name: "Phill",
  age: 26,
  job: "teacher",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " +
          timeOfDay +
          ", Ladies and gentlmen! I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old."
      );
    } else if (style === "friendly") {
      console.log(
        "Hey! What's up? I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old. Have a nice " +
          timeOfDay +
          "."
      );
    }
  },
};

var emily = {
  name: "Emily",
  age: 35,
  job: "designer",
};

phill.presentation("formal", "morning");
phill.presentation.call(emily, "friendly", "afternoon"); //call method
// phill.presentation.apply(emily, ["friendly", "afternoon"]); //apply method => difference: array

//bind: generates a copy of the function
var phillFriendly = phill.presentation.bind(phill, "friendly");
var emilyFormal = phill.presentation.bind(emily, "formal");

phillFriendly("morning");
phillFriendly("night");
emilyFormal("night");
