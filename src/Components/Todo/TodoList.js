import { List } from "@material-ui/core";
import React from "react";
import Todo from "./Todo";

function TodoList({ todos, removeTodo, toggleComplete }) {
    const h3 = {display: "flex", justifyContent: "center", fontSize: 25, paddingTop: 100}
    return (
        <>
            <List>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    removeTodo={removeTodo}
                    toggleComplete={toggleComplete}
                />
            ))}
            </List>
            {todos.length === 0 ? <h3 style={h3}>Your watch list is empty</h3> : null}
        </>

    );
}

export default TodoList;