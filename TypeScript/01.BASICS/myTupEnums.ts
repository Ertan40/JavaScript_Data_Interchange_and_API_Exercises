//const user: (string | number)[] = [1, "ed"]
let user: [string, number, boolean];

user = ["ed", 131, true];

let rgb: [number, number, number] = ["ed", 131, true];

type User = [number, string];

const newUser: User = [110, "ex@google.com"];

newUser[1] = "ed.com";
newUser.push(true);

export {};
