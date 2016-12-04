const express = require('express');
const router = express.Router();
const multer  = require('multer');

//app.use(multer({ dest: './uploads/'}).single('file'));

router.post('/file', multer({ dest: './uploads/'}).single('file'), (req, res) => {
  console.log(req.file);
  res.status(200).send("File received successfully");
});

module.exports = router;