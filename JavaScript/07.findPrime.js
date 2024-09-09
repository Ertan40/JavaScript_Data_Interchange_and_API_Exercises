// 7. Write a JavaScript function to check if a given number is prime.

function findPrime(number) {
  if (number <= 1) {
    console.log(`Number ${number} is not prime`);
    return;
  }
  for (let index = 2; index <= Math.sqrt(number); index++) {
    if (number % index === 0) {
      console.log(`Number ${number} is not prime`);
      return;
    }
  }
  console.log(`Number ${number} is prime`);
}

// test case
let num1 = 5;
let num2 = 10;
findPrime(num1);
findPrime(num2);
