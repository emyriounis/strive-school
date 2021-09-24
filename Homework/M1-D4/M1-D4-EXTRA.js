// Additional assignments for Day 4

/* EXTRA 1
 Write a piece of code for reverting an array.
 es:
 [1, 3, 5] ==> [5, 3, 1]
*/

/* WRITE YOUR ANSWER HERE */

/* EXTRA 2
 Write a piece of code for getting the maximum numerical value from an array.
*/

let arr = [32, 34, 4, 674, 243]
let max = null
arr.map(num => (num > max) && (max = num))
console.log(max)

/* EXTRA 3
 Write a piece of code for getting the minimum numerical value from an array.
*/


let arr2 = [32, 34, 4, 674, 243]
let min = null
arr2.map(num => (num < min) && (min = num))
console.log(min)

/* EXTRA 4
 Write a piece of code for getting only even numerical values from an array.
*/

let arr3 = [32, 34, 4, 674, 243]
let even = []
arr3.map(num => (num % 2 === 0) && (even.push(num)))
console.log(even)

/* EXTRA 5
 Write a piece of code for deleting only even entries from an array.
*/

/* WRITE YOUR ANSWER HERE */

/* EXTRA 6
 Write a piece of code for removing all the vowels from a string.
*/

/* WRITE YOUR ANSWER HERE */

/* EXTRA 7
 Write a piece of code for increasing all the numerical values in a array by 1.
*/

let arr4 = [32, 34, 4, 674, 243]
arr4.map((num, index) => arr4[index] = ++num)
console.log(arr4)

/* EXTRA 8 
 Replace all the strings contained in an array with their length.
 es.: ["strive", "is", "great"] => [6, 2, 5]
*/

let arr5 = ["strive", "is", "great"]
arr5.map((str, index) => arr5[index] = str.length)
console.log(arr5)

/* WHEN YOU ARE FINISHED
 Upload the .js file on Eduflow before 5PM CET. In the next days we'll also learn how to use GIT!
*/