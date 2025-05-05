// To specify the type of an array like [1, 2, 3], you can use the syntax number[];
// this syntax works for any type (e.g. string[] is an array of strings, and so on).
// You may also see this written as Array<number>, which means the same thing

const superHeroes: string[] = [];

// const superPowers: number[] = []
const superPowers: Array<number> = []; // above is 1st way or this way

type User = {
  name: string;
  isActive: boolean;
};

const allUsers: User[] = [];

const MLModels: number[][] = [[255, 255, 255], []];

superHeroes.push("spidey");
superPowers.push(8);

allUsers.push({ name: "", isActive: true });
