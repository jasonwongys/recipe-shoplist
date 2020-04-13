const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users.routes");
const recipe = require("./routes/recipe.routes")
const path = require("path")

const secret = process.env.SECRET || "jasonwongysLocal"
require("dotenv").config()


mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
//bodyParser middleware

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))


//DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
// mongoose.connect(db, { useNewUrlParser: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const connection = mongoose.connection;


connection.once('open',function() {
        console.log("Mongo DB connected successfully");
    })

    

const shoplistRouter = require('./routes/shoplist.routes');

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users",users);
app.use("/shoplist", shoplistRouter)
app.use("/recipes",recipe);

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, ()=> console.log(`Server up and running at port ${port}`));