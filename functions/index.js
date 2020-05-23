const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const serviceAccount = require("./firebase_permissions.json")

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://restful-api-8f998.firebaseio.com"
// });


const express = require('express')
const app = express()
const cors = require('cors')

//Use cors
app.use(cors({ origin:true }))


//ROUTES
app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!')
})
app.use('/api/buyers', require('./routes/buyers'));
app.use('/api/products', require('./routes/products'));

//Export the api to Firebase Cloud Functions
exports.app = functions.https.onRequest(app)

/*
THIS IS THE LINK TO FIRESTORE NODE JS CLIENT SDK
DEALS 
*/
//
//https://googleapis.dev/nodejs/firestore/latest/index.html