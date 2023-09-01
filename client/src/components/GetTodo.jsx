import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GetTodo = () => {
  const [data, setData] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  const fetch = async () => {
    axios.get("http://localhost:8000/todos").then((res) => setData(res.data));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:8000/todos/${taskId}`)
      .then((res) => {
        console.log(res);
        // Update the data state after deletion
        setData((prevData) => prevData.filter((todo) => todo._id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEditClick = (taskId, taskTitle) => {
    
    setTaskToEdit(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const handleSaveEdit = (taskId) => {
    
    axios
      .put(`http://localhost:8000/todos/${taskId}`, {
        title: editedTaskTitle,
      })
      .then((res) => {
        console.log("Update task response:", res.data);

       
        setData((prevTasks) =>
          prevTasks.map((todo) =>
            todo._id === taskId ? { ...todo, title: editedTaskTitle } : todo
          )
        );

        
        setTaskToEdit(null);
        setEditedTaskTitle("");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleUpdateTask = (taskId, completed) => {
    console.log(completed);
    axios
      .put(`http://localhost:8000/todos/${taskId}`, { completed })
      .then((res) => {
        console.log("Update task response:", res.data);

        setData((prevTasks) =>
          prevTasks.map((todo) =>
            todo._id === taskId ? { ...todo, completed } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleCancelEdit = () => {
    
    setTaskToEdit(null);
    setEditedTaskTitle("");
  };

  return (
    <Container style={{ width: "500px" }}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h5">Existing Tasks</Typography>
        <List>
          {data.map((todo) => (
            <ListItem key={todo._id}>
              <Checkbox
                checked={todo.completed}
                onChange={() => handleUpdateTask(todo._id, !todo.completed)}
              />
              {taskToEdit === todo._id ? (
                <>
                  <TextField
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                  />
                  <Button onClick={() => handleSaveEdit(todo._id)}>Save</Button>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                </>
              ) : (
                <>
                  <ListItemText primary={todo.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditClick(todo._id, todo.title)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTask(todo._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default GetTodo;
