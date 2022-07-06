const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

mongoose.connect("mongodb://localhost/friends", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.listen(PORT, () => console.log( ` Connected on ${PORT}`));