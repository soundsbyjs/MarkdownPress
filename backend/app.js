const express = require('express');
const db = require('./db');
const formidable = require('formidable');

const app = express();

// this should give us our post history, perhaps in rows
// let's see if i can put a regex in here
app.get('/^(0|[1-9][0-9]*)$', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM markdown_files');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// this will give us a post in question


app.post('/upload', function(req, res) {
  const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, files) {
    if (err != null) {
      console.log(err)
      return res.status(400).json({ message: err.message });
    }

    // The `files` object contains all files that were uploaded. Formidable
    // parses each file and uploads it to a temporary file for you.
    const [firstFileName] = Object.keys(files);
	console.log(form);

    res.json({ filename: firstFileName });
  });
});


app.listen(10002, () => {
  console.log('Server is running on port 10002');
});
