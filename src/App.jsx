// import { useEffect, useState } from "react";
// import { TodoProvider } from "./contexts";

// import "./App.css";
// import TodoForm from "./components/TodoForm";
// import TodoItem from "./components/TodoItem";

// function App() {

//   // State for handling todos
//   const [todos , setTodos] = useState([]);

//   console.log("Todos : ",todos)

//   // Functionality
//   const addTodo = (todo) => {
//     console.log("Added Todo : " , todo);
//     setTodos((prev) => [{id : Date.now() , ...todo} , ...prev ])
//   }

//   const updateTodo = (id , todo) => {
//     setTodos((prev) => prev.map((prevTodo) => (
//       prevTodo.id === id ? todo : prevTodo
//     )))
//   }

//   const deleteTodo = (id) => {
//     // Todo id which will be not matched it will come in new array lefting the one which is matched 
//     // because thats how filter works .
//     setTodos((prev) => prev.filter((todo) => todo.id !== id  ))
//   }

//   const toggleComplete = (id) => {
//     setTodos((prev) => prev.map((prevTodo) => 
//       prevTodo.id === id ? {...prevTodo ,completed : !prevTodo.completed } : prevTodo))
//   }

//   // Local Storage 
//   // This use effect is triggred when application loads for first time which extracts previously stored or added todos to current state from local storage 
//   useEffect(() => {
//     const todos = JSON.parse(localStorage.getItem("todos"));

//     if(todos && todos?.length > 0) {
//       setTodos(todos);
//     } 

//   } , [])

//   useEffect(() => {
//     localStorage.setItem("todos" , JSON.stringify(todos));
//   }, [todos])


  


//   return (
//     <TodoProvider value={{todos , addTodo , deleteTodo , updateTodo , toggleComplete}}>
//       <div className="bg-[#172842] min-h-screen py-8">
//                 <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
//                     <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
//                     <div className="mb-4">
//                         {/* Todo form goes here */} 
//                         <TodoForm />
//                     </div>
//                     <div className="flex flex-wrap gap-y-3">
//                         {/*Loop and Add TodoItem here */}
//                         {todos.map((todo) => (
//                           <div key={todo.id} className="w-full">
//                             <TodoItem todo={todo} />
//                           </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//     </TodoProvider>
//   );
// }

// export default App;


"use client"

import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)),
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div
        className={`min-h-screen py-8 px-4 transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-100"}`}
      >
        <div className="w-full font-myFont max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Manage Your Todos</h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
            <TodoForm />
          </div>
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TodoItem todo={todo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

