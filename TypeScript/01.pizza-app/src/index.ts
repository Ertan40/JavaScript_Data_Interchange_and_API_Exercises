type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

let cashInRegister = 100;
let newOrderId = 1;
let nextPizzaId = 1;

const menu = [
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Vegetarian", price: 9 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
];

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: nextPizzaId++,
    ...pizzaObj,
  };
  menu.push(newPizza);
  return newPizza;
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy sausage", price: 10 });

// Example for generics:
// function addToArray<T>(array: T[], item: T): T[] {
//   array.push(item);
//   return array;
// }
// ex. usage
// addToArray<Pizza>(menu, { id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 });
// console.log(menu);

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);

  if (!selectedPizza) {
    console.error(`Pizza named ${pizzaName} not found in the menu!`);
    return undefined;
  }

  cashInRegister += selectedPizza.price;

  const newOrder: Order = {
    id: newOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);

  if (!order) {
    console.error(`Order with ID ${order} not found in the orderQueue!`);
    return undefined;
  }

  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    const selectedPizza = menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
    return selectedPizza;
    // return selectedPizza || null;
  } else if (typeof identifier === "number") {
    const selectedPizza = menu.find((pizza) => pizza.id === identifier);
    return selectedPizza;
  } else {
    throw new TypeError(
      "Parameter 'identifier' must be either a string or a number"
    );
  }
}

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu", menu);
console.log("Cash in register", cashInRegister);
console.log("Order queue", orderQueue);

// Notes:
// let myName: string = "Ertan";
// let numberOfWheels: number = 4;
// let isStudent: boolean = False;
// let numbers: array[] = [100, 101]

// type Address = {
//   street: string;
//   city: string;
//   country: string;
// };

// type Person = {
//   name: string;
//   age: number;
//   isStudent: boolean;
//   address?: Address; // ?: means optional
// };

// let person1: Person = {
//   name: "Ertan",
//   age: 42,
//   isStudent: true,
//   address: {
//     street: "128 Main",
//     city: "Capetown",
//     country: "USA",
//   },
// };

// function displayInfo(person) {
//   console.log(`${person.name} lives at ${person.address?.street}`);
// }

// displayInfo(person1);

/////

// type User = {
//   id: number;
//   username: string;
//   role: "member" | "contributor" | "admin";
// };

// let nextUserId = 1;

// const users: User[] = [
//   { id: nextUserId++, username: "john_doe", role: "admin" },
//   { id: nextUserId++, username: "jane_smith", role: "contributor" },
// ];

// function addNewUser(newUser: any): User {  // function addNewUser(newUser: Omit<User, "id">): User {}
//   const user: User = {
//     id: nextUserId++,
//     ...newUser,
//   };
//   users.push(user);
//   return user;
// }

// addNewUser({ username: "john_doe_jr", role: "member" }); // any therefore no errors
// consol.log(users);

// Generics example: instead of Type , you can write any word as follows ex: function getLastItem<T>(array: T[]){}
// const gameScores = [14, 21, 28, 33, 46];
// const favouriteThings = [
//   "raindrop on roses",
//   "whiskers on kittens",
//   "watching movies",
// ];
// const voters = [
//   { name: "Alice", age: 30 },
//   { name: "John", age: 20 },
// ];

// function getLastItem<Type>(array: Type[]): Type | Undefined {
//   return array[array.length - 1];
// }

// getLastItem(gameScores);
// getLastItem(favouriteThings);
// getLastItem(voters);
