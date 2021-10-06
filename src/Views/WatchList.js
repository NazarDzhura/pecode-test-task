import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import TodoForm from "../Components/Todo/TodoForm";
import TodoList from "../Components/Todo/TodoList";

const LOCAL_STORAGE_KEY = "watch-list";

function WatchList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    function addTodo(todo) {
        setTodos([todo, ...todos]);
    }

    function toggleComplete(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const center = {display: "flex", justifyContent: "center"}

    return (
        <div className="container mx-auto py-12 px-40 px-8 rounded shadow-xl " style={{backgroundColor: "#f6f8fa", minHeight: 800}}>
            <Typography variant="h3" className="pb-5" style={center}>
                My watch list
            </Typography>
            <TodoForm addTodo={addTodo} />
            <TodoList
                todos={todos}
                removeTodo={removeTodo}
                toggleComplete={toggleComplete}
            />
        </div>
    );
}

export default WatchList;