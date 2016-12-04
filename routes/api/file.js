const express = require('express');
const router = express.Router();

router.post('/file', (req, res) => {
  console.log(req.body); // form fields
  console.log(req.files); // form files
  res.status(204).end();
});

module.exports = router;