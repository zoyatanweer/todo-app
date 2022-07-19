import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "../../components/Pagination/Pagination";
import { CompletedIcon } from "../../assets/allsvg";
import "./Homepage.css";

const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [addTask, setAddTask] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    })();
  }, []);

  //get current page
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //submit form handler
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data, status } = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: addTask,
          completed: false,
        }
      );

      if (status === 201) {
        setTodos((todos) => [data, ...todos]);
        setAddTask("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //delete todo handler
  const deleteHandler = async (idToDelete) => {
    setTodos((item) => item.filter((todo) => todo.id !== idToDelete));
  };

  // todo status handler
  const completeToggle = (todoUpdate, status) => {
    setTodos((prev) => [
      ...prev.map((item) => {
        if (item.id === todoUpdate.id) {
          if (status === true) {
            return {
              ...todoUpdate,
              completed: false,
            };
          }
          if (status === false) {
            return {
              ...todoUpdate,
              completed: true,
            };
          }
        } else {
          return item;
        }
      }),
    ]);
  };

  return (
    <>
      <div>
        <h1>To-Do list</h1>
      </div>
      <div className="add-task-section">
        <h2>Add a new task in the list</h2>
        <div className="add-task">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter the task here"
              name="addTask"
              value={addTask}
              onChange={(e) => setAddTask(e.target.value)}
            />
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="todo-list-display">
        <h2>Added task in to-do list</h2>
        <div className="task-container">
          {currentTodos.map((todos) => {
            return (
              <>
                <div className="task-container">
                  <div
                    className="task-card"
                    key={todos.id}
                    style={{
                      border: todos.completed ? "1px solid #7ab530" : "none",
                    }}
                  >
                    <div
                      className="completed-icon-container"
                      style={{
                        display: todos.completed ? "block" : "none",
                      }}
                    >
                      <CompletedIcon className="completed-icon" />
                    </div>
                    <div className="task-title">{todos.title}</div>

                    <div className="division"></div>

                    <div className="task-action">
                      <button
                        className={`btn-complete ${
                          todos.completed ? "btn-incomplete" : "btn-complete"
                        }`}
                        onClick={() => completeToggle(todos, todos.completed)}
                      >
                        {todos.completed
                          ? "Mark as incompleted"
                          : "Mark as completed"}
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => deleteHandler(todos.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <Pagination
          todosPerPage={todosPerPage}
          totalTodos={todos.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export { Homepage };
