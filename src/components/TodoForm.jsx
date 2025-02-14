// import React, { useState } from "react";
// import { useTodo } from "../contexts";

// function TodoForm() {
//     const [todo , setTodo] = useState("");

//     const {addTodo} = useTodo();

//     const add = (e) => {
//         e.preventDefault();

//         if(!todo) return 
//         // console.log("Executed")
//         // console.log(todo)
//         addTodo({ todo , completed : false })
//         setTodo("")
//     }

//   return (
//     <form onSubmit={add} className="flex">
//       <input
//         type="text"
//         placeholder="Write Todo..."
//         className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
//         value={todo}
//         onChange={(e) => {setTodo(e.target.value)}}
//       />
//       <button
//         type="submit"
//         className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
//       >
//         Add
//       </button>
//     </form>
//   );
// }

// export default TodoForm;


import { useState } from "react"
import { useTodo } from "../contexts"
import { motion } from "framer-motion"

function TodoForm() {
  const [todo, setTodo] = useState("")
  const { addTodo } = useTodo()

  const add = (e) => {
    e.preventDefault()
    if (!todo) return
    addTodo({ todo, completed: false })
    setTodo("")
  }

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <motion.button
        type="submit"
        className="rounded-r-lg px-4 py-2 bg-blue-500 text-white font-semibold transition-colors duration-200 hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add
      </motion.button>
    </form>
  )
}

export default TodoForm
