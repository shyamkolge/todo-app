import React from "react";

const TodoHero = ({ all_todos, completed_todos }) => {
  return (
    <section className="w-full flex justify-center bg-red-300 ">

      <div className="w-1/4 p-5 flex border border-white justify-between items-center">
      <div>
        <h1>Taks Done</h1>
        <span>Keep it up</span>
      </div>

      <div>
        {all_todos}/{completed_todos}
      </div>

      </div>
    </section>
  );
};

export default TodoHero;
