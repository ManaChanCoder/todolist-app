import React from "react";

// component
import Todolist from "./Todolist";

// icons from react
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Todo = (props) => {
  const { todo, id, deleteTodo, showUpdateForm } = props;
  return (
    <div className="todo">
      <h4>{todo.name}</h4>
      <div className="">
        <MdDeleteForever
          size={30}
          className="text-danger del-btn all-btn"
          onClick={() => deleteTodo(id)}
        />

        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => showUpdateForm(id)}
        >
          <MdEdit size={30} className="text-primary del-btn all-btn" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
