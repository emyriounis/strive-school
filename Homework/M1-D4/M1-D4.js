/*
ASSIGNMENT RULES
- All the answers must be written in JavaScript
- You can ask for help, reach the Teaching Assistants if needed
- You can Google / use StackOverflow BUT only when you think you need something we didn't cover during lessons yet
- You can test your code in a separate file or de-commenting the single exercises in this one.
- You can use the bash terminal, the VSCode terminal or the one embedded in your Operating System if you're using macOS or Linux.
- The solution must be available for the tutors by the end of the day (5PM CET)
*/

/* EXERCISE 1
 Create a variable and assign to it an array containing the first 5 positive numbers.
*/

let arr = [1, 2, 3, 4, 5]

/* EXERCISE 2
 Create a variable and assign to it an object containing your name, surname, email address and age.
*/

let obj = {
    name: "Eleftherios",
    surname: "Myriounis",
    email: "el.myrioun@gmail.com",
    age: 21
}

/* EXERCISE 3
 Add to the previously created object a property with a boolean value to rappresent wheter you have or not a driving license.
*/

obj.drivingLicence = true

/* EXERCISE 4
 Remove from the previously created object the age property.
*/

delete obj.age

/* EXERCISE 5
 Create a second object with another name, surname, email address and verify that this object has a different email address than the previous one.
*/

let obj2 = {
    name: "John",
    surname: "Doe",
    email: "email@example.com",
    age: 34
}
console.log(`These 2 emails are ${obj.email === obj2.email ? "the same" : "different"}`)

/* EXERCISE 6
 You are working on an e-commerce website. In the variable totalShoppingCart you are storing the total amount spent by the current user.
 Currently you have a promotion: if the customer's shopping cart total is more than 50, the user is eligible for free shipping (otherwise it costs 10).
 Write an algorithm that calculates the total cost to charge the user with.
*/

let totalShoppingCart = 67
totalShoppingCart <= 50 && totalShoppingCart++

/* EXERCISE 7
 You are working on an e-commerce website. Today is Black Friday and everything has a 20% discount at the end of the purchase.
 Modify the previous answer inserting this information and, applying the same rules for the shipping cost, calculate the totalCost.
*/

let totalShoppingCartNew = 67
totalShoppingCartNew *= 0.8
totalShoppingCartNew <= 50 && totalShoppingCartNew++

/* EXERCISE 8
 Create a variable and assign to it an object representing a car, with properties like brand, model and licensePlate.
 Then clone it 5 times, and change the licensePlate for each cloned car without affecting the original one.
*/

let car1 = {
    brand: "Tesla",
    model: "Model 3",
    licensePlate: "VCMONEY"
}

let car2
let car3
let car4
let car5

Object.assign(car2, car)
Object.assign(car3, car)
Object.assign(car4, car)
Object.assign(car5, car)

car2.licensePlate = "MNGMFEE"
car3.licensePlate = "TESLAM3"
car4.licensePlate = "TESLAMS"
car5.licensePlate = "TESLAMX"

/* EXERCISE 9
 Create a variable called carsForRent and assign to it an array containing all the cars from the previous exercise.
*/

let carsForRent = [car1, car2, car3, car4, car5]

/* EXERCISE 10
 Remove the first and the last car from the carsForRent array.
*/

carsForRent.pop()
carsForRent.shift()

/* EXERCISE 11
 Print to the console the type of the car variable you created before, as well as the types of its licensePlate and brand properties.
*/

carsForRent.map(car => 
    console.log(typeof car, car.licensePlate, car.brand))

/* EXERCISE 12
 Create a new variable called carsForSale assigning to it an empty array, and then insert 3 cars into it.
 Create a new variable called totalCars and assign to it the total number of cars present in the carsForSale and carsForSale arrays.
*/

let carsForSale = []

let car6
let car7
let car8

Object.assign(car6, car)
Object.assign(car7, car)
Object.assign(car8, car)

car6.licensePlate = "ROADSTR"
car7.licensePlate = "SEMITRC"
car8.licensePlate = "TRRMR"

carsForSale.push(car6, car7, car8)

let totalCars = carsForRent.concat(carsForSale)


/* EXERCISE 13
 Using a loop, print to the console all the data for each car in the carsForSale array.
*/

totalCars.map(car => console.log(car))

/* WHEN YOU ARE FINISHED
 Upload the .js file on Eduflow before 5PM CET. In the next days we'll also learn how to use GIT!
*/