"use strict";

//Scope
/*function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      var millenial = true;
      const firstName = "Steven";
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      const output = "NEW OUTPUT";
    }
    console.log(millenial);
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = "Camila";
calcAge(1992);*/

//Hoisting with variables
/*console.log(me);
console.log(job);
console.log(year);

var me = "Jonas";
let job = "teacher";
const year = 1991;*/

// Hosting with functions
/*console.log(addDecl(2, 3));
console.log(addExpr(2, 3));
console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

var addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;*/

//Example
/*if (!numProducts) deleteShoppingCart();
var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}*/

//This keyword
console.log(this); //window object

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //undefined in strict mode
};
calcAge(1991);

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this); //window object, it uses the parent scope
};
calcAgeArrow(1991);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
  },
};
jonas.calcAge();

const matilda = {
  year: 1991,
  calcAge: () => {
    console.log(this);
  },
};
matilda.calcAge();
