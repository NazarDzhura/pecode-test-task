import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function TodoForm({ addTodo }) {
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false
    });

    function handleTaskInputChange(e) {
        setTodo({ ...todo, task: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (todo.task.trim()) {
            addTodo({ ...todo, id: uuid() });
            setTodo({ ...todo, task: "" });
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <TextField
                label="Episode to watch"
                variant="outlined"
                type="text"
                name="task"
                value={todo.task}
                onChange={handleTaskInputChange}
            />
            <Button style={{marginTop: 10}} variant="contained" type="submit" color="primary" size="large">Submit</Button>
        </form>
    );
}

export default TodoForm;