import express from "express";
import requiredValues from "../validators/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";
import { loginPost } from "../controllers/loginController.js";

const router = express.Router();

router.post("/", requiredValues(["username", "password"]), checkValidation, loginPost);

export default router;


