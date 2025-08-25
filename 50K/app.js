// generate50k.js
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const data = [];
for (let i = 0; i < 50000; i++) {
  data.push({
    _id: uuidv4(),
    name: faker.person.firstName(),
    price: faker.number.int({ min: 100, max: 5000 }),
    country: faker.location.country(),
    bloodGroup: faker.helpers.arrayElement(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate({ min: 18, max: 60, mode: "age" }).toISOString().split("T")[0],
    age: faker.number.int({ min: 18, max: 60 }),
    hobbies: [faker.hacker.verb(), faker.hacker.noun()],
    bio: faker.lorem.sentence(),
    isEligible: faker.datatype.boolean(),
    gender: faker.helpers.arrayElement(["male", "female"])
  });
}

fs.writeFileSync("50k_users.json", JSON.stringify(data, null, 2));
console.log("✅ 50k_users.json generated successfully!");
// https://www.canva.com/design/DAGwepproG4/bCuRPsiiNVv5lMwVefR4Lg/edit?ui=eyJEIjp7IlMiOnRydWV9LCJBIjp7IkEiOiJkb3dubG9hZF9wZGZfc3RkIiwiRiI6dHJ1ZX0sIkUiOnsiQT8iOiJMIn0sIkciOnsiRiI6eyJBIjoiQyJ9fX0