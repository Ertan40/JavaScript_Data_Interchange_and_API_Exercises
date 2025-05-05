"use strict";
exports.__esModule = true;
function addTwo(num) {
    return num + 2;
}
function getUpper(val) {
    return val.toUpperCase();
}
function signUpUser(name, email, isPaid) { }
var loginUser = function (name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
};
// addTwo(6);
getUpper("ertan");
console.log(addTwo(6));
signUpUser("ertan", "ertan@gmail.com", false);
loginUser("e", "e@gmail.com");
//
var getHello = function (s) {
    return "";
};
var heroes = ["Thor", "Spiderman", "Hulk"];
heroes.map(function (hero) {
    return "hero is ".concat(hero);
});
function consoleError(errmsg) {
    // returns void , so it is not going to return anything ever
    console.log(errmsg);
}
//The never type represents values which are never observed.
//In a return type, this means that the function throws an exception or terminates execution of the program.
function handleError(errmsg) {
    throw new Error(errmsg);
}
