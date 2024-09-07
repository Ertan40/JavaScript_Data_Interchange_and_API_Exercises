// 3. Write a JavaScript function to check if a given string is a palindrome

function findPalindrome (word) {

    word = word.toLowerCase()
    if (word === word.split('').reverse('').join('')) {
        console.log(`'${word}' is palindrome`)
    } else {
        console.log(`'${word}' is not palindrome`)
    }
    
}


let testWord = "poPSKI"
// let testWord = "poP"

findPalindrome (testWord)

