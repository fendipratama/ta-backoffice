"use strict";

const employeeModel = require("../models/employee.model");

const employeeList = async (req, res) => {
  try {
    const { total_data, page } = req.body;

    const result = await employeeModel.employeeList(total_data, page);
    if (result?.hasOwnProperty("err")) throw new Error(result.err);

    if (result?.length > 0) {
      return res.json({
        ERROR_CODE: "API-00",
        RESPONSE_CODE: "00",
        RESPONSE_MESSAGE: "Transaction Successful",
        RESPONSE_DATA: {
          result: result,
        },
      });
    } else {
      return res.json({
        ERROR_CODE: "RE-03",
        RESPONSE_CODE: "03",
        RESPONSE_MESSAGE: "Record Not Found",
        RESPONSE_DATA: "",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      ERROR_CODE: "API-99",
      RESPONSE_CODE: "99",
      RESPONSE_MESSAGE: "General Error",
      RESPONSE_DATA: "",
    });
  }
};

const employeeSearch = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const result = await employeeModel.employeeSearch(
      firstName,
      lastName,
      email
    );
    if (result?.hasOwnProperty("err")) throw new Error(result.err);

    if (result) {
      return res.json({
        ERROR_CODE: "API-00",
        RESPONSE_CODE: "00",
        RESPONSE_MESSAGE: "Transaction Successful",
        RESPONSE_DATA: {
          result: result,
        },
      });
    } else {
      return res.json({
        ERROR_CODE: "RE-03",
        RESPONSE_CODE: "03",
        RESPONSE_MESSAGE: "Record Not Found",
        RESPONSE_DATA: "",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      ERROR_CODE: "API-99",
      RESPONSE_CODE: "99",
      RESPONSE_MESSAGE: "General Error",
      RESPONSE_DATA: "",
    });
  }
};

const employeeAdd = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group,
    } = req.body;

    const result = await employeeModel.employeeAdd(
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group
    );

    if (result?.hasOwnProperty("err")) throw new Error(result.err);

    return res.json({
      ERROR_CODE: "API-00",
      RESPONSE_CODE: "00",
      RESPONSE_MESSAGE: "Transaction Successful",
      RESPONSE_DATA: {
        result: result,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      ERROR_CODE: "API-99",
      RESPONSE_CODE: "99",
      RESPONSE_MESSAGE: "General Error",
      RESPONSE_DATA: "",
    });
  }
};

const employeeEdit = async (req, res) => {
  try {
    const {
      userid,
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group,
    } = req.body;

    const result = await employeeModel.employeeEdit(
      userid,
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group
    );

    if (result?.hasOwnProperty("err")) throw new Error(result.err);

    return res.json({
      ERROR_CODE: "API-00",
      RESPONSE_CODE: "00",
      RESPONSE_MESSAGE: "Transaction Successful",
      RESPONSE_DATA: {
        result: result,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      ERROR_CODE: "API-99",
      RESPONSE_CODE: "99",
      RESPONSE_MESSAGE: "General Error",
      RESPONSE_DATA: "",
    });
  }
};

const employeeDetail = async (req, res) => {
  try {
    const { userid } = req.body;

    const result = await employeeModel.employeeDetail(userid);

    if (result?.hasOwnProperty("err")) throw new Error(result.err);

    return res.json({
      ERROR_CODE: "API-00",
      RESPONSE_CODE: "00",
      RESPONSE_MESSAGE: "Transaction Successful",
      RESPONSE_DATA: {
        result: result,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      ERROR_CODE: "API-99",
      RESPONSE_CODE: "99",
      RESPONSE_MESSAGE: "General Error",
      RESPONSE_DATA: "",
    });
  }
};

const employeeDelete = async (req, res) => {
  try {
    const { userid } = req.body;

    const result = await employeeModel.employeeDelete(userid);

    if (result?.hasOwnProperty("err")) throw new Error(result.err);

    return res.json({
      ERROR_CODE: "API-00",
      RESPONSE_CODE: "00",
      RESPONSE_MESSAGE: "Transaction Successful",
      RESPONSE_DATA: {
        result: {
          message: "success",
        },
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      ERROR_CODE: "API-99",
      RESPONSE_CODE: "99",
      RESPONSE_MESSAGE: "General Error",
      RESPONSE_DATA: "",
    });
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
