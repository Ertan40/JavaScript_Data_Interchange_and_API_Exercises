const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Vegetarian", price: 9 },
  { name: "Hawaiian", price: 10 },
];

let cashInRegister = 100;
const orderQueue = [];
let newOrderId = 1;

function addNewPizza(pizzaObj) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName) {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);

  if (!selectedPizza) {
    console.error(`Pizza named ${pizzaName} not found in the menu!`);
    return null;
  }

  cashInRegister += selectedPizza.price;

  const newOrder = {
    id: newOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId) {
  const order = orderQueue.find((order) => order.id === orderId);

  if (!order) {
    console.error(`Order with ID ${order} not found!`);
    return null;
  }

  order.status = "completed";
  return order;
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy sausage", price: 10 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu", menu);
console.log("Cash in register", cashInRegister);
console.log("Order queue", orderQueue);
