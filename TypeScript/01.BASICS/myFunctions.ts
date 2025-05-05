function addTwo(num: number): number {
  return num + 2;
}

function getUpper(val: string) {
  return val.toUpperCase();
}

function signUpUser(name: string, email: string, isPaid: boolean) {}
let loginUser = (name: string, email: string, isPaid: boolean = false) => {};

// addTwo(6);
getUpper("ertan");
console.log(addTwo(6));

signUpUser("ertan", "ertan@gmail.com", false);
loginUser("e", "e@gmail.com");

//
const getHello = (s: string): string => {
  return "";
};

const heroes = ["Thor", "Spiderman", "Hulk"];

heroes.map((hero): string => {
  return `hero is ${hero}`;
});

function consoleError(errmsg: string): void {
  // returns void , so it is not going to return anything ever
  console.log(errmsg);
}
//The never type represents values which are never observed.
//In a return type, this means that the function throws an exception or terminates execution of the program.
function handleError(errmsg: string): never {
  throw new Error(errmsg);
}

export {};
