function randomNumberGenerator() {
    return Math.floor(Math.random() * 10);
}

async function someAsynchFunction() {
    return "some async thing";
}

module.exports = { randomNumberGenerator, someAsynchFunction };
