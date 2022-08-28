const createError = require("http-errors");
const express = require("express");
const cors = require("cors");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const users = require("./models/users");
const products = require("./models/products");
const promocodes = require("./models/promocodes");

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "mongodb://localhost/Store",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to Database");
});

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// Create new user
app.post("/user", async (req, res) => {
  let user;
  try {
    user = await users.find({
      email: req.body.Email,
    });
    // console.log("user is ", user);
    if (user.length !== 0) {
      return res.status(404).json({ message: "User already registered" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  const newUser = new users({
    email: req.body.Email,
    password: req.body.password,
    userType: req.body.Email === "admin@gmail.com" ? "admin" : "customer",
  });
  try {
    const adduser = await newUser.save();
    res.status(201).json(adduser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Sign in to get user info
app.post("/authentication", getUserByEmail, async (req, res) => {
  // console.log(req.body);
  res.json(res.user);
});

// Update user shopping cart
app.patch("/user/:id", getUser, async (req, res) => {
  // console.log("res body is ", req.body);

  const cart = res.user.shoppingCart;

  //check if exists
  let targetProductId = -1;
  cart.forEach((element, index) => {
    return element._id === req.body._id ? (targetProductId = index) : -1;
  });

  // if exists, update quantity)
  targetProductId >= 0
    ? (cart[targetProductId].quantity += req.body.quantity)
    : cart.push(req.body);

  if (targetProductId !== -1 && cart[targetProductId].quantity === 0) {
    cart.splice(targetProductId, 1);
  }
  try {
    const updatedUser = await res.user.save();

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get all product
app.get("", async (req, res) => {
  try {
    const productList = await products.find();
    res.json(productList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//check promotion code

app.post("/promocode", async (req, res) => {
  try {
    const code = await promocodes.find({ promocode: req.body.code });
    if (code[0] === undefined) {
      res.status(404).json({ message: "Invalid promocode" });
    }
    res.status(200).json(code[0]);
    // console.log(res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create new product
app.post("/product", async (req, res) => {
  const newProduct = new products({
    item: req.body.item,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    image: req.body.image,
    Category: req.body.Category,
  });

  try {
    const addProduct = await newProduct.save();
    res.status(201).json(addProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product
app.patch("/product/:id", getProduct, async (req, res) => {
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.item != null) {
    res.product.item = req.body.item;
  }

  if (req.body.description != null) {
    res.product.description = req.body.description;
  }

  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  try {
    const updateProduct = await res.product.save();
    res.json(updateProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await users.findById(req.params.id);
    if (user == null)
      return res.status(404).json({ message: "can not find user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;

  next();
}

async function getUserByEmail(req, res, next) {
  let user;
  try {
    user = await users.find({
      email: req.body.Email,
    });
    // console.log("user is ", user);
    if (user.length === 0)
      return res.status(404).json({ message: "Can not find user" });

    if (user[0].password !== req.body.password)
      return res.status(404).json({ message: "Invalid password" });
    res.user = user;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  next();
}

async function getProduct(req, res, next) {
  let product;
  try {
    product = await products.findById(req.params.id);
    if (product == null)
      return res.status(404).json({ message: "can not find product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
