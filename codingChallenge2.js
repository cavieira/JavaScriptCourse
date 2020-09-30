/*****************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.
1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)
4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.
GOOD LUCK 😀
*/

var johnGame1 = 89;
var johnGame2 = 120;
var johnGame3 = 103;

var mikeGame1 = 116;
var mikeGame2 = 94;
var mikeGame3 = 123;

var maryGame1 = 97;
var maryGame2 = 134;
var maryGame3 = 105;

var averageJohn = (johnGame1 + johnGame2 + johnGame3)/3;
var averageMike = (mikeGame1 + mikeGame2 + mikeGame3)/3;
var averageMary = (maryGame1 + maryGame2 + maryGame3)/3;
 
if (averageJohn > averageMike && averageJohn > averageMary) {
    console.log("John is the winner with " + averageJohn + " points.");
} else if (averageMike > averageJohn && averageMike > averageMary) {
    console.log("Mike is the winner with " + averageMike + " points.");
} else if (averageMary > averageJohn && averageMary > averageMike) {
    console.log("Mary is the winner with " + averageMary + " points.");
} else {
    console.log("Draw!");
}

