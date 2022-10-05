import { check } from "express-validator";

const registerUserValidator = () => {
    return [
        check("username")
            .escape()
            .trim()
            .isLength({ min: 3, max: 10 })
            .withMessage("Username must be between 3 and 10 characters long!"),
        check("password")
            .escape()
            .trim()
            .isStrongPassword({ minLength: 8, minLowercase: 2 })
            .withMessage(
                "Password is not valid! Must be minimum 8 characters long and include two lowercase, one uppercase, one symbol (e.g. @, !, # etc) and one number."
            ),
        check("emailAddress")
            .normalizeEmail()
            .isEmail()
            .withMessage("Email address is not valid!"),
    ];
};

export default registerUserValidator;
