const admin = require('firebase-admin');

const serviceAccount = require('./snakegame-dcd76-firebase-adminsdk-8g9tv-14b20837f5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://snakegame-dcd76-default-rtdb.firebaseio.com/',
});

const db = admin.database();

module.exports = db;
