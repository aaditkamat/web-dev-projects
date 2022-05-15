const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Dicee', headerText: 'Refresh Me!', playerText: 'Player'});
});

module.exports = router;
