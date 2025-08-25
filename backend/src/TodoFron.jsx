import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todo, setTodo] = useState({ task: "", desc: "", isCompleted: false });    //values of obj
  const [todoList, setTodoList] = useState([]); //store 1 obj
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTodos = () => {
    axios
      .get("http://localhost:4000/Todo/getTodo")
      .then((res) => setTodoList(res.data.data))
      .catch((err) => console.error("Error fetching todos:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setTodo((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleSubmit = () => {
    if (isEditMode) {
      axios
        .put(`http://localhost:4000/Todo/updateTodo?_id=${editId}`, todo)
        .then(() => {
          fetchTodos();
          resetForm();
        })
        .catch((err) => console.error("Error updating todo:", err));
    } else {
      axios
        .post("http://localhost:4000/Todo/createTodo", todo)
        .then(() => {
          fetchTodos();
          resetForm();
        })
        .catch((err) => console.error("Error creating todo:", err));
    }
  };

  const handleEdit = (todo) => {
    setTodo(todo);
    setIsEditMode(true);
    setEditId(todo._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/Todo/deleteTodo?_id=${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const resetForm = () => {
    setTodo({ task: "", desc: "", isCompleted: false });
    setIsEditMode(false);
    setEditId(null);
  };

  const filteredTodos = todoList.filter((item) =>
    item.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingTodos = filteredTodos.filter((t) => !t.isCompleted);     //filtering Todos on the basis of isCompleted
  const completedTodos = filteredTodos.filter((t) => t.isCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      {/* Navbar */}
      <div className="w-full bg-indigo-600 py-4 px-8 rounded-lg shadow-md flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Todo App</h1>
        <input
          type="text"
          placeholder="Search by task..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-md text-sm w-64 border focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Form */}
      <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 mb-10">
        <div className="space-y-4">
          <input
            type="text"
            name="task"
            placeholder="Task"
            value={todo.task}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={todo.desc}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isCompleted"
              checked={todo.isCompleted}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600"
            />
            <label className="text-sm font-medium text-gray-700">Completed</label>
          </div>
          <button
            onClick={handleSubmit}
            className={`w-full py-2 rounded-md text-white transition ${
              isEditMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isEditMode ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </div>

      {/* Todo Lists */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Pending Tasks</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="text-left px-4 py-2">Task</th>
                  <th className="text-left px-4 py-2">Desc</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingTodos.map((val, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{val.task}</td>
                    <td className="px-4 py-2">{val.desc}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => handleEdit(val)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                      <button onClick={() => handleDelete(val._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">Delete</button>
                    </td>
                  </tr>
                ))}
                {pendingTodos.length === 0 && <tr><td className="px-4 py-2 text-gray-400" colSpan="3">No Pending Tasks</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Completed */}
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-4">Completed Tasks</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-green-100">
                <tr>
                  <th className="text-left px-4 py-2">Task</th>
                  <th className="text-left px-4 py-2">Desc</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedTodos.map((val, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 line-through">{val.task}</td>
                    <td className="px-4 py-2 line-through">{val.desc}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => handleEdit(val)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                      <button onClick={() => handleDelete(val._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">Delete</button>
                    </td>
                  </tr>
                ))}
                {completedTodos.length === 0 && <tr><td className="px-4 py-2 text-gray-400" colSpan="3">No Completed Tasks</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;




  