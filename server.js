const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


// const app = express();
// const PORT = 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(require("./routes"));

// mongoose.connect("mongodb://localhost/friends", {
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });

// app.listen(PORT, () => console.log( ` Connected on ${PORT}`));