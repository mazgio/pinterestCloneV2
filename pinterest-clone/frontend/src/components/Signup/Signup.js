import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeDisabled } from 'react-icons-kit/ionicons/eyeDisabled';
import { eye } from 'react-icons-kit/ionicons/eye';
import "./Signup.css";
// import { use } from "bcrypt/promises";

const Signup = (props) => {
    const initialValues = {
        firstname: "",
        lastname: "",
        username: "",
        emailAddress: "",
        password: "",
    };

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
        // setFormErrors(validate(formValues));
        setIsSubmit(true);
        // create a new user
        const newUser = {
            firstName: formValues.firstname,
            lastName: formValues.lastname,
            username: formValues.username,
            emailAddress: formValues.emailAddress,
            password: formValues.password,
        };

        // settings
        const settings = {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        };
        // POST REQUEST

        const response = await fetch(
            process.env.REACT_APP_SERVER_URL + "/signup",
            settings,

        );
        // console.log("response", response);

        const parsedRes = await response.json();
        try {
            if (response.ok) {
                // props.setCurrentUserId(parsedRes.id);
                // setFormErrors(validate(formValues));
                setIsSubmit(true);
                console.log("parsed", parsedRes);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };



    // const validate = (values) => {
    //     const errors = {};
    //     // const regex =
    //     //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //     if (!values.firstname) {
    //         errors.firstname = "First name is required";
    //     }

    //     if (!values.lastname) {
    //         errors.lastname = "Last name is required";
    //     }

    //     if (!values.username) {
    //         errors.username = "Username is required";
    //     }

    //     if (!values.emailAddress) {
    //         errors.emailAddress = "Email is required";
    //     }

    //     if (!values.password) {
    //         errors.password = "Password is required";
    //     }

    //     return errors;
    // };

    // const navigate = useNavigate();

    return (
        <div className="signup-container">
            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                navigate("/signin")
            ) : (
                <>

                </>
            )} */}
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <hr />
                <div className="form">
                    <div className="field">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formValues.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="err"></p>
                    <div className="field">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formValues.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="err"></p>
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
                    <p className="err"></p>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="emailAddress"
                            placeholder="Email"
                            value={formValues.emailAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="err"></p>
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
                            <span onClick={handleToggle} className="eye"><Icon icon={icon} /></span>
                        </div>
                    </div>
                    <p className="err"></p>
                    <button>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;


// firstname: Mirali
// lastname:Mirhashimli
// username:MiraliM
// email: alimidshimli@gmail.com
// password: sdfdsfdsA1!