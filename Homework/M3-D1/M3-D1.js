/* 1. Create a function to calculate the sum of the two given integers. If the two values are the same, return triple their sum. */

const sum = (num1, num2) => (num1 == num2 ? 6 * num1 : num1 + num2);

/* 2. Create a function to check two given integers. Return `true` if one of them is 50 or if their sum is 50. */

const checkInt = (num1, num2) =>
  num1 === 50 || num2 === 50 || num1 + num2 === 50;

/* 3. Create a function to remove a character at a specified position from a given string: pass the position and the string as parameters, return the new string. */

const removeStr = (position, string) => string.splice(position, 1);

/* 4. Create a function to find and return the largest of three given integers. */

const largest = (n1, n2, n3) =>
  n1 > n2 && n1 > n3 ? n1 : n2 > n1 && n2 > n3 ? n2 : n3;

/* 5. Create a function to check if two numbers are in the range 40-60 or 70-100. 
    Return `true` if they do, return `false` if one (or both) don't. */

const checkRange = (n1, n2) =>
  ((40 <= n1 && n1 <= 60) || (70 <= n1 && n1 <= 100)) &&
  ((40 <= n2 && n2 <= 60) || (70 <= n2 && n2 <= 100));

/* 6. Create a function to create a new string composed of a specified number of copies of a given string. 
    Pass the string and the number of copies as parameters. */

const newStr = (str, num) => str.repeat(num);

/* 7. Create a function to display the city name if the string begins with "Los" or "New". 
    Pass the city name as a parameter. Return `false` if they start with a different string. */

const city = (cityName) =>
  cityName.slice(0, 3) === "Los" || cityName.slice(0, 3) === "New"
    ? cityName
    : false;

/* 8. Create a function to calculate and return the sum of all elements from an array with 3 elements. 
    Pass the array as a parameter. */

const arrSum = (arr) => arr[0] + arr[1] + arr[2];

/* 9. Create a function to test if an array of lenght 2 contains 1 OR 3. 
    Return `true` is it does, `false` if it doesn't. */

const checkArr = (arr) =>
  arr[0] === 1 || arr[0] === 3 || arr[1] === 1 || arr[1] === 3;

/* 10. Create a function to test if an array of lenght 2 DOES NOT contain 1 or 3. 
    Return `true` if it doesn't, `false` if it does. */

const testArr = (arr) => arr.indexOf(1) < 0 && arr.indexOf(3) < 0;

/* 11. Create a function to find the longest string from a given array of strings. 
    Pass the array as parameter and return the longest string. */

const longestStr = (arr) =>
  arr[arr.map((i) => i.length).indexOf(Math.max(...arr.map((i) => i.length)))];

/* 12. Create a function to find the types of a given angle:
  1. Acute angle â‡’ between 0 and 90 degrees. Return `acute`.
    2. Right angle â‡’ 90 degree. Return `right`
    3. Obtuse angle â‡’ between 90 and 180. Return `obtuse`
    4. Straight angle â‡’ 180 degrees. Return `straight`

    Pass the angle as a parameter.
*/

const angle = (ang) =>
  0 < ang && ang < 90
    ? "acute"
    : ang === 90
    ? "right"
    : 90 < ang && ang < 180
    ? "obtuse"
    : ang === 180
    ? "straight"
    : "Unknown";

/* 13. Create a function to find and return the index of the greatest element of a given array of integers that you passed as a parameter. */

const findGreatest = (arr) => arr.indexOf(Math.max(...arr));

/* 14. Create a function to find and return the largest **even** number from an array of integers that is passed a parameter. */

const findGreatestEven = (arr) =>
  arr.indexOf(Math.max(...arr.map((i) => (i % 2 === 0 ? i : null))));

/* 15. Create a function to check from two given integers (passed as parameters) if one is positive and the other is negative. 
    Return `true` if that's the case, return `false` if it's not. */

const neg = (num1, num2) => num1 * num2 < 0;

/* 16. Create a function to create and return a new string where the first 3 characters and in lower case and the others are in upper case. 
    If the string's length is less than 3, convert the whole string into uppercase. Pass the original string as a parameter. */

const strCase = (str) =>
  str.length <= 3
    ? str.toUpperCase()
    : str.slice(0, 3).toLowerCase() + str.slice(3).toUpperCase();

/* 17. Create a function to calculate the sum of two integers (passed as parameters). 
    If the sum is in the 50-80 range, return `65`, otherwise, return `80`. */

const calc = (num1, num2) => (50 <= num1 + num2 && num1 + num2 <= 80 ? 65 : 80);

/* 18. Create a function to convert a number (passed as a parameter) into a string, basing yourself on this example: 
    The number has 3 as a factor â‡’ return `Diego`
    The number has 5 as a factor â‡’ return `Riccardo`
    The number has 7 as a factor â‡’ return `Stefano`
    If the number does not have 3,5, or 7, return the original number. 
    âš ï¸ The factor is an integer which evenly divides a number without leaving a remainder. One number can have more than one factor, in that case you should return both names. 
Ex. 15 has both 3 and 5 has factors: the function will return `DiegoRiccardo` */

const conv = (num) =>
  num === 3 ? "Diego" : num === 5 ? "Riccardo" : num === 7 ? "Stefano" : num;

/* 19. Create a function that that takes a phrase as a parameter and returns its acronym.
Ex. British Broadcasting Corporation returns `BBC` */

const acr = (str) =>
  str
    .split(" ")
    .map((i) => i.slice(0, 1))
    .join("");
