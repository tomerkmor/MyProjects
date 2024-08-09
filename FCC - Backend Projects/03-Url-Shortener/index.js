require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const dns = require('dns')
const urlParser = require('url')


const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number
})

//create a collection inside the database that was defined in the .env
// in my case it is "shortener-url"
const Url = mongoose.model('Url', urlSchema)

// Basic Configuration
app.use(cors());
app.use(express.json())
// helps us to make sure we can acce req.body
app.use(express.urlencoded({extended: true})) 

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', async function(req, res) {
  try {
    const originalUrl = req.body.url;

    const dnsloopup = dns.lookup(urlParser.parse(originalUrl).hostname, async (err, address) => {

      if(err || !address){
        res.json({error: 'invalid url'})
      }
      // Generate a short URL
      const urlCount = await Url.countDocuments(); // Use the model here
      const shortUrl = urlCount + 1; // Incremental short URL

      // Save to database
      const newUrl = new Url({
        original_url: originalUrl,
        short_url: shortUrl
      });

      //const result = await urls.insertOne(newUrl)
      //console.log(result)
      await newUrl.save();
        
        res.json({
          original_url: originalUrl,
          short_url: shortUrl
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//   /api/shorturl/2
app.get('/api/shorturl/:short_url', async (req,res) => {
  const enteredQuery = req.params.short_url
  const page = await Url.findOne({short_url: +enteredQuery})
  
  res.redirect(page.original_url)
})


const port = process.env.PORT || 3000;
const start = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI) // (invoking the dotenv package)
      app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
      console.log(error)
  }
}

start()