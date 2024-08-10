var express = require('express');
var cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const multer  = require('multer')
const upload = multer({dest: 'uploads/'})

var app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Basic Configuration
app.use(express.json())
  // helps us to make sure we can access req.body
app.use(express.urlencoded({extended: true})) 

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),async (req,res) => {
  console.log(req.file)
  const enteredFile = await req.file
  res.json({
    name: enteredFile.originalname,
    type: enteredFile.mimetype,
    size: enteredFile.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
