import React, { useState } from "react";

const TodoInput = () => {
  const [txt, setTxt] = useState("");

  const handleSubmit = (e) => {

     e.preventDefalut();



     e.target.reset();


  };
  return (
    <section className="bg-red-600 mt-10 flex justify-center items-center">
      <form action="" className=" max-w-[px] p-5 bg-pink-200" onSubmit={handleSubmit}>
       <div className="flex justify-between">
        <label htmlFor="todo">
          <input
            type="text"
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            name="todo"
            id="todo"
            placeholder="Write your next task"
            className="outline-none px-6 py-2 rounded-lg w-full text-black"
          />
        </label>

        <button type="submit" className=" px-3 py-2 bg-blue-500 rounded-2xl">
          Submit
        </button>

       </div>

      </form>
    </section>
  );
};

export default TodoInput;
