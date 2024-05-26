import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinshed, setShowFinishes] = useState(true);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storedTodos || []); // Provide an empty array as a fallback
  }, []);
  

  const SavetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
  
    SavetoLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SavetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SavetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    SavetoLS();
  };
  const toggleFinished = ()=>{
    setShowFinishes(!showFinshed);
  }

  return (
    <>
      <Navbar />
      <div className=" container  mx-auto bg-blue-400 p-3 w-1/2 rounded-md min-h-[80vh] my-7 ">
        <div className="AddTodos">
          <h2 className="sm:text-sm font-bold text-3xl text-center *:first-letter:">Add a Todo</h2>
          
          <input value={todo} onChange={handleChange} type="text" className=" min-w-[40vw] my-2 rounded-md p-2" />
          <button
            onClick={handleAdd}
            className="bg-yellow-400 mx-2 rounded-md p-2 w-24 my-2 sm:"
          >
            Add
          </button>
        </div>
        <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinshed}
            name=""
            id=""
          />Show Finished 
        <h2 className="font-bold">Your Todos</h2>

        <div className="todos ">
          {todos.length === 0 && <div> No todos to display </div>}
          {todos.map((item) => {
            return (
              (showFinshed || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between w-full my-3"
                >
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name={item.id}
                    id=""
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="buttons ">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-yellow-400 mx-2 rounded-md py-1 px-2 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-yellow-400 mx-2 rounded-md py-1 px-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
