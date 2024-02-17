"use strict";

const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");
router.post("/employee-list", employeeController.employeeList);
router.post("/employee-add", employeeController.employeeAdd);
router.post("/employee-edit", employeeController.employeeEdit);
router.post("/employee-delete", employeeController.employeeDelete);
router.post("/employee-detail", employeeController.employeeDetail);
router.post("/employee-search", employeeController.employeeSearch);

module.exports = {
  routes: router,
};
