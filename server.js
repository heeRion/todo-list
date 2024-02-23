
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading tasks file");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/tasks", (req, res) => {
  const newTask = req.body.task;
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading tasks file");
    } else {
      const tasks = JSON.parse(data);
      tasks.push(newTask);
      fs.writeFile("tasks.json", JSON.stringify(tasks), err => {
        if (err) {
          res.status(500).send("Error writing tasks file");
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});