// Additional assignments for Day 3

/* EXTRA 1
 Use a ternary operator to assign to a variable called gender the string values "male" or "female".
 The choice should be made based on the value of another variable called isMale.
*/

let gender = isMale ? "male" : "female"

/* EXTRA 2
 Write a piece of code for checking if, given two integers, the value of one of them is 8 or if their addition or subtraction is equal to 8.
*/

const eight = (x, y) => (x === 8 || y === 8 || x + y === 8 || x - y === 8) ? true : false

/* EXTRA 3
 Create a variable and assign to it the concatenation of two strings.
*/

let con = "eight" + "millions"

/* EXTRA 4
 Create three variables and assign a numerical value to each one of them. 
 Using a conditional statement, write a piece of code for sorting their values from highest to lowest.
 Display the result in the console.
*/

let x = 3
let y = 4
let z = 5

x > y && x > z ?
    y > z ? console.log(x, y, z) : console.log(x, z, y) 
: y > z && y > x ?
    x > z ? console.log(y, x, z) : console.log(y, z, x)
: x > y ? console.log(z, x, y) : console.log(z, y, x)

/* EXTRA 5
 Write a piece of code for finding the average of two given integers.
*/

const avg = (int1, int2) => (int1 + int2) / 2

/* EXTRA 6
 Write a piece of code for finding the longest of two given strings.
*/

const longest = (str1, str2) => str1.length > str2.length ? str1 : str2

/* EXTRA 7
 Write a piece of code for checking if a given value is a integer or not.
*/

const int = (integer) => integer === parseInt(integer)

/* EXTRA 8
 Write a piece of code for calculating a certain percentage of a given number.
 (Ex.: the 20% of 400 is 80)
*/

const calc = (percentage, number) => percentage * number / 100 

/* EXTRA 9
 Write a piece of code for checking if a given number is even or odd.
*/

const even = (number) => number / 2

/* WHEN YOU ARE FINISHED
 Upload the .js file on Eduflow before 5PM CET. In the next days we'll also learn how to use GIT!
*/