import createError from "http-errors";
import generalUser from "../models/generalUser.js";
import jwt from "jsonwebtoken";

export const loginPost = async (req, res, next) => {
    const { username, password } = req.body;

    let foundUser;

    // try to find the user in the CustomerUser collection, if !found try the BusinessUser collection
    try {
        foundUser = await generalUser.findOne({
            username: username,
            password: password,
        });

        console.log("FoundUser", foundUser);
    } catch {
        return next(
            createError(500, "Database couldn't be queried. Please try again")
        );
    }

    if (foundUser) {
        const token = jwt.sign(
            { username: foundUser.username, id: foundUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.json({
            id: foundUser._id,
            username: foundUser.username,
            token,
        });
    } else {
        return next(createError(500, "User not found"));
    }
};