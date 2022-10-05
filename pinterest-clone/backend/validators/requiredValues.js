import { check } from "express-validator";

// check if the required values are not empty
const requiredValues = (props) => {
    let checks = [];

    props.forEach((inputField) => {
        checks.push(
            check(inputField)
                .notEmpty()
                .withMessage(
                    `${inputField.charAt(0).toUpperCase() + inputField.slice(1)} is required!`
                )
        );
    });
    return checks;
};

export default requiredValues;