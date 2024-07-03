import React, { useState } from "react";

const TodoList = ({ todo }) => {
  const [todos, setTodos] = useState(todo.title);
  return (
    <div className="w-full bg-red-700 flex justify-between px-4 py-2 rounded-md">
      <div className="flex flex-wrap gap-5 items-center">
        <input
          type="checkbox"
          className="px-2 cursor-pointer"
          defaultChecked={todo.is_completed}
        />

        <input
          type="text"
          className=" text-black"
          value={todos}
          readOnly={!todo.is_completed}
          onChange={(e) => setTodos(e.target.value)}
        />
      </div>

      <div className="flex gap-5">
        <button className=" bg-green-500 px-3 py-2 rounded-lg">Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default TodoList;
