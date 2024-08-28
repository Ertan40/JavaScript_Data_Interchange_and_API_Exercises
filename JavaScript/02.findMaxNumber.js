// 2. Write a JavaScript program to find the maximum number in an array

function findMaxNum (arrayOne) {
    return Math.max (...arrayOne)
}

let arrayTwo = [8, 29, 10, 31, 102, 23, 14, 15, 56, 77, 18, 89, 20]
console.log(findMaxNum (arrayTwo))

// Second way with apply

// function findMaxNum (arrayOne) {
//     return Math.max.apply (null, arrayOne)
// }

// let arrayTwo = [8, 29, 10, 31, 102, 23, 14, 15, 56, 77, 18, 89, 20]
// console.log(findMaxNum (arrayTwo))

// making a list

// let list = [...Array(20).keys()].map(i => i + 1)
// console.log(list)

