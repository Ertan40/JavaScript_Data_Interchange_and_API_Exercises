//4. Write a JavaScript program to reverse a given string.

function reverseString (word) {
    return word.split('').reverse('').join('')
}

let testWord = 'Ertan'
console.log(reverseString (testWord))