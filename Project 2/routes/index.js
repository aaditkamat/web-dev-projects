const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Simon', levelTitle: 'Press A Key To Start'});
});

module.exports = router;
