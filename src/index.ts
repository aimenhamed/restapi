const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "COMP1511" },
  { id: 2, name: "COMP1521" },
  { id: 3, name: "COMP1531" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 8) {
    res
      .status(400)
      .send("Name is required and should be 8 chars long, e.g. COMP1511");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course ID was not found.");

  course.name = req.body.name;
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course ID was not found.");
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}....`));
