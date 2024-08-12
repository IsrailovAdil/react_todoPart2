import React, {useEffect, useState} from 'react';
import TodoItem from "./Сomponents/TodoItem";

function App() {
    const [todos, setTodos] = useState(todoArr);
    const [todo, setTodo] = useState({
        id: 0,
        title:'',
        required:false,
        isDone:false,
    });

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('todos'))){
            const initial=JSON.parse(localStorage.getItem('todos'));
            setTodos(initial);
        }

    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const newTodo = {...todo,id:todos.length+1}

localStorage.setItem('todos', JSON.stringify([...todos,newTodo]));
        setTodos([...todos,newTodo]);
    }


    const handleDone=(todo)=>{
        const newTodo = {...todo,isDone:true}
        setTodos(todos.map(el=>el.id===newTodo.id?newTodo:el)
            .sort((a,b)=>a.isDone > b.isDone?1:-1));

        localStorage.setItem('todos', JSON.stringify(todos.map(el=>el.id===newTodo.id?newTodo:el)
            .sort((a,b)=>a.isDone > b.isDone?1:-1)));
    }

  return (
      <div className={'container'}>
          <h1>My Todo list </h1>
          <div>
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input onChange={(e)=>setTodo({...todo, title: e.target.value})}
                             type="text" className="form-control" id="exampleInputEmail1"
                             aria-describedby="emailHelp"/>
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3 form-check">
                      <input onChange={(e)=>setTodo({...todo, required: e.target.checked})}  type="checkbox" className="form-check-input" id="exampleCheck1"/>
                      <label className="form-check-label" htmlFor="exampleCheck1">required</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {
todos.map(todo=>
    <TodoItem
        key={todo.id}
        todo={todo}
handleDone={handleDone}
                  />
)
              }
          </div>
      </div>
  );
}

export default App;

const todoArr=[
    {
        id: 1,
        title: 'Hello World',
        required: false,
        isDone:false,
    },
    {
        id: 2,
        title: 'Hello World',
        required: false,
        isDone:false,
    },
    {
        id: 3,
        title: 'Hello World',
        required: false,
        isDone:false,
    }
]
