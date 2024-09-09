// 5. Write a JavaScript function that takes an array of numbers and returns a new array with only the even numbers. 

// let's create an array
let array = []
for (let index = 1; index <= 30; index++) {
    array.push(index)
    
}


function getEvenNums (arrayNums) {
    let evenNums = []
    arrayNums.forEach(element => {
        if (element % 2 === 0) {
            evenNums.push(element);
        }
    });
    return evenNums;
}

// Second way via filter
// function getEvenNums (arrayNums) {
//     return arrayNums.filter(el  => el % 2 === 0) 
// }

// test case
let testNums = [
    1,  2,  3,  4,  5,  6,  7,  8,  9,
   10, 11, 12, 13, 14, 15, 16, 17, 18,
   19, 20, 21, 22, 23, 24, 25, 26, 27,
   28, 29, 30
 ]

 console.log(getEvenNums (testNums)) 