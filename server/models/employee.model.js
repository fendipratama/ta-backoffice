"use strict";

const { faker } = require("@faker-js/faker");
const fs = require("fs-extra");

var rawdata = fs.readFileSync("./data.json");
var datas = JSON.parse(rawdata);

const employeeList = async (total_data, page) => {
  try {
    const limit = total_data;
    const offset = (page - 1) * limit;

    const result = datas.slice(offset, limit);
    return result;
  } catch (err) {
    return { err };
  }
};

const employeeSearch = async (firstName, lastName, email) => {
  try {
    for (let i = 0; i < datas.length; i++) {
      if (firstName && email && lastName) {
        if (
          datas[i]["firstName"] == firstName &&
          datas[i]["email"] == email &&
          datas[i]["lastName"] == lastName
        ) {
          return datas[i];
        }
      }
      if (firstName && email) {
        if (datas[i]["firstName"] == firstName && datas[i]["email"] == email) {
          return datas[i];
        }
      }
      if (firstName && lastName) {
        if (
          datas[i]["firstName"] == firstName &&
          datas[i]["lastName"] == lastName
        ) {
          return datas[i];
        }
      }
      if (firstName) {
        if (datas[i]["firstName"] == firstName) {
          return datas[i];
        }
      }
      if (email) {
        if (datas[i]["email"] == email) {
          return datas[i];
        }
      }
      if (lastName) {
        if (datas[i]["lastName"] == lastName) {
          return datas[i];
        }
      }
    }
  } catch (err) {
    return { err };
  }
};

const employeeAdd = async (
  username,
  firstName,
  lastName,
  email,
  birthDate,
  basicSalary,
  status,
  group
) => {
  try {
    datas.push({
      userid: faker.string.uuid(),
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthDate: birthDate,
      basicSalary: basicSalary,
      status: status,
      group: group,
      description: faker.date.past(),
    });

    fs.writeJson("./data.json", datas);
  } catch (err) {
    return { err };
  }
};

const employeeEdit = async (
  userid,
  username,
  firstName,
  lastName,
  email,
  birthDate,
  basicSalary,
  status,
  group
) => {
  try {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i]["userid"] == userid) {
        datas.splice(i, 1);
      }
    }

    datas.push({
      userid: userid,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthDate: birthDate,
      basicSalary: basicSalary,
      status: status,
      group: group,
      description: faker.date.past(),
    });

    fs.writeJson("./data.json", datas);
  } catch (err) {
    return { err };
  }
};

const employeeDelete = async (userid) => {
  try {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i]["userid"] == userid) {
        datas.splice(i, 1);
      }
    }

    fs.writeJson("./data.json", datas);
  } catch (err) {
    return { err };
  }
};

const employeeDetail = async (userid) => {
  try {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i]["userid"] == userid) {
        return datas[i];
      }
    }
  } catch (err) {
    return { err };
  }
};

module.exports = {
  employeeList,
  employeeSearch,
  employeeAdd,
  employeeEdit,
  employeeDelete,
  employeeDetail,
};
