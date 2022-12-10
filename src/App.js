import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  //all todos are stored in an array
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);


  //takes user input and appends to the array
  const handleSubmit = (e) => {
    //prevent from refreshing page
    e.preventDefault();

    //if the input form is in edit mode
    if(editId) {
      const editTodo = todos.find((i) => i.id === editId);

      //go through every single item in array, and edit it
      const updatedTodos = todos.map((t) => 
        t.id === editTodo.id ? 
        (t = {id:t.id, todo}) :
        {id: t.id, todo: t.todo }
      ); 
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    //check if user inp is empty
    if(todo !== '') {
      //Date.now() always produces a unique number
      //setTodos is a state, so update it
      setTodos([{id:`${todo}-${Date.now()}` ,todo },...todos])

      //reset input box 
      setTodo("");
    }

  };

  //func returns an array so useState is an array
  const handleDelete = (id) => {
    //this will compare all items in array and NOT delete 
    //arr[i] if to.id is != current id (same as arr[i])
    const delTodoItem = todos.filter((to) => to.id !== id);

    setTodos([...delTodoItem]);
  };

  const handleEdits = (id) => {
    //2 step process

    //1st: once clicked, we want the item to be edited to be 
    //displayed in the input box
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
    //2nd, return that edited string once enter is clicked

  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>To-Do List</h1>

        <form className='todo-form' onSubmit={handleSubmit}>

          <input type='text' placeholder='stop getting distracted by Discord' value={todo} onChange={(e) => setTodo(e.target.value)}/>
          <button type='submit' className='enter-button'>{editId ? "Edit" : "Enter"}
          </button>

        </form>

        <ul className='all-list'> 
          {todos.map((t) => (
            <li className='single-list'>
            <span className='todo-text' key={t.id}>{t.todo}</span>
            <button onClick={() => handleEdits(t.id)}>Edit</button>
            {/* when delete is clicked, the unique id of each
                item in our array will be FILTERED out
             */}
            <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
