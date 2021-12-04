require("dotenv").config();

console.log(`Env variable message is:\n${process.env.NICE_MESSAGE}`);

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5500;
const HOST = "0.0.0.0";

const firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
        JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    ),
});

// We can receive JSON data from POST/PUT/PATCH/etc requests
app.use(express.json());
// Same as above but for form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "This is a JSON message hollaaa" });
});

const importedPostRouting = require("./Posts/postsRoutes");
app.use("/posts", importedPostRouting);

app.listen(PORT, HOST, () => {
    console.log("Server is running on port " + PORT);
});
