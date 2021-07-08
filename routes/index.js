const express = require('express');
const router = express.Router();
const db = require('../configuration_firebase');
/* GET home page. */
router.get('/a', function (req, res, next) {
  db.ref('players').once('value', (snapshot) => {
    const data = snapshot.val();
    res.json({ players: data });
  });
});

router.post('/agrega', function (req, res) {
  console.log(req.body);
  db.ref('players').push(req.body);
});

module.exports = router;
