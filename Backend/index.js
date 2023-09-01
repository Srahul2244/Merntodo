const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db");
const { router } = require("./routes/todo.routes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/todos", router);

app.listen(process.env.port, async () => {
  try {
    connect();
    console.log("DB is Connected to Sucessssfully....");
    console.log(`http://localhost:${process.env.port}`);
  } catch (e) {
    console.log("DB is connected to failed!!!!!");
  }
});
