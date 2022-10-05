import express from "express";
import { registerUser } from "../controllers/userRegisterController.js";
import requiredValues from "../validators/requiredValues.js";
import registerUserValidator from "../validators/registerUserValidator.js";
import checkValidation from "../validators/checkValidation.js";

const router = express.Router();

router.post(
    "/",
    requiredValues(["username", "password", "emailAddress"]),
    registerUserValidator(),
    checkValidation,
    registerUser
);

export default router;