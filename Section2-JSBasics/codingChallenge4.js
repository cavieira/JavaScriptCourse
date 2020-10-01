/*****************************
 * CODING CHALLENGE 4
 */

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.
Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
GOOD LUCK 😀
*/

var john = {
  fullName: "John Smith",
  mass: 60,
  height: 1.65,
  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
  },
};

var mark = {
  fullName: "Mark Ronson",
  mass: 88,
  height: 1.7,
  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
  },
};

john.calcBMI();
mark.calcBMI();

if (john.bmi > mark.bmi) {
  console.log(john.fullName + " has the highest BMI of " + john.bmi);
} else if (mark.bmi > john.bmi) {
  console.log(mark.fullName + " has the highest BMI of " + mark.bmi);
}
