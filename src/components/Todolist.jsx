import React, { useState, useEffect } from "react";

// component
import Todo from "./Todo";

// react icons
import { RxUpdate } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

// style
import "../style/todolist.css";

const Todolist = () => {
  const [todos, setTodos] = useState({
    todolist: [],
    todo: "",
    isUpdate: false,
  });

  const [editTodo, setEditTodo] = useState({
    id: "",
    user: "",
  });

  const [loading, setLoading] = useState(true);

  const { todo, todolist, isUpdate } = todos;
  const { id, user } = editTodo;

  // add todo function
  const addTodo = () => {
    const list = todo;

    if (todo.trim() === "") return alert("Please Filled");

    setTodos({ ...todos, todolist: [...todolist, { name: list }], todo: "" });
  };

  // delete function
  const deleteTodo = (index) => {
    const list = todolist;
    list.splice(index, 1);

    setTodos({ ...todos, todolist: list });
  };

  const closeModal = () => {
    const modal = document.getElementById("exampleModal"); // Ensure this is the correct modal ID
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide(); // ✅ Properly close the modal
      }
    }
  };

  // edit
  const editTodoFunction = (index) => {
    if (user.trim() === "") {
      return alert("Please filled this blank");
    } else {
      const updatedList = [...todolist];
      updatedList[index] = { ...updatedList[index], name: user };

      setTodos({ ...todos, todolist: updatedList });
      setEditTodo({ ...editTodo, user: "" });
      closeModal();
    }
  };

  // add onchange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);

    setTodos({ ...todos, [name]: value });
  };

  // handle edit onchange
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTodo({ ...editTodo, [name]: value });
  };

  // show update form
  const showUpdateForm = (index) => {
    setEditTodo({ ...editTodo, id: index });
    console.log(id);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setTodos({ ...todos, todolist: data });
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  return (
    <div className="main-container">
      <div className="form-container">
        <h1>Todo List</h1>
        <form action="">
          <input
            type="text"
            placeholder="Add Todo"
            name="todo"
            value={todo}
            onChange={handleInputChange}
          />
          <button type="button" className="btn btn-success" onClick={addTodo}>
            Add
          </button>
        </form>

        <div className="todo-item-list">
          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            todolist.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                deleteTodo={deleteTodo}
                id={index}
                showUpdateForm={showUpdateForm}
              />
            ))
          )}
        </div>

        {/* it appear once we click the edit icon */}
        <div
          className="modal fade bg-transparent text-black"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" key={id}>
                <input
                  type="text"
                  className="w-100 edit-input"
                  onChange={handleEditChange}
                  name="user"
                  value={user}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => editTodoFunction(id)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
