const { faker } = require("@faker-js/faker");
const fs = require("fs-extra");

let arrTemp = [];
for (let i = 0; i <= 150; i++) {
  let userid = faker.string.uuid();
  let username = faker.internet.userName();
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  let email = faker.internet.email();
  let birthDate = faker.date.birthdate();
  let basicSalary = faker.number.int(10000000);
  let status = faker.helpers.arrayElement(["active", "inactive"]);
  let group = faker.helpers.arrayElement([
    "admin",
    "maker",
    "checker",
    "viewer",
    "signer",
  ]);
  let description = faker.date.past();

  arrTemp.push({
    userid: userid,
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthDate: birthDate,
    basicSalary: basicSalary,
    status: status,
    group: group,
    description: description,
  });
}

fs.writeJson("./data.json", arrTemp)
  .then(() => {
    console.log("success!");
  })
  .catch((err) => {
    console.error(err);
  });
