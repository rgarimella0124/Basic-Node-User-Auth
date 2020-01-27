const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashpassword };
    users.push(user);
    res.status(201).send();
  } catch (e) {
    res.status.send(500);
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find(user => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot Find User");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Wrong Password");
    }
  } catch (e) {
    res.status.send(500);
  }
});

app.listen(3000);
