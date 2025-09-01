import React, { useEffect } from "react";
import "./Todos.css";

const Todos = (props) => {
  const { setState } = props;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const firtFiveTodos = data.slice(0, 6);
        setState((state) => ({ ...state, todos: firtFiveTodos }));
      });
  }, []);

  const renderTodos = () => {
    return props.todos.map((todo) => {
      return (
        <li className="todos-item" key={todo.id}>
          {todo.title}
        </li>
      );
    });
  };
  return (
    <div className="todo-widget">
      <ul className="todos-widget-list">{renderTodos()}</ul>
    </div>
  );
};

export default Todos;
