import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeDisabled } from "react-icons-kit/ionicons/eyeDisabled";
import { eye } from "react-icons-kit/ionicons/eye";
import "./Signin.css";

const Signin = (props) => {
    const initialValues = { username: "", password: "" };

    /* Start Password visibility */
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeDisabled);

    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeDisabled);
            setType("password");
        }
    };
    /* End Password visibility */

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
    }, [formErrors, isSubmit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        // create login data
        const loginData = {
            username: formValues.username,
            password: formValues.password,
        };

        // define the POST request
        const settings = {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        // make a POST request
        const response = await fetch(
            process.env.REACT_APP_SERVER_URL + "/signin",
            settings
        );
        console.log("RESPONSE", response);
        const parsedRes = await response.json();
        console.log(parsedRes);
        try {
            if (response.ok) {
                const newUser = {
                    _id: parsedRes.id,
                    username: parsedRes.username,
                    token: parsedRes.token,
                };
                props.setCurrentUser(newUser);

                setFormErrors(validate(formValues));
                setIsSubmit(true);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
            setFormValues(initialValues);
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const navigate = useNavigate();

    return (
        <div className="signin-container">
            {Object.keys(formErrors).length === 0 && isSubmit ? navigate("/") : <></>}
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <hr />
                <div className="form">
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="err">{formErrors.username}</p>
                    <div className="field">
                        <label>Password</label>
                        <div className="pass-eye">
                            <input
                                type={type}
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <span onClick={handleToggle} className="eye">
                                <Icon icon={icon} />
                            </span>
                        </div>
                    </div>
                    <p className="err">{formErrors.password}</p>
                    <button>Sign in</button>
                    <p>
                        Not registered?<span> </span>
                        <a className="sign-button" href="signup">
                            Sign Up
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signin;
