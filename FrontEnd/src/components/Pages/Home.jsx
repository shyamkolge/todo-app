import React from "react";
import { useState } from "react";
import { Header, TodoHero, TodoInput, TodoList } from "../index";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      title: "Some task", // string
      id: self.crypto.randomUUID(), // string
      is_completed: false, // boolean
    },
    {
      title: "Some task", // string
      id: self.crypto.randomUUID(), // string
      is_completed: false, // boolean
    },
    {
      title: "Some task should be entered", // string
      id: self.crypto.randomUUID(), // string
      is_completed: true, // boolean
    },
    {
      title: "Some task", // string
      id: self.crypto.randomUUID(), // string
      is_completed: false, // boolean
    },
  ]);

  return (
    <div className="bg-black">
      <section className="max-w-7xl min-h-screen mx-auto shadow-md rounded-lg px-4 py-3  font-sans text-white">
        <Header />
        <TodoHero all_todos={0} completed_todos={0} />

        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoInput />
            {/* <TodoForm /> */}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoList todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
