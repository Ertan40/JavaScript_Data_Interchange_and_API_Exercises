interface User {
  readonly dbId: number;
  email: string;
  userId: number;
  googleId?: string;
  //   startTrail: () => string;
  startTrail(): string;
  getCoupon(couponName: string, val: number): number;
}

interface User {
  gitHubToken: string;
}

interface Admin extends User {
  role: "admin" | "ta" | "learner";
}

const ertan: Admin = {
  dbId: 11,
  email: "ed@gmail.com",
  userId: 31,
  role: "admin",
  gitHubToken: "github",
  startTrail: () => {
    return "trail started";
  },
  getCoupon: (name: "ertanski", off: 10) => {
    return 10;
  },
};

// const ertan: User = {
//     dbId: 11,
//     email: "ed@gmail.com",
//     userId: 31,
//     role: "admin",
//     gitHubToken: "github",
//     startTrail: () => {
//       return "trail started";
//     },
//     getCoupon: (name: "ertanski", off: 10) => {
//       return 10;
//     },
//   };

ertan.email = "ed@gmail.com";

// Difference: Almost all features of an interface are available in type, the key distinction is that
// a type cannot be re-opened to add new properties vs an interface which is always extendable.
// extending an interface:
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
//extending a type via intersections
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;
