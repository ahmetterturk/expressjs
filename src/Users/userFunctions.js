// require then initialize
const firebaseClient = require("firabase/app");
firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));

// initialized elsewhere, just need to require it and thats it
const firebaseAdmin = require("firabase-admin");
// const { UserRecord } = require("firebase-admin/lib/auth/user-record");

// signUpUser({username: 'something', email:'something@web.com', password:'password1'})
async function signUpUser(userDetails) {
    return firebaseAdmin
        .auth()
        .createUser({
            email: userDetails.email,
            password: userDetails.password,
            displayName: userDetails.username,
            emailVerified: true,
            // phoroURL: "freestck.com/image"
        })
        .then(async (userRecord) => {
            let defaultUserClaimes = firebaseAdmin
                .auth()
                .setCustomUserClaims(userRecord.uid, {
                    admin: false,
                    regularUser: true,
                })
                .then(() => {
                    console.log("set default claims to the new user");
                });

            return userRecord;
        })
        .catch((error) => {
            console.log(`Internal sign-up function error is: \n${error}`);
            return { error: error };
        });
}
