
import './App.css';
import {Button,Modal,Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addTodo,deleteTodo,completeTodo,updateTodo} from './actions/todoAction'

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [task,setTask]=useState("")
  const [editTask,setEditTask]=useState("")
  const [filter,setFilter]=useState("all")
  const todos=useSelector(state=>state.todoReducer)
  const dispatch=useDispatch()
  return (
    <div className="App">
      
        <input type="text" placeholder="add task.." onChange={(e)=>setTask(e.target.value)} />
        
            
        <button onClick={()=>dispatch(addTodo(task))}>Add task</button>
        <button onClick= {()=> setFilter("all")}>all</button>
        <button onClick= {()=> setFilter("done")}>done</button>
        <button onClick= {()=> setFilter("undone")}>undone</button>
      { filter==="all" ? todos.map((el) => <div>
        <h2>{el.title}</h2>
        <button onClick={handleShow}>
        update
      </button>
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Body>
          
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              
              <Form.Control
                type="text"
                placeholder="update task"
                value={editTask}
                onChange={(e)=>setEditTask(e.target.value)}
                
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{ dispatch(updateTodo(editTask,el.id));handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <button onClick={()=> dispatch (deleteTodo(el.id))}>delete</button>
        <button onClick={()=> dispatch (completeTodo(el.id))}>{el.complete ? "done" : "undone"}</button>
      </div>) : filter==="done" ? todos.filter(el=> el.complete===true) 
      .map((el) => <div>
      <h2>{el.title}</h2>
      <button onClick={()=> dispatch (deleteTodo(el.id))}>delete</button>
      <button onClick={()=> dispatch (completeTodo(el.id))}>{el.complete ? "done" : "undone"}</button>
    </div>) :  todos.filter(el=> el.complete===false) 
      .map((el) => <div>
      <h2>{el.title}</h2>
      <button onClick={()=> dispatch (deleteTodo(el.id))}>delete</button>
      <button onClick={()=> dispatch (completeTodo(el.id))}>{el.complete ? "done" : "undone"}</button>
    </div>)
    }

    </div>
  );
}

export default App;
