// import React, { useState } from "react";
// import { useTodo } from "../contexts";

// function TodoItem({ todo }) {
//   const [isTodoEditable, setIsTodoEditable] = useState(false);
//   const [todoMsg, setTodoMsg] = useState(todo.todo);

//   const { updateTodo, deleteTodo, toggleComplete } = useTodo();

//   const editTodo = () => {
//     updateTodo(todo.id, { ...todo, todo: todoMsg });
//     setIsTodoEditable(false);
//   };

//   const toggleCompleted = () => {
//     toggleComplete(todo.id);
//   };

//   return (
//     <div
//       className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
//         todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
//       }`}
//     >
//       <input
//         type="radio"
//         className="cursor-pointer"
//         checked={todo.completed}
//         onClick={toggleCompleted}
//       />
//       <input
//         type="text"
//         className={`border outline-none w-full bg-transparent rounded-lg ${
//           isTodoEditable ? "border-black/10 px-2" : "border-transparent"
//         } ${todo.completed ? "line-through" : ""}`}
//         value={todoMsg}
//         onChange={(e) => setTodoMsg(e.target.value)}
//         readOnly={!isTodoEditable}
//       />
//       {/* Edit, Save Button */}
//       <button
//         className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
//         onClick={() => {
//           if (todo.completed) return;

//           if (isTodoEditable) {
//             editTodo();
//           } else setIsTodoEditable((prev) => !prev);
//         }}
//         disabled={todo.completed}
//       >
//         {isTodoEditable ? "📁" : "✏️"}
//       </button>
//       {/* Delete Todo Button */}
//       <button
//         className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
//         onClick={() => deleteTodo(todo.id)}
//       >
//         ❌
//       </button>
//     </div>
//   );
// }

// export default TodoItem;
import { useState } from "react"
import { useTodo } from "../contexts"
import { motion } from "framer-motion"
import { Trash2, Edit2, Check } from "lucide-react"

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
    <motion.div
      className={`flex border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-gray-800 dark:text-white ${
        todo.completed ? "bg-green-100 dark:bg-green-800" : "bg-white dark:bg-gray-800"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <input type="checkbox" className="cursor-pointer" checked={todo.completed} onChange={toggleCompleted} />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-gray-400 dark:border-gray-500 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 dark:border-gray-600 justify-center items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 shrink-0 transition-colors duration-200"
        onClick={() => {
          if (todo.completed) return
          if (isTodoEditable) {
            editTodo()
          } else setIsTodoEditable((prev) => !prev)
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? <Check size={16} /> : <Edit2 size={16} />}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 dark:border-gray-600 justify-center items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 shrink-0 transition-colors duration-200"
        onClick={() => deleteTodo(todo.id)}
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  )
}

export default TodoItem

