import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    const payload = {
      title: title,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/todos", payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container style={{ width: "500px" }}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <TextField
          label="Task title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          style={{ marginTop: "8px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Paper>
    </Container>
  );
};

export default AddTodo;
