const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// We can receive JSON data from POST/PUT/PATCH/etc requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "This is a JSON message hollaaa" });
});

app.listen(PORT, HOST, () => {
    console.log("Server is running on port 5000");
});
