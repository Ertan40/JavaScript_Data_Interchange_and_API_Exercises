// 6. Write a JavaScript program to calculate the factorial of a given number.

function factorial(number) {
    if (number === 0 || number === 1) {
        return 1
    } else {
        return number * factorial(number - 1)
    }
}


let testNum = 5
console.log(factorial(testNum))