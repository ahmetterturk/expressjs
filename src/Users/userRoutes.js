const express = require("express");
const { signUpUser, signInUser } = require("./userFunctions");

const routes = express.Router();

// Create a user, a session token & a refresh token
routes.post("/sign-up", async (request, response) => {
    // Process posted form/json data
    let newUserDetails = {
        email: request.body.email,
        password: request.body.password,
        username: request.body.username,
    };

    if (newUserDetails.password.length < 8) {
        console.log("Password too short");
        response.json({ error: "Password too short" });
    }

    let signUpResult = await signUpUser(newUserDetails);

    if (signUpResult.error != null) {
        console.log(
            "Stopping the signup process due to an error. See logs for details."
        );
        response.json(signUpResult);
        return;
    }

    // response.json(signUpResult);
    let signInResult = await signInUser(newUserDetails);

    if (signInResult.error != null) {
        console.log("sign in failes, returning error ro requestor");
        response.json(signInResult);
        return;
    }

    response.json(signInResult);
});

routes.post("/sign-in", async (request, response) => {
    // Process posted form/json data
    let existingUserDetails = {
        email: request.body.email,
        password: request.body.password,
    };

    let signInResult = await signInUser(existingUserDetails);

    if (signInResult.error != null) {
        console.log("Sign in failed, returning error ro requestor");
        response.json(signInResult);
        return;
    }

    response.json(signInResult);
});

module.exports = routes;
